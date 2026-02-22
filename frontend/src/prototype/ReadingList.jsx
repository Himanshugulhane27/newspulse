import React, { useState } from 'react';
// reading list / save for later feature
const ReadingList = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'The Future of AI in Journalism', source: 'Wired', addedAt: '2 days ago', read: false },
    { id: 2, title: 'Climate Policy Changes in 2026', source: 'Reuters', addedAt: '3 days ago', read: true },
    { id: 3, title: 'Startup Ecosystem Report', source: 'TechCrunch', addedAt: '5 days ago', read: false },
  ]);
  const toggleRead = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, read: !i.read } : i));
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  return (
    <div style={{ padding: '24px', maxWidth: '700px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '20px' }}>📚 Reading List</h2>
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
          borderBottom: '1px solid #1e293b', opacity: item.read ? 0.5 : 1
        }}>
          <input type="checkbox" checked={item.read} onChange={() => toggleRead(item.id)}/>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#e2e8f0', fontSize: '14px', margin: '0 0 2px 0', textDecoration: item.read ? 'line-through' : 'none' }}>
              {item.title}
            </h4>
            <span style={{ color: '#64748b', fontSize: '11px' }}>{item.source} • Added {item.addedAt}</span>
          </div>
          <button onClick={() => removeItem(item.id)} style={{
            background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px'
          }}>✕</button>
        </div>
      ))}
    </div>
  );
};
export default ReadingList;
