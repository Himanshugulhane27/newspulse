import React, { useState } from 'react';
// quick filter bar for timeframe selection
const QuickFilters = ({ onFilterChange }) => {
  const [active, setActive] = useState('today');
  const filters = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'trending', label: '🔥 Trending' },
  ];
  const handleClick = (id) => {
    setActive(id);
    onFilterChange?.(id);
  };
  return (
    <div style={{ display: 'flex', gap: '6px', padding: '12px 0' }}>
      {filters.map(f => (
        <button key={f.id} onClick={() => handleClick(f.id)} style={{
          padding: '6px 16px', borderRadius: '20px', fontSize: '12px',
          border: 'none', cursor: 'pointer',
          backgroundColor: active === f.id ? '#3b82f6' : '#1e293b',
          color: active === f.id ? '#fff' : '#94a3b8',
          transition: 'all 0.2s ease'
        }}>{f.label}</button>
      ))}
    </div>
  );
};
export default QuickFilters;
