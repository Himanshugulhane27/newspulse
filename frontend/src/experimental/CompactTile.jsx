import React from 'react';

// compact tile version - maybe for mobile or sidebar
const CompactTile = ({ headline, source, timestamp }) => {
  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div style={{
      padding: '8px 12px',
      borderLeft: '3px solid #3b82f6',
      marginBottom: '6px',
      backgroundColor: '#f8fafc'
    }}>
      <span style={{ fontSize: '13px', fontWeight: 500 }}>{headline}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>{source}</span>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{timeAgo(timestamp)}</span>
      </div>
    </div>
  );
};

export default CompactTile;
