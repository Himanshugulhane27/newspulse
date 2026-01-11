import { useCategories } from '../hooks/useApi'
import { getCategoryIcon } from '../utils/helpers'

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { data: categoriesData, isLoading } = useCategories()
  
  if (isLoading) {
    return (
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse flex-shrink-0"></div>
        ))}
      </div>
    )
  }

  const categories = categoriesData?.data?.categories || []

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('general')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
          selectedCategory === 'general'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        <span>📰</span>
        <span>All News</span>
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
            selectedCategory === category.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span>{getCategoryIcon(category.id)}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter