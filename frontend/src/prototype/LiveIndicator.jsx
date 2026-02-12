import React from 'react';
// pulsing live indicator for real-time news
const LiveIndicator = ({ label = 'LIVE' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
    <span style={{
      width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444',
      animation: 'pulse-live 1.5s ease-in-out infinite', display: 'inline-block'
    }}/>
    <style>{`@keyframes pulse-live { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', letterSpacing: '1px' }}>{label}</span>
  </div>
);
export default LiveIndicator;
