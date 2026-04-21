import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { useNews, useSearchNews } from '../hooks/useApi'
import NewsCard from '../components/NewsCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import CategoryFilter from '../components/CategoryFilter'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'general')
  const [page, setPage] = useState(1)
  const [allArticles, setAllArticles] = useState([])
  
  const searchQuery = searchParams.get('search')
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  // Use search or regular news based on query
  const searchResult = useSearchNews({ q: searchQuery, page, pageSize: 12 })
  const newsResult = useNews({ category, page, pageSize: 12, enabled: !searchQuery })

  const { data, isLoading, error, isFetching, refetch } = searchQuery ? searchResult : newsResult

  // Reset when category or search changes
  useEffect(() => {
    setPage(1)
    setAllArticles([])
  }, [category, searchQuery])

  // Accumulate articles for infinite scroll
  useEffect(() => {
    if (data?.data?.articles) {
      if (page === 1) {
        setAllArticles(data.data.articles)
      } else {
        setAllArticles(prev => [...prev, ...data.data.articles])
      }
    }
  }, [data, page])

  // Infinite scroll
  useEffect(() => {
    if (inView && !isFetching && data?.data?.articles?.length > 0) {
      const totalResults = data.data.totalResults
      const currentCount = page * 12
      if (currentCount < totalResults) {
        setPage(prev => prev + 1)
      }
    }
  }, [inView, isFetching, data, page])

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    const newParams = new URLSearchParams(searchParams)
    if (newCategory === 'general') {
      newParams.delete('category')
    } else {
      newParams.set('category', newCategory)
    }
    newParams.delete('search') // Clear search when changing category
    setSearchParams(newParams)
  }

  const clearSearch = () => {
    const newParams = new URLSearchParams()
    if (category !== 'general') {
      newParams.set('category', category)
    }
    setSearchParams(newParams)
  }

  if (error) {
    return (
      <div className="page-container !py-16">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to load news
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {error.response?.data?.message || 'Something went wrong. Please try again.'}
          </p>
          <button
            onClick={() => refetch()}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          {searchQuery ? (
            <>Search Results for <span className="text-blue-500">"{searchQuery}"</span></>
          ) : (
            'Latest News'
          )}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          Stay updated with the latest news from around the world
        </p>
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Back to all news
          </button>
        )}
      </div>

      {/* Category Filter - Only show when not searching */}
      {!searchQuery && (
        <div className="mb-10">
          <CategoryFilter 
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* News Grid */}
      {isLoading && page === 1 ? (
        <LoadingSkeleton />
      ) : (
        <>
          {allArticles.length > 0 ? (
            <div className="news-grid">
              {allArticles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">?</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery 
                  ? 'Try searching with different keywords'
                  : 'No articles available in this category right now'
                }
              </p>
            </div>
          )}

          {/* Loading more indicator */}
          {isFetching && page > 1 && (
            <div className="flex justify-center py-10">
              <div className="flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] shadow-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading more...</span>
              </div>
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={ref} className="h-10" />
        </>
      )}
    </div>
  )
}

export default Home