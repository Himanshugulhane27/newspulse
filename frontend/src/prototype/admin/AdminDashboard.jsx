import React from 'react';
// admin dashboard prototype - for managing sources and categories
// not connected to anything, just layout exploration
const AdminDashboard = () => {
  const stats = [
    { label: 'Total Articles', value: '12,458', icon: '📰' },
    { label: 'Active Sources', value: '23', icon: '🔗' },
    { label: 'Users Today', value: '156', icon: '👥' },
    { label: 'API Calls', value: '4,201', icon: '⚡' },
  ];
  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ color: '#f1f5f9', fontSize: '24px', marginBottom: '24px' }}>Admin Panel</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '24px' }}>{s.icon}</span>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', margin: '8px 0 4px' }}>{s.value}</div>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '16px' }}>Recent Activity</h3>
        <p style={{ color: '#64748b', fontSize: '13px' }}>No activity data connected yet.</p>
      </div>
    </div>
  );
};
export default AdminDashboard;
