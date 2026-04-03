import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = searchParams.get('token')
    const oauthError = searchParams.get('error')

    if (oauthError) {
      setError('Google login failed. Please try again.')
      toast.error('Google login failed. Please try again.')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
      return
    }

    if (token) {
      loginWithToken(token)
        .then(() => {
          toast.success('Login successful!')
          navigate('/', { replace: true })
        })
        .catch((err) => {
          console.error('Token login error:', err)
          setError('Authentication failed. Please try again.')
          toast.error('Authentication failed. Please try again.')
          setTimeout(() => navigate('/login', { replace: true }), 2000)
        })
    } else {
      setError('No authentication token received.')
      toast.error('No authentication token received.')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
    }
  }, [searchParams, loginWithToken, navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 dark:text-red-400 text-2xl">✕</span>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Completing sign in...</p>
      </div>
    </div>
  )
}

export default AuthCallback
