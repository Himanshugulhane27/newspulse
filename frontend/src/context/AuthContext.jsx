import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    default:
      return state
  }
}

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authService.setAuthToken(token)
      // Verify token and get user profile
      authService.getProfile()
        .then(response => {
          dispatch({ type: 'SET_USER', payload: response.data.user })
        })
        .catch(() => {
          localStorage.removeItem('token')
          dispatch({ type: 'LOGOUT' })
        })
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      authService.setAuthToken(token)
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      authService.setAuthToken(token)
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    authService.setAuthToken(null)
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}