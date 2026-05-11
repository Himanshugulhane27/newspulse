import { useState, useEffect } from 'react';
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    if (mql.addEventListener) mql.addEventListener('change', handler); else mql.addListener(handler);
    setMatches(mql.matches);
    return () => { if (mql.removeEventListener) mql.removeEventListener('change', handler); else mql.removeListener(handler); };
  }, [query]);
  return matches;
}
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export default useMediaQuery;
