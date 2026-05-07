import React from 'react';
const MobileBottomNav = ({ activePage = 'home', onNavigate }) => {
  const tabs = [{ id: 'home', label: 'Home', icon: '🏠' }, { id: 'search', label: 'Search', icon: '🔍' }, { id: 'bookmarks', label: 'Saved', icon: '📑' }, { id: 'profile', label: 'Profile', icon: '👤' }];
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', padding: '6px 0', zIndex: 80 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNavigate?.(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '6px 0', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <span style={{ fontSize: '18px', opacity: activePage === tab.id ? 1 : 0.5 }}>{tab.icon}</span>
          <span style={{ fontSize: '10px', fontWeight: 500, color: activePage === tab.id ? '#3b82f6' : '#64748b' }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
export default MobileBottomNav;
