import React, { useState, useRef, useEffect } from 'react';
// full screen search overlay experiment
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: '20vh', zIndex: 1000
    }}>
      <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search articles, topics, sources..."
          style={{
            width: '100%', padding: '16px 24px', fontSize: '18px', borderRadius: '12px',
            border: '2px solid #3b82f6', backgroundColor: '#1e293b', color: '#f8fafc',
            outline: 'none'
          }}/>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
          Press ESC to close
        </p>
      </div>
      <button onClick={onClose} style={{
        position: 'absolute', top: '20px', right: '20px', background: 'none',
        border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer'
      }}>✕</button>
    </div>
  );
};
export default SearchOverlay;
