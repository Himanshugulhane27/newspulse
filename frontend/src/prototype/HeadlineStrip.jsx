import React, { useState, useEffect } from 'react';

// scrolling headline strip - news ticker
const HeadlineStrip = ({ headlines = [] }) => {
  const [idx, setIdx] = useState(0);
  const items = headlines.length ? headlines : [
    'Breaking: AI regulation bill advances to floor vote',
    'Markets: Sensex crosses 80,000 for the first time',
    'Sports: India wins test series against Australia',
    'Tech: New smartphone chip delivers 40% better battery life',
    'Science: James Webb telescope captures new galaxy images',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '8px 16px', backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b', overflow: 'hidden'
    }}>
      <span style={{
        fontSize: '10px', fontWeight: 700, color: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)', padding: '3px 8px',
        borderRadius: '4px', flexShrink: 0, letterSpacing: '0.5px'
      }}>LIVE</span>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '18px' }}>
        {items.map((text, i) => (
          <p key={i} style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            color: '#e2e8f0', fontSize: '12px', margin: 0,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default HeadlineStrip;
