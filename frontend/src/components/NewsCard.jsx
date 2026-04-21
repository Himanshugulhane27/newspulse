import { useState } from 'react'
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCreateBookmark, useDeleteBookmark, useCheckBookmark } from '../hooks/useApi'
import { formatRelativeTime, truncateText, getImageUrl } from '../utils/helpers'

const NewsCard = ({ article, index = 0 }) => {
  const { isAuthenticated } = useAuth()
  const [imageError, setImageError] = useState(false)
  
  const { data: bookmarkData } = useCheckBookmark(isAuthenticated ? article.url : null)
  const createBookmark = useCreateBookmark()
  const deleteBookmark = useDeleteBookmark()
  
  const isBookmarked = bookmarkData?.data?.isBookmarked
  const bookmarkId = bookmarkData?.data?.bookmarkId

  // Show trending badge on first 3 articles
  const isTrending = index < 3

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
    <article className="news-card animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
      {/* Image */}
      <div className="news-card-image-wrapper">
        {!imageError && article.urlToImage ? (
          <img
            src={getImageUrl(article.urlToImage)}
            alt={article.title}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">No Image</span>
            </div>
          </div>
        )}

        {/* Trending badge */}
        {isTrending && (
          <div className="absolute top-3 left-3 z-10 badge-trending">
            <span>Trending</span>
          </div>
        )}
        
        {/* Bookmark button */}
        {isAuthenticated && (
          <button
            onClick={handleBookmark}
            disabled={createBookmark.isLoading || deleteBookmark.isLoading}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-lg 
              transition-all duration-250 ease-out disabled:opacity-50
              ${isBookmarked 
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/30' 
                : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-xl'
              }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Source badge overlay on image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/50 backdrop-blur-sm text-white/90">
            {article.source?.name || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Time */}
        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-3">
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2.5 line-clamp-2 leading-snug tracking-tight">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {truncateText(article.description, 140)}
          </p>
        )}

        {/* Read more button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group"
        >
          <span>Read article</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  )
}

export default NewsCard