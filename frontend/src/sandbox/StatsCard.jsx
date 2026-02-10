import React from 'react';
// stats card for analytics dashboard prototype
const StatsCard = ({ label, value, change, icon }) => {
  const isPositive = change >= 0;
  return (
    <div style={{
      padding: '20px', borderRadius: '12px', backgroundColor: '#1e293b',
      border: '1px solid #334155', minWidth: '180px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '20px' }}>{icon || '📊'}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9' }}>{value}</div>
      {change !== undefined && (
        <div style={{ fontSize: '12px', color: isPositive ? '#10b981' : '#ef4444', marginTop: '4px' }}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last week
        </div>
      )}
    </div>
  );
};
export default StatsCard;
