import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'sports', name: 'Sports' },
    { id: 'health', name: 'Health' },
    { id: 'entertainment', name: 'Entertainment' }
  ]

  if (error) {
    return (
      <div className="page-container !py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to load bookmarks
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {error.response?.data?.message || 'Something went wrong. Please try again.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Dashboard
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-base ml-[52px]">
          Welcome back, <span className="text-gray-700 dark:text-gray-200 font-medium">{user?.username}</span>! Here are your saved articles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Bookmarks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                {totalResults}
              </p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <Filter className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categories
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                {categories.length - 1}
              </p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Bookmark className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                This Month
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
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
      <div className="mb-10">
        <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`pill-btn ${
                selectedCategory === category.id
                  ? 'pill-btn-active'
                  : 'pill-btn-default'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : bookmarks.length > 0 ? (
        <div className="news-grid">
          {bookmarks.map((bookmark, index) => (
            <article 
              key={bookmark._id} 
              className="news-card animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Image */}
              <div className="news-card-image-wrapper">
                {bookmark.article.urlToImage ? (
                  <img
                    src={getImageUrl(bookmark.article.urlToImage)}
                    alt={bookmark.article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">{getCategoryIcon(bookmark.article.category)}</span>
                    </div>
                  </div>
                )}
                
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteBookmark(bookmark._id)}
                  disabled={deleteBookmark.isLoading}
                  className="absolute top-3 right-3 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 transition-all duration-250 disabled:opacity-50 hover:scale-110"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Source badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 backdrop-blur-sm text-white/90">
                    {bookmark.article.source?.name || 'Unknown Source'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Time */}
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-3">
                  <span>Saved {formatRelativeTime(bookmark.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2.5 line-clamp-2 leading-snug tracking-tight">
                  {bookmark.article.title}
                </h3>

                {/* Description */}
                {bookmark.article.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {truncateText(bookmark.article.description, 120)}
                  </p>
                )}

                {/* Read more button */}
                <a
                  href={bookmark.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group"
                >
                  <span>Read full article</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start bookmarking articles to see them here
          </p>
          <Link
            to="/home"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Browse News</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard