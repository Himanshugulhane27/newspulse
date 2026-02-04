import React, { useState, useCallback, useRef, useEffect } from 'react';

// infinite scroll experiment for the news feed
// trying to see if this feels better than pagination
const ScrollFeed = ({ fetchNews }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    // simulating fetch
    const fakeItems = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i,
      title: `News Article ${(page - 1) * 10 + i + 1}`,
      source: 'Test Source',
      time: new Date().toISOString()
    }));

    setTimeout(() => {
      setItems(prev => [...prev, ...fakeItems]);
      setLoading(false);
      if (page >= 5) setHasMore(false);
    }, 800);
  }, [page]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div
            key={item.id}
            ref={isLast ? lastItemRef : null}
            style={{
              padding: '16px',
              marginBottom: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}
          >
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ color: '#64748b', fontSize: '12px' }}>{item.source}</p>
          </div>
        );
      })}
      {loading && <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading more...</p>}
      {!hasMore && <p style={{ textAlign: 'center', color: '#64748b' }}>No more articles</p>}
    </div>
  );
};

export default ScrollFeed;
