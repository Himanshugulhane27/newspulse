import React, { useState, useEffect } from 'react';
// countdown to next refresh - felt unnecessary, not using
const CountdownTimer = ({ seconds = 30, onComplete }) => {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) { onComplete?.(); setRemaining(seconds); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, seconds, onComplete]);
  const pct = (remaining / seconds) * 100;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `conic-gradient(#3b82f6 ${pct}%, #1e293b ${pct}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{remaining}</span>
        </div>
      </div>
      <span style={{ color: '#64748b', fontSize: '11px' }}>refresh</span>
    </div>
  );
};
export default CountdownTimer;
