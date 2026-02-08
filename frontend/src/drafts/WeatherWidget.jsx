import React from 'react';
// small weather widget idea for the dashboard header
// probably overcomplicating things but wanted to try
const WeatherWidget = ({ temp, condition, city }) => {
  const icons = { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px', borderRadius: '20px',
      backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)'
    }}>
      <span>{icons[condition] || '🌤️'}</span>
      <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{temp || '22'}°C</span>
      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{city || 'Mumbai'}</span>
    </div>
  );
};
export default WeatherWidget;
