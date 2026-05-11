import React, { useState, useEffect } from 'react';
const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>;
};
export default ScrollToTop;
