const categories = ['general','technology','business','science','health','sports'];
async function warmCache(fetchFn, cache) {
  console.log('[CacheWarmer] Starting...');
  let success = 0, failed = 0;
  for (const cat of categories) {
    try { const data = await fetchFn(cat, 'in', 1); if (data && cache) { cache.set(cat, 'in', 1, data); success++; } }
    catch (err) { console.warn(`[CacheWarmer] ${cat} failed:`, err.message); failed++; }
  }
  console.log(`[CacheWarmer] Done — ${success} cached, ${failed} failed`);
  return { success, failed };
}
module.exports = { warmCache };
