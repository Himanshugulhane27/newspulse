import { useState, useEffect, useRef } from 'react';
function useNewsPolling(fetchFn, intervalMs = 30000, enabled = true) {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isPolling, setIsPolling] = useState(enabled);
  const savedFetch = useRef(fetchFn);
  useEffect(() => { savedFetch.current = fetchFn; }, [fetchFn]);
  useEffect(() => {
    if (!isPolling) return;
    let mounted = true;
    const poll = async () => {
      try { const r = await savedFetch.current(); if (mounted) { setData(r); setLastUpdated(new Date()); } }
      catch (err) { console.warn('[Polling] failed:', err.message); }
    };
    poll();
    const id = setInterval(poll, intervalMs);
    return () => { mounted = false; clearInterval(id); };
  }, [intervalMs, isPolling]);
  return { data, lastUpdated, isPolling, startPolling: () => setIsPolling(true), stopPolling: () => setIsPolling(false) };
}
export default useNewsPolling;
