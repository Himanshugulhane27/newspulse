import React, { useState, useRef } from 'react';
// pull to refresh gesture for mobile
const PullToRefresh = ({ onRefresh, children }) => {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const threshold = 80;
  const handleTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const handleTouchMove = (e) => {
    if (window.scrollY > 0) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPulling(true);
      setPullDistance(Math.min(diff * 0.5, 100));
    }
  };
  const handleTouchEnd = () => {
    if (pullDistance > threshold) onRefresh?.();
    setPulling(false);
    setPullDistance(0);
  };
  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {pulling && (
        <div style={{
          height: `${pullDistance}px`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: pulling ? 'none' : 'height 0.3s ease'
        }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>
            {pullDistance > threshold ? '↑ Release to refresh' : '↓ Pull to refresh'}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};
export default PullToRefresh;
