import { useState } from 'react'
import { Bookmark, Trash2, ExternalLink, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBookmarks, useDeleteBookmark } from '../hooks/useApi'
import { formatRelativeTime, truncateText, getImageUrl, getCategoryIcon } from '../utils/helpers'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Dashboard = () => {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)
  
  const { data, isLoading, error } = useBookmarks({ 
    category: selectedCategory, 
    page, 
    pageSize: 12 
  })
  const deleteBookmark = useDeleteBookmark()

  const bookmarks = data?.data?.bookmarks || []
  const totalResults = data?.data?.totalResults || 0

  const handleDeleteBookmark = (bookmarkId) => {
    if (window.confirm('Are you sure you want to remove this bookmark?')) {
      deleteBookmark.mutate(bookmarkId)
    }
  }

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📰' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ]

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to load bookmarks
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error.response?.data?.message || 'Something went wrong. Please try again.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Bookmark className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Dashboard
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.username}! Here are your saved articles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Bookmark className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Bookmarks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalResults}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Filter className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Categories
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {categories.length - 1}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ExternalLink className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                This Month
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarks.filter(b => {
                  const bookmarkDate = new Date(b.createdAt)
                  const now = new Date()
                  return bookmarkDate.getMonth() === now.getMonth() && 
                         bookmarkDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <article key={bookmark._id} className="card overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {bookmark.article.urlToImage ? (
                  <img
                    src={getImageUrl(bookmark.article.urlToImage)}
                    alt={bookmark.article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                    <span className="text-4xl">
                      {getCategoryIcon(bookmark.article.category)}
                    </span>
                  </div>
                )}
                
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteBookmark(bookmark._id)}
                  disabled={deleteBookmark.isLoading}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Source and time */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{bookmark.article.source?.name || 'Unknown Source'}</span>
                  <span>{formatRelativeTime(bookmark.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {bookmark.article.title}
                </h3>

                {/* Description */}
                {bookmark.article.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {truncateText(bookmark.article.description, 120)}
                  </p>
                )}

                {/* Read more button */}
                <a
                  href={bookmark.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  <span>Read full article</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start bookmarking articles to see them here
          </p>
          <a
            href="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Browse News</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}

export default Dashboard