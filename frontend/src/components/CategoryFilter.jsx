import { useCategories } from '../hooks/useApi'

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { data: categoriesData, isLoading } = useCategories()
  
  if (isLoading) {
    return (
      <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-10 w-24 bg-gray-200 dark:bg-white/[0.05] rounded-full animate-pulse flex-shrink-0"></div>
        ))}
      </div>
    )
  }

  const categories = categoriesData?.data?.categories || []

  return (
    <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
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
  )
}

export default CategoryFilter