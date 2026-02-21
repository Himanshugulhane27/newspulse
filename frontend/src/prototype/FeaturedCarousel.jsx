import React, { useState, useEffect } from 'react';
// auto-rotating featured news carousel
const FeaturedCarousel = ({ articles = [] }) => {
  const [current, setCurrent] = useState(0);
  const items = articles.length ? articles : [
    { title: 'Top Story One', source: 'BBC', category: 'World' },
    { title: 'Top Story Two', source: 'CNN', category: 'Tech' },
    { title: 'Top Story Three', source: 'Reuters', category: 'Science' },
  ];
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % items.length), 4000);
    return () => clearInterval(timer);
  }, [items.length]);
  return (
    <div style={{ position: 'relative', height: '200px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1e293b' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          opacity: i === current ? 1 : 0, transition: 'opacity 0.5s ease'
        }}>
          <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 600 }}>{item.category}</span>
          <h3 style={{ color: '#f1f5f9', fontSize: '20px', margin: '4px 0' }}>{item.title}</h3>
          <span style={{ color: '#64748b', fontSize: '12px' }}>{item.source}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '6px' }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px',
            backgroundColor: i === current ? '#3b82f6' : '#334155', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}/>
        ))}
      </div>
    </div>
  );
};
export default FeaturedCarousel;
