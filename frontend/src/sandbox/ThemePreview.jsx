import React from 'react';
// preview different color themes side by side
const themes = {
  midnight: { bg: '#0f172a', card: '#1e293b', accent: '#3b82f6', text: '#f1f5f9' },
  ocean: { bg: '#0c1222', card: '#162032', accent: '#06b6d4', text: '#e0f2fe' },
  forest: { bg: '#0a1a0f', card: '#142a1a', accent: '#10b981', text: '#ecfdf5' },
  sunset: { bg: '#1a0f0f', card: '#2a1515', accent: '#f59e0b', text: '#fef3c7' },
};
const ThemePreview = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '20px' }}>
    {Object.entries(themes).map(([name, t]) => (
      <div key={name} style={{ backgroundColor: t.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${t.card}` }}>
        <h4 style={{ color: t.accent, fontSize: '14px', textTransform: 'capitalize', margin: '0 0 12px 0' }}>{name}</h4>
        <div style={{ backgroundColor: t.card, borderRadius: '8px', padding: '12px' }}>
          <p style={{ color: t.text, fontSize: '13px', margin: '0 0 4px 0' }}>Sample headline text</p>
          <span style={{ color: t.accent, fontSize: '11px' }}>Source • 2h ago</span>
        </div>
      </div>
    ))}
  </div>
);
export default ThemePreview;
