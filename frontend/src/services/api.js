import axios from 'axios'

// API Configuration for different environments
const getApiUrl = () => {
  // Production: Use environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development fallback
  return 'http://localhost:5001/api';
};

const API_URL = getApiUrl();
console.log('🔗 API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout for production
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }
}

// News services
export const newsService = {
  getNews: (params) => api.get('/news', { params }),
  searchNews: (params) => api.get('/news/search', { params }),
  getCategories: () => api.get('/news/categories')
}

// Bookmark services
export const bookmarkService = {
  createBookmark: (article) => api.post('/bookmarks', { article }),
  getBookmarks: (params) => api.get('/bookmarks', { params }),
  deleteBookmark: (id) => api.delete(`/bookmarks/${id}`),
  checkBookmark: (url) => api.get('/bookmarks/check', { params: { url } })
}

export default api