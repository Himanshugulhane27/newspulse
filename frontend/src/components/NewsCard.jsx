import { useState } from 'react'
import { ExternalLink, Bookmark, BookmarkCheck, Clock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCreateBookmark, useDeleteBookmark, useCheckBookmark } from '../hooks/useApi'
import { formatRelativeTime, truncateText, getImageUrl } from '../utils/helpers'

const NewsCard = ({ article }) => {
  const { isAuthenticated } = useAuth()
  const [imageError, setImageError] = useState(false)
  
  const { data: bookmarkData } = useCheckBookmark(article.url)
  const createBookmark = useCreateBookmark()
  const deleteBookmark = useDeleteBookmark()
  
  const isBookmarked = bookmarkData?.data?.isBookmarked
  const bookmarkId = bookmarkData?.data?.bookmarkId

  const handleBookmark = () => {
    if (!isAuthenticated) return
    
    if (isBookmarked) {
      deleteBookmark.mutate(bookmarkId)
    } else {
      createBookmark.mutate(article)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <article className="card overflow-hidden animate-fade-in">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {!imageError && article.urlToImage ? (
          <img
            src={getImageUrl(article.urlToImage)}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <span className="text-4xl">📰</span>
          </div>
        )}
        
        {/* Bookmark button */}
        {isAuthenticated && (
          <button
            onClick={handleBookmark}
            disabled={createBookmark.isLoading || deleteBookmark.isLoading}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-primary-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Source and time */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{article.source?.name || 'Unknown Source'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {truncateText(article.description, 120)}
          </p>
        )}

        {/* Read more button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          <span>Read full article</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  )
}

export default NewsCard