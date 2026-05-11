import React from 'react';
const MobileNavDrawer = ({ open, onClose, onCategorySelect }) => {
  if (!open) return null;
  const cats = [{ id: 'general', label: 'General', emoji: '📰' },{ id: 'technology', label: 'Technology', emoji: '💻' },{ id: 'business', label: 'Business', emoji: '📊' },{ id: 'science', label: 'Science', emoji: '🔬' },{ id: 'health', label: 'Health', emoji: '🏥' },{ id: 'sports', label: 'Sports', emoji: '⚽' },{ id: 'entertainment', label: 'Entertainment', emoji: '🎬' }];
  return (<>
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 90, backdropFilter: 'blur(2px)' }}/>
    <nav style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px', backgroundColor: '#0f172a', zIndex: 91, padding: '20px 0', borderRight: '1px solid #1e293b' }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #1e293b' }}><h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>NewsPulse</h2></div>
      <div style={{ padding: '16px 12px' }}>
        {cats.map(cat => (<button key={cat.id} onClick={() => { onCategorySelect?.(cat.id); onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', border: 'none', backgroundColor: 'transparent', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}><span>{cat.emoji}</span>{cat.label}</button>))}
      </div>
    </nav>
  </>);
};
export default MobileNavDrawer;
