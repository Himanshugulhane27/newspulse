import React from 'react';
// empty state component for when there's no data
const EmptyState = ({ icon = '📭', title, message, actionLabel, onAction }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '60px 20px', textAlign: 'center'
  }}>
    <span style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</span>
    <h3 style={{ color: '#f1f5f9', fontSize: '18px', margin: '0 0 8px 0' }}>
      {title || 'Nothing here yet'}
    </h3>
    <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 0 20px 0' }}>
      {message || 'Check back later for updates.'}
    </p>
    {actionLabel && (
      <button onClick={onAction} style={{
        padding: '10px 24px', backgroundColor: '#3b82f6', color: '#fff',
        border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
      }}>{actionLabel}</button>
    )}
  </div>
);
export default EmptyState;
