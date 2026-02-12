import React from 'react';
// standalone bookmarks list view - exploring a different layout
// than what we have in the dashboard
const BookmarksList = ({ bookmarks = [] }) => {
  const mockBookmarks = bookmarks.length ? bookmarks : [
    { id: 1, title: 'AI Revolution in Healthcare', source: 'TechCrunch', savedAt: '2026-02-10' },
    { id: 2, title: 'Global Climate Action Plan 2026', source: 'BBC News', savedAt: '2026-02-09' },
    { id: 3, title: 'Market Analysis: Q1 Outlook', source: 'Reuters', savedAt: '2026-02-08' },
  ];
  return (
    <div style={{ padding: '20px', maxWidth: '700px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '16px' }}>📑 Saved Articles</h2>
      {mockBookmarks.map(b => (
        <div key={b.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderBottom: '1px solid #1e293b'
        }}>
          <div>
            <h4 style={{ color: '#e2e8f0', fontSize: '14px', margin: '0 0 4px 0' }}>{b.title}</h4>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{b.source} • Saved {b.savedAt}</span>
          </div>
          <button style={{
            padding: '4px 10px', fontSize: '11px', border: '1px solid #334155',
            borderRadius: '6px', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer'
          }}>Remove</button>
        </div>
      ))}
    </div>
  );
};
export default BookmarksList;
