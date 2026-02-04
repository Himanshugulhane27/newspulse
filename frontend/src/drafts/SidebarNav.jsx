import React from 'react';

// draft sidebar navigation - exploring a left panel layout
// might not use this, just trying it out
const SidebarNav = ({ categories, activeCategory, onSelect }) => {
  const defaultCategories = categories || [
    'General', 'Technology', 'Business', 'Science',
    'Health', 'Sports', 'Entertainment'
  ];

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '20px 0',
      borderRight: '1px solid #1e293b'
    }}>
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h2 style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 700 }}>NewsPulse</h2>
      </div>
      <nav>
        {defaultCategories.map((cat) => (
          <div
            key={cat}
            onClick={() => onSelect?.(cat)}
            style={{
              padding: '10px 20px',
              color: activeCategory === cat ? '#3b82f6' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              borderLeft: activeCategory === cat ? '3px solid #3b82f6' : '3px solid transparent',
              backgroundColor: activeCategory === cat ? 'rgba(59,130,246,0.1)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;
