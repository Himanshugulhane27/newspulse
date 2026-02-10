import React from 'react';
// temp route for testing individual category pages
// like /category/technology, /category/sports etc
const CategoryPage = ({ category }) => {
  const cat = category || 'technology';
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', margin: 0, textTransform: 'capitalize' }}>
          {cat}
        </h1>
        <span style={{ fontSize: '13px', color: '#64748b', padding: '4px 12px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
          24 articles
        </span>
      </div>
      <div style={{ display: 'grid', gap: '16px' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ padding: '16px', border: '1px solid #1e293b', borderRadius: '10px', backgroundColor: '#0f172a' }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: '0 0 8px 0' }}>Sample {cat} Article {i}</h3>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Source Name • 2h ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;
