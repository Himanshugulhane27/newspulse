import React from 'react';
// tiny sparkline chart for showing article count trends
// using pure divs, no chart library
const MiniChart = ({ data = [], height = 30, color = '#3b82f6' }) => {
  const values = data.length ? data : [4, 7, 3, 8, 5, 9, 6, 8, 4, 7];
  const max = Math.max(...values);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: `${height}px` }}>
      {values.map((val, i) => (
        <div key={i} style={{
          flex: 1, backgroundColor: color, borderRadius: '2px 2px 0 0',
          height: `${(val / max) * 100}%`, minWidth: '3px', opacity: 0.7 + (val / max) * 0.3,
          transition: 'height 0.3s ease'
        }}/>
      ))}
    </div>
  );
};
export default MiniChart;
