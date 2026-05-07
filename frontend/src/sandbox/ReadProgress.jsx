import React, { useState, useEffect } from 'react';
const ReadProgress = ({ color = '#3b82f6', height = 3 }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: `${height}px`, backgroundColor: 'transparent', zIndex: 999 }}>
      <div style={{ height: '100%', width: `${progress}%`, backgroundColor: color, transition: 'width 0.1s ease', borderRadius: '0 2px 2px 0' }}/>
    </div>
  );
};
export default ReadProgress;
