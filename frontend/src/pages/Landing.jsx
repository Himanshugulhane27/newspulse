import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNews, useCategories } from '../hooks/useApi'
import NewsCard from '../components/NewsCard'

const Landing = () => {
  const { isAuthenticated } = useAuth()
  const { data: newsData, isLoading } = useNews({ category: 'general', page: 1, pageSize: 6 })
  const { data: categoriesData } = useCategories()

  const articles = newsData?.data?.articles?.slice(0, 6) || []
  const categories = categoriesData?.data?.categories || []

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full max-w-full">
      {/* Hero Section */}
      <section className="page-container !py-20 sm:!py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Your personalized news platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            Stay Updated with
            <span className="block text-blue-600 dark:text-blue-400 mt-1">Real-Time News</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Aggregate news from top sources worldwide. Search, filter by category, and bookmark your favorite articles, all in one clean interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/home"
              className="btn-primary text-base !py-3 !px-8"
            >
              Explore News
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="btn-secondary text-base !py-3 !px-8"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="page-container !py-0 !pb-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/home?category=${cat.id}`}
                className="pill-btn pill-btn-default"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Preview News Section */}
      <section className="page-container !py-16 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Trending Right Now
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Here is a preview of the latest headlines from around the world.
          </p>
        </div>

        {isLoading ? (
          <div className="news-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06]" style={{ aspectRatio: '1/1.2' }}>
                <div className="w-full bg-gray-200 dark:bg-white/[0.04] animate-pulse" style={{ aspectRatio: '16/9' }}></div>
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/[0.06] rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/[0.06] rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="news-grid">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/home"
            className="btn-primary text-base !py-3 !px-8"
          >
            View All News
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container !py-16 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Everything you need to stay updated
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Built for readers who want a fast, clean, and distraction-free news experience.
          </p>
        </div>

        <div className="news-grid">
          {[
            { title: 'Real-Time News', desc: 'Get the latest headlines from trusted sources around the world, updated in real time.' },
            { title: 'Smart Categories', desc: 'Browse news by Technology, Business, Sports, Health, Entertainment and more.' },
            { title: 'Personalized Feed', desc: 'Bookmark articles and build your own reading list for easy access anytime.' },
            { title: 'Search Anything', desc: 'Find articles on any topic with our powerful search across thousands of sources.' },
            { title: 'Dark Mode', desc: 'Read comfortably day or night with automatic dark mode support.' },
            { title: 'Mobile Friendly', desc: 'Responsive design that works seamlessly on desktop, tablet and mobile devices.' },
          ].map((feature, index) => (
            <div key={index} className="stat-card">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="page-container !py-20">
          <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to get started?
            </h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Create a free account to bookmark articles and personalize your news feed.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="page-container !py-8 border-t border-gray-200 dark:border-white/[0.06]">
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">
          NewsPulse - Real-Time News Aggregator
        </p>
      </footer>
    </div>
  )
}

export default Landing
