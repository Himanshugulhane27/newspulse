import React from 'react';
const NewsCardMini = ({ title, source, time, rank }) => (
  <div style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(30,41,59,0.6)', cursor: 'pointer' }}>
    {rank && <span style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', WebkitTextStroke: '1px #334155', width: '28px', flexShrink: 0 }}>{rank}</span>}
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500, margin: '0 0 4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</h4>
      <div style={{ display: 'flex', gap: '6px' }}>
        <span style={{ color: '#3b82f6', fontSize: '10px', fontWeight: 500 }}>{source}</span>
        <span style={{ color: '#64748b', fontSize: '10px' }}>{time || '1h ago'}</span>
      </div>
    </div>
  </div>
);
export default NewsCardMini;
