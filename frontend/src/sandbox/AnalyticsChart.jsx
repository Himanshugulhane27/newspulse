import React from 'react';
// bar chart using pure CSS - no external libs
const AnalyticsChart = ({ data, label = 'Articles' }) => {
  const chartData = data || [
    { day: 'Mon', value: 45 }, { day: 'Tue', value: 72 }, { day: 'Wed', value: 58 },
    { day: 'Thu', value: 91 }, { day: 'Fri', value: 63 }, { day: 'Sat', value: 38 },
    { day: 'Sun', value: 82 }
  ];
  const maxVal = Math.max(...chartData.map(d => d.value));
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 16px 0' }}>{label} this week</h4>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
        {chartData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{d.value}</span>
            <div style={{
              width: '100%', backgroundColor: '#3b82f6', borderRadius: '4px 4px 0 0',
              height: `${(d.value / maxVal) * 100}%`, transition: 'height 0.5s ease'
            }}/>
            <span style={{ fontSize: '10px', color: '#64748b' }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AnalyticsChart;
