import React from 'react';
const CompactHeadlineList = ({ headlines = [], maxItems = 8 }) => {
  const items = headlines.length ? headlines : [
    { title: 'India GDP growth exceeds expectations', source: 'Reuters', hot: true },
    { title: 'New climate data shows accelerating trend', source: 'BBC', hot: false },
    { title: 'Tech layoffs slow down in Q2', source: 'TechCrunch', hot: false },
    { title: 'Cricket world cup schedule announced', source: 'ESPN', hot: true },
    { title: 'Electric car sales surge in Europe', source: 'Bloomberg', hot: false },
    { title: 'AI chatbot passes medical exam', source: 'Wired', hot: true },
    { title: 'Housing market shows recovery signs', source: 'NDTV', hot: false },
    { title: 'Space agency reveals moon mission update', source: 'BBC', hot: false },
  ];
  return (
    <div style={{ padding: '12px 0' }}>
      {items.slice(0, maxItems).map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 12px', cursor: 'pointer', borderRadius: '6px' }}>
          <span style={{ color: '#475569', fontSize: '11px', fontWeight: 600, width: '16px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#e2e8f0', fontSize: '13px', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>{item.title}{item.hot && <span style={{ color: '#f59e0b', marginLeft: '4px', fontSize: '10px' }}> 🔥</span>}</p>
            <span style={{ color: '#64748b', fontSize: '10px' }}>{item.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CompactHeadlineList;
