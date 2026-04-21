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
          navigate('/home', { replace: true })
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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="text-red-500 text-2xl font-bold">X</span>
          </div>
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2 text-sm">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 text-base font-medium">Completing sign in...</p>
      </div>
    </div>
  )
}

export default AuthCallback
