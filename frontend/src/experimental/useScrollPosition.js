import { useState, useEffect } from 'react';
// track scroll position - for showing/hiding navbar on scroll
function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [scrollDir, setScrollDir] = useState('up');
  const [lastY, setLastY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollPos({ x: window.scrollX, y });
      setScrollDir(y > lastY ? 'down' : 'up');
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);
  return { ...scrollPos, direction: scrollDir };
}
export default useScrollPosition;
