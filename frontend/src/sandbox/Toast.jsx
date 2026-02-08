import React from 'react';

// toast notification component for in-app alerts
// experimenting with auto-dismiss and different types
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const colors = {
    info: { bg: '#1e40af', border: '#3b82f6' },
    success: { bg: '#065f46', border: '#10b981' },
    warning: { bg: '#92400e', border: '#f59e0b' },
    error: { bg: '#991b1b', border: '#ef4444' },
  };

  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
  const c = colors[type] || colors.info;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose?.(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
      padding: '12px 20px', borderRadius: '10px',
      backgroundColor: c.bg, borderLeft: `4px solid ${c.border}`,
      color: '#fff', fontSize: '13px', maxWidth: '360px',
      display: 'flex', alignItems: 'center', gap: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      animation: 'slideInRight 0.3s ease'
    }}>
      <span>{icons[type]}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer', fontSize: '14px', padding: '0 4px'
      }}>✕</button>
    </div>
  );
};

export default Toast;
