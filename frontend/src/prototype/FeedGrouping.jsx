import React from 'react';
const FeedGrouping = () => {
  const groups = [
    { label: 'Today', items: [
      { title: 'AI regulation bill passes committee vote', source: 'Reuters', time: '1h ago' },
      { title: 'Tech stocks rally after earnings beat', source: 'Bloomberg', time: '3h ago' },
      { title: 'New satellite internet service launches', source: 'TechCrunch', time: '5h ago' },
    ]},
    { label: 'Yesterday', items: [
      { title: 'Climate summit reaches key agreement', source: 'BBC News', time: '1d ago' },
      { title: 'Sports league announces expansion teams', source: 'ESPN', time: '1d ago' },
    ]},
    { label: 'This Week', items: [
      { title: 'Electric vehicle sales hit record high', source: 'NDTV', time: '3d ago' },
    ]}
  ];
  return (
    <div style={{ maxWidth: '700px' }}>
      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{g.label}</h3>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#1e293b' }}/>
          </div>
          {g.items.map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', borderLeft: '3px solid #334155', marginBottom: '6px', borderRadius: '0 8px 8px 0', backgroundColor: '#0f172a', cursor: 'pointer' }}>
              <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>{item.title}</h4>
              <span style={{ color: '#64748b', fontSize: '11px' }}>{item.source} · {item.time}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default FeedGrouping;
