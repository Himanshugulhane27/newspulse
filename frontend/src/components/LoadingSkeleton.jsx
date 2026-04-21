const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="news-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Image skeleton */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div className="w-full h-full bg-gray-200 dark:bg-white/[0.04]"></div>
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-5">
            {/* Time */}
            <div className="flex items-center mb-3">
              <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-full w-20"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-full relative overflow-hidden">
                <div className="absolute inset-0 skeleton-shimmer"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 skeleton-shimmer"></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-2/3"></div>
            </div>
            
            {/* Button */}
            <div className="h-4 bg-gray-200 dark:bg-white/[0.06] rounded-lg w-28"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton