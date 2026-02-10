import React, { useState } from 'react';
// notification bell with badge - just a visual prototype
const NotificationBell = ({ count = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, text: 'New trending topic in Technology', time: '5m ago', read: false },
    { id: 2, text: 'Your bookmarked article was updated', time: '1h ago', read: false },
    { id: 3, text: 'Breaking news in Science', time: '2h ago', read: true },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px'
      }}>
        <span style={{ fontSize: '20px' }}>🔔</span>
        {count > 0 && (
          <span style={{
            position: 'absolute', top: 0, right: 0, backgroundColor: '#ef4444',
            color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '10px', fontWeight: 600
          }}>{count}</span>
        )}
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute', right: 0, top: '100%', width: '280px', backgroundColor: '#1e293b',
          borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden', zIndex: 50, marginTop: '8px'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #334155' }}>
            <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>Notifications</span>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{
              padding: '10px 16px', borderBottom: '1px solid #1e293b',
              backgroundColor: n.read ? 'transparent' : 'rgba(59,130,246,0.05)'
            }}>
              <p style={{ color: '#e2e8f0', fontSize: '12px', margin: 0 }}>{n.text}</p>
              <span style={{ color: '#64748b', fontSize: '10px' }}>{n.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
