import React from 'react';
const BreakingBanner = ({ headline, source, onDismiss }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', backgroundColor: 'rgba(239,68,68,0.1)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
    <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px', animation: 'pulse 2s infinite' }}>BREAKING</span>
    <span style={{ flex: 1, color: '#f1f5f9', fontSize: '13px', fontWeight: 500 }}>{headline || 'Breaking news headline'}</span>
    <span style={{ color: '#94a3b8', fontSize: '11px' }}>{source}</span>
    {onDismiss && <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
  </div>
);
export default BreakingBanner;
