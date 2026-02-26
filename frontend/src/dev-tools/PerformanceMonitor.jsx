import React, { useState, useEffect } from 'react';
// dev-only performance monitor overlay
const PerformanceMonitor = ({ visible = true }) => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(null);
  useEffect(() => {
    if (!visible) return;
    let frameCount = 0;
    let lastTime = performance.now();
    const tick = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [visible]);
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', top: '10px', right: '10px', padding: '8px 12px',
      backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '6px', zIndex: 9999,
      fontFamily: 'monospace', fontSize: '11px', color: fps > 30 ? '#10b981' : '#ef4444'
    }}>
      {fps} FPS {memory ? `| ${memory}MB` : ''}
    </div>
  );
};
export default PerformanceMonitor;
