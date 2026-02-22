import React, { useState } from 'react';
// mobile hamburger menu drawer
const MobileMenu = ({ isOpen, onClose, categories }) => {
  if (!isOpen) return null;
  const cats = categories || ['General', 'Technology', 'Business', 'Science', 'Health', 'Sports', 'Entertainment'];
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 98 }}/>
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px',
        backgroundColor: '#0f172a', zIndex: 99, padding: '24px',
        transform: 'translateX(0)', transition: 'transform 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '18px', margin: 0 }}>NewsPulse</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {cats.map(cat => (
            <a key={cat} href="#" style={{
              padding: '10px 14px', color: '#e2e8f0', textDecoration: 'none',
              borderRadius: '8px', fontSize: '14px'
            }}>{cat}</a>
          ))}
        </nav>
      </div>
    </>
  );
};
export default MobileMenu;
