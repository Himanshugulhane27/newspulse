import React, { useState } from 'react';
// notification preferences page
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    breaking: true, daily: false, weekly: true,
    categories: { technology: true, sports: false, business: true }
  });
  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '20px' }}>Notification Settings</h3>
      {[
        { key: 'breaking', label: 'Breaking News Alerts', desc: 'Get notified for major breaking stories' },
        { key: 'daily', label: 'Daily Digest', desc: 'Summary of top stories every morning' },
        { key: 'weekly', label: 'Weekly Roundup', desc: 'Best stories from the past week' },
      ].map(item => (
        <div key={item.key} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 0', borderBottom: '1px solid #1e293b'
        }}>
          <div>
            <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0 }}>{item.label}</p>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{item.desc}</span>
          </div>
          <button onClick={() => toggle(item.key)} style={{
            width: '44px', height: '24px', borderRadius: '12px', border: 'none',
            backgroundColor: settings[item.key] ? '#3b82f6' : '#334155', cursor: 'pointer',
            position: 'relative'
          }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff',
              position: 'absolute', top: '3px',
              left: settings[item.key] ? '23px' : '3px', transition: 'left 0.2s ease'
            }}/>
          </button>
        </div>
      ))}
    </div>
  );
};
export default NotificationSettings;
