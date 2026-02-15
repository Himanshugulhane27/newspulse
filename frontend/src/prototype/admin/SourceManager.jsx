import React, { useState } from 'react';
// manage news sources - add/remove/toggle
const SourceManager = () => {
  const [sources, setSources] = useState([
    { id: 1, name: 'BBC News', url: 'bbc.com', active: true, category: 'general' },
    { id: 2, name: 'TechCrunch', url: 'techcrunch.com', active: true, category: 'technology' },
    { id: 3, name: 'ESPN', url: 'espn.com', active: false, category: 'sports' },
    { id: 4, name: 'Reuters', url: 'reuters.com', active: true, category: 'general' },
  ]);
  const toggleSource = (id) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };
  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>News Sources</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            {['Source', 'URL', 'Category', 'Status'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sources.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '10px 8px', color: '#e2e8f0', fontSize: '13px' }}>{s.name}</td>
              <td style={{ padding: '10px 8px', color: '#64748b', fontSize: '13px' }}>{s.url}</td>
              <td style={{ padding: '10px 8px', color: '#64748b', fontSize: '13px' }}>{s.category}</td>
              <td style={{ padding: '10px 8px' }}>
                <button onClick={() => toggleSource(s.id)} style={{
                  padding: '3px 10px', fontSize: '11px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                  backgroundColor: s.active ? '#10b981' : '#64748b', color: '#fff'
                }}>{s.active ? 'Active' : 'Inactive'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SourceManager;
