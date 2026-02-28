import React from 'react';
// explore page with category grid
const ExploreGrid = () => {
  const categories = [
    { name: 'Technology', icon: '💻', color: '#3b82f6', articles: 145 },
    { name: 'Business', icon: '📊', color: '#10b981', articles: 89 },
    { name: 'Science', icon: '🔬', color: '#8b5cf6', articles: 67 },
    { name: 'Sports', icon: '⚽', color: '#f59e0b', articles: 112 },
    { name: 'Health', icon: '🏥', color: '#ef4444', articles: 54 },
    { name: 'Entertainment', icon: '🎬', color: '#ec4899', articles: 78 },
    { name: 'World', icon: '🌍', color: '#06b6d4', articles: 203 },
    { name: 'Opinion', icon: '💭', color: '#f97316', articles: 34 },
  ];
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '24px', marginBottom: '8px' }}>Explore</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Browse news by category</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {categories.map(cat => (
          <div key={cat.name} style={{
            padding: '24px', borderRadius: '12px', cursor: 'pointer',
            background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`,
            border: `1px solid ${cat.color}33`,
            transition: 'transform 0.2s ease'
          }}>
            <span style={{ fontSize: '36px' }}>{cat.icon}</span>
            <h3 style={{ color: '#f1f5f9', fontSize: '16px', margin: '12px 0 4px' }}>{cat.name}</h3>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>{cat.articles} articles</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExploreGrid;
