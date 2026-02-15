import React, { useEffect, useRef, useState } from 'react';
// another approach to infinite scroll - using intersection observer
// compared to ScrollFeed this one is more reusable
const InfiniteScroll = ({ loadMore, hasMore, loader, children }) => {
  const sentinelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        await loadMore?.();
        setIsLoading(false);
      }
    }, { rootMargin: '100px' });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);
  return (
    <div>
      {children}
      {isLoading && (loader || <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>Loading...</p>)}
      <div ref={sentinelRef} style={{ height: '1px' }}/>
    </div>
  );
};
export default InfiniteScroll;
