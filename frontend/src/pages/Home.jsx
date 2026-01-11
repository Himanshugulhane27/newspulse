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
  const newsQuery = searchQuery 
    ? useSearchNews({ q: searchQuery, page, pageSize: 12 })
    : useNews({ category, page, pageSize: 12 })

  const { data, isLoading, error, isFetching, refetch } = newsQuery

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to load news
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest News'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from around the world
        </p>
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="mt-2 text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Back to all news
          </button>
        )}
      </div>

      {/* Category Filter - Only show when not searching */}
      {!searchQuery && (
        <div className="mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? 'Try searching with different keywords'
                  : 'No articles available in this category right now'
                }
              </p>
            </div>
          )}

          {/* Loading more indicator */}
          {isFetching && page > 1 && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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