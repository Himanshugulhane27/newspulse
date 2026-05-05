import React from 'react';
const BookmarkWidget = ({ bookmarks = [], maxItems = 4 }) => {
  const items = bookmarks.length ? bookmarks : [
    { id: 1, title: 'AI Ethics: What Developers Need to Know', source: 'Wired', savedAt: '2h ago' },
    { id: 2, title: 'Markets Close Higher on Fed Comments', source: 'Reuters', savedAt: '5h ago' },
    { id: 3, title: 'SpaceX Announces New Mission Timeline', source: 'BBC', savedAt: '1d ago' },
    { id: 4, title: 'India Tech Sector Growth Report 2026', source: 'NDTV', savedAt: '2d ago' },
  ];
  return (
    <div style={{ padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600, margin: 0 }}>📑 Recent Bookmarks</h4>
        <span style={{ color: '#3b82f6', fontSize: '11px', cursor: 'pointer' }}>View all</span>
      </div>
      {items.slice(0, maxItems).map(b => (
        <div key={b.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(51,65,85,0.4)' }}>
          <p style={{ color: '#e2e8f0', fontSize: '12px', margin: '0 0 3px', fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{b.source} · {b.savedAt}</span>
        </div>
      ))}
    </div>
  );
};
export default BookmarkWidget;
