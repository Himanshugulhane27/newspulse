import React, { useState } from 'react';
// focus mode - hides distractions, shows only article list
// toggle for users who want minimal UI
const FocusMode = ({ enabled, onToggle, children }) => {
  return (
    <div>
      <button onClick={onToggle} style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 50,
        width: '44px', height: '44px', borderRadius: '50%',
        backgroundColor: enabled ? '#3b82f6' : '#334155',
        border: 'none', cursor: 'pointer', fontSize: '18px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        {enabled ? '📖' : '👁️'}
      </button>
      <div style={{
        transition: 'all 0.3s ease',
        ...(enabled && { maxWidth: '600px', margin: '0 auto' })
      }}>
        {children}
      </div>
    </div>
  );
};
export default FocusMode;
