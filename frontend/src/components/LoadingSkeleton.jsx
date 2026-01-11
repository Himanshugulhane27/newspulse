const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Content skeleton */}
          <div className="p-6">
            {/* Source and time */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-2 mb-3">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
            
            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
            
            {/* Button */}
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton