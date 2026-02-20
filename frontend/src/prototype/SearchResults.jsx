import React from 'react';
// search results page layout
const SearchResults = ({ query, results = [], loading }) => (
  <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', margin: '0 0 4px 0' }}>
        Search results for "{query || 'test'}"
      </h2>
      <span style={{ color: '#64748b', fontSize: '13px' }}>{results.length || 12} results found</span>
    </div>
    {loading ? (
      <p style={{ color: '#94a3b8' }}>Searching...</p>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(results.length ? results : Array.from({ length: 5 }, (_, i) => ({
          title: `Search result article ${i + 1}`, source: 'Source', time: '3h ago'
        }))).map((item, i) => (
          <div key={i} style={{
            padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px',
            border: '1px solid #334155', cursor: 'pointer'
          }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '15px', margin: '0 0 6px 0' }}>{item.title}</h3>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{item.source} • {item.time}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);
export default SearchResults;
