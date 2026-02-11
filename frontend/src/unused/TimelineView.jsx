import React from 'react';
// timeline view - shows news chronologically
// tried this layout but pagination works better for us
const TimelineView = ({ articles = [] }) => {
  const mockArticles = articles.length ? articles : [
    { title: 'Morning Update: Markets open higher', time: '09:30 AM', category: 'Business' },
    { title: 'Tech giant announces new product line', time: '11:15 AM', category: 'Technology' },
    { title: 'Weather alert for coastal regions', time: '01:45 PM', category: 'General' },
    { title: 'Sports recap: Weekend matches', time: '04:20 PM', category: 'Sports' },
  ];
  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      {mockArticles.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }}/>
            {i < mockArticles.length - 1 && <div style={{ width: '2px', flex: 1, backgroundColor: '#1e293b' }}/>}
          </div>
          <div style={{ flex: 1, paddingBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{item.time}</span>
            <h4 style={{ margin: '4px 0', color: '#e2e8f0', fontSize: '14px' }}>{item.title}</h4>
            <span style={{ fontSize: '11px', color: '#3b82f6' }}>{item.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TimelineView;
