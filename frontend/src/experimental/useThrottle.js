import { useState, useEffect, useRef } from 'react';
function useThrottle(value, limit = 200) {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef(Date.now());
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) { setThrottled(value); lastRan.current = Date.now(); }
    }, limit - (Date.now() - lastRan.current));
    return () => clearTimeout(handler);
  }, [value, limit]);
  return throttled;
}
export default useThrottle;
