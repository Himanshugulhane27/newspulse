import React, { useState, useEffect } from 'react';
const TrendingWidget = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const topics = [{ label: 'AI Ethics Debate', count: '2.4k', hot: true },{ label: 'IPL 2026 Finals', count: '1.8k', hot: true },{ label: 'Budget Session', count: '980', hot: false },{ label: 'EV Market Boom', count: '756', hot: false },{ label: 'Mars Rover Update', count: '623', hot: false }];
  useEffect(() => { const t = setInterval(() => setActiveIdx(p => (p + 1) % topics.length), 3500); return () => clearInterval(t); }, [topics.length]);
  return (
    <div style={{ padding: '14px 18px', backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px' }}>📈</span><span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trending Now</span>
      </div>
      {topics.map((t, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < topics.length - 1 ? '1px solid rgba(51,65,85,0.5)' : 'none', opacity: i === activeIdx ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 500, width: '18px' }}>{i + 1}</span>
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500 }}>{t.label}</span>{t.hot && <span style={{ fontSize: '10px' }}>🔥</span>}
          </div>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{t.count}</span>
        </div>
      ))}
    </div>
  );
};
export default TrendingWidget;
