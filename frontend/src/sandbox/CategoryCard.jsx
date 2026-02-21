import React from 'react';
// category card for explore page
const gradients = {
  technology: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
  business: 'linear-gradient(135deg, #064e3b, #10b981)',
  science: 'linear-gradient(135deg, #3b1f6e, #8b5cf6)',
  sports: 'linear-gradient(135deg, #78350f, #f59e0b)',
  health: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
  entertainment: 'linear-gradient(135deg, #831843, #ec4899)',
};
const icons = { technology: '💻', business: '📊', science: '🔬', sports: '⚽', health: '🏥', entertainment: '🎬' };
const CategoryCard = ({ category, articleCount, onClick }) => (
  <div onClick={onClick} style={{
    background: gradients[category] || 'linear-gradient(135deg, #334155, #64748b)',
    borderRadius: '12px', padding: '20px', cursor: 'pointer',
    transition: 'transform 0.2s ease', minHeight: '120px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  }}>
    <span style={{ fontSize: '32px' }}>{icons[category] || '📰'}</span>
    <div>
      <h3 style={{ color: '#fff', fontSize: '16px', margin: '0 0 2px 0', textTransform: 'capitalize' }}>{category}</h3>
      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{articleCount || 0} articles</span>
    </div>
  </div>
);
export default CategoryCard;
