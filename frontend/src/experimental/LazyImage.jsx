import React, { useState, useRef, useEffect } from 'react';
// lazy load images with intersection observer
// shows a blur placeholder until image is in viewport
const LazyImage = ({ src, alt, style = {}, placeholderColor = '#1e293b' }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={imgRef} style={{
      backgroundColor: placeholderColor, overflow: 'hidden', ...style
    }}>
      {inView && (
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease'
        }}/>
      )}
    </div>
  );
};
export default LazyImage;
