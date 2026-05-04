import React from 'react';
// old dropdown category filter - replaced with pill buttons
const OldCategoryFilter = ({ categories, selected, onChange }) => {
  const cats = categories || ['general', 'technology', 'business', 'science', 'health', 'sports'];
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ color: '#94a3b8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Category</label>
      <select value={selected || 'general'} onChange={e => onChange?.(e.target.value)}
        style={{ width: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #334155',
          backgroundColor: '#1e293b', color: '#e2e8f0', fontSize: '13px' }}>
        {cats.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
      </select>
    </div>
  );
};
export default OldCategoryFilter;
