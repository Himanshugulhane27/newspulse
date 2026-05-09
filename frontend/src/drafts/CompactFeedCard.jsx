import React from 'react';
const CompactFeedCard = ({ title, source, time, imageUrl }) => (
  <div style={{ display: 'flex', gap: '10px', padding: '10px 14px', borderBottom: '1px solid #1e293b', cursor: 'pointer', transition: 'background-color 0.15s ease' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</h4>
      <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
        <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 500 }}>{source}</span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>{time || '2h ago'}</span>
      </div>
    </div>
    {imageUrl && <img src={imageUrl} alt="" style={{ width: '72px', height: '52px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}/>}
  </div>
);
export default CompactFeedCard;
