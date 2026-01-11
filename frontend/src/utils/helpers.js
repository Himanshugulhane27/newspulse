import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  
  if (isToday(date)) {
    return `Today at ${format(date, 'HH:mm')}`
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'HH:mm')}`
  }
  
  return format(date, 'MMM dd, yyyy')
}

export const formatRelativeTime = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export const truncateText = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const getImageUrl = (url, fallback = '/placeholder-news.jpg') => {
  if (!url) return fallback
  // Check if image URL is valid
  return url.startsWith('http') ? url : fallback
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getCategoryIcon = (category) => {
  const icons = {
    general: '📰',
    technology: '💻',
    business: '💼',
    sports: '⚽',
    health: '🏥',
    entertainment: '🎬',
    science: '🔬'
  }
  return icons[category] || '📰'
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}