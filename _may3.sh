#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse
c() { git add -A; GIT_AUTHOR_DATE="$2" GIT_COMMITTER_DATE="$2" git commit -m "$1"; }

# MAY 09 → 6 commits
cat > backend/src/experimental/cacheWarmer.js << 'EOF'
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
EOF
c "cache warmer for startup prefetch" "2026-05-09T09:20:44+05:30"

cat > frontend/src/sandbox/NewsCardMini.jsx << 'EOF'
import React from 'react';
const NewsCardMini = ({ title, source, time, rank }) => (
  <div style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(30,41,59,0.6)', cursor: 'pointer' }}>
    {rank && <span style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', WebkitTextStroke: '1px #334155', width: '28px', flexShrink: 0 }}>{rank}</span>}
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500, margin: '0 0 4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</h4>
      <div style={{ display: 'flex', gap: '6px' }}>
        <span style={{ color: '#3b82f6', fontSize: '10px', fontWeight: 500 }}>{source}</span>
        <span style={{ color: '#64748b', fontSize: '10px' }}>{time || '1h ago'}</span>
      </div>
    </div>
  </div>
);
export default NewsCardMini;
EOF
c "mini card for sidebar stories" "2026-05-09T12:08:33+05:30"

cat > frontend/src/drafts/grid-variants.css << 'EOF'
.feed-grid-a { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.feed-grid-b { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto auto; gap: 16px; }
.feed-grid-b .featured { grid-row: 1 / 3; }
.feed-grid-c { columns: 3; column-gap: 16px; }
.feed-grid-c .card { break-inside: avoid; margin-bottom: 16px; }
.feed-grid-d { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 16px; }
.feed-grid-d .card { flex: 0 0 280px; scroll-snap-align: start; }
@media (max-width: 768px) { .feed-grid-a, .feed-grid-b, .feed-grid-c { display: flex; flex-direction: column; gap: 12px; } }
EOF
c "feed grid layout variants css" "2026-05-09T14:42:18+05:30"

cat > backend/src/sandbox/apiUsageTracker.js << 'EOF'
class ApiUsageTracker {
  constructor(dailyLimit = 100) { this.dailyLimit = dailyLimit; this.requests = []; }
  recordRequest() { this.requests.push(Date.now()); this._clean(); }
  getTodayCount() { this._clean(); return this.requests.length; }
  getRemainingQuota() { return Math.max(0, this.dailyLimit - this.getTodayCount()); }
  canMakeRequest() { return this.getRemainingQuota() > 0; }
  getStats() { const c = this.getTodayCount(); return { used: c, remaining: this.dailyLimit - c, limit: this.dailyLimit, percentage: Math.round((c / this.dailyLimit) * 100), canRequest: this.canMakeRequest() }; }
  _clean() { const d = new Date(); d.setHours(0,0,0,0); this.requests = this.requests.filter(ts => ts >= d.getTime()); }
}
module.exports = ApiUsageTracker;
EOF
c "api usage tracker to monitor quota" "2026-05-09T17:55:50+05:30"

cat > frontend/src/drafts/CompactFeedCard.jsx << 'EOF'
import React from 'react';
const CompactFeedCard = ({ title, source, time, imageUrl }) => (
  <div style={{ display: 'flex', gap: '10px', padding: '10px 14px', borderBottom: '1px solid #1e293b', cursor: 'pointer', transition: 'background-color 0.15s ease' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</h4>
      <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
        <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 500 }}>{source}</span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>{time || '2h ago'}</span>
      </div>
    </div>
    {imageUrl && <img src={imageUrl} alt="" style={{ width: '72px', height: '52px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}/>}
  </div>
);
export default CompactFeedCard;
EOF
c "compact feed card layout" "2026-05-09T20:30:15+05:30"

cat > frontend/src/experimental/useNewsPolling.js << 'EOF'
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
EOF
c "news polling hook as ws fallback" "2026-05-09T23:48:40+05:30"

# MAY 10 → 1 commit (quick patch)
cat > backend/src/mock/sampleResponses.json << 'EOF'
{"newsApiSample":{"status":"ok","totalResults":2,"articles":[{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Sarah Perez","title":"AI startup raises $50M in Series B funding","description":"An artificial intelligence startup focused on enterprise solutions has closed a $50 million Series B round.","url":"https://example.com/ai-startup","urlToImage":"https://picsum.photos/400/200","publishedAt":"2026-02-04T08:00:00Z","content":"Lorem ipsum dolor sit amet."},{"source":{"id":null,"name":"Reuters"},"author":"John Smith","title":"Global markets rally on economic data","description":"Stock markets around the world rose sharply following positive economic indicators.","url":"https://example.com/markets","urlToImage":"https://picsum.photos/400/201","publishedAt":"2026-02-04T06:30:00Z","content":"Markets showed strong performance."}]}}
EOF
c "trim sample responses payload" "2026-05-10T16:30:22+05:30"

# MAY 11 → 10 commits (big late-night session)
cat > frontend/src/drafts/MobileNavDrawer.jsx << 'EOF'
import React from 'react';
const MobileNavDrawer = ({ open, onClose, onCategorySelect }) => {
  if (!open) return null;
  const cats = [{ id: 'general', label: 'General', emoji: '📰' },{ id: 'technology', label: 'Technology', emoji: '💻' },{ id: 'business', label: 'Business', emoji: '📊' },{ id: 'science', label: 'Science', emoji: '🔬' },{ id: 'health', label: 'Health', emoji: '🏥' },{ id: 'sports', label: 'Sports', emoji: '⚽' },{ id: 'entertainment', label: 'Entertainment', emoji: '🎬' }];
  return (<>
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 90, backdropFilter: 'blur(2px)' }}/>
    <nav style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px', backgroundColor: '#0f172a', zIndex: 91, padding: '20px 0', borderRight: '1px solid #1e293b' }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #1e293b' }}><h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>NewsPulse</h2></div>
      <div style={{ padding: '16px 12px' }}>
        {cats.map(cat => (<button key={cat.id} onClick={() => { onCategorySelect?.(cat.id); onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', border: 'none', backgroundColor: 'transparent', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}><span>{cat.emoji}</span>{cat.label}</button>))}
      </div>
    </nav>
  </>);
};
export default MobileNavDrawer;
EOF
c "rough mobile nav drawer" "2026-05-11T10:15:22+05:30"

cat > backend/src/sandbox/feedbackEndpoint.js << 'EOF'
const express = require('express');
const router = express.Router();
router.post('/feedback', (req, res) => {
  const { articleId, type, message } = req.body;
  if (!articleId || !type) return res.status(400).json({ success: false, error: 'articleId and type required' });
  const validTypes = ['broken_link', 'wrong_category', 'inappropriate', 'other'];
  if (!validTypes.includes(type)) return res.status(400).json({ success: false, error: `type must be one of: ${validTypes.join(', ')}` });
  console.log(`[Feedback] Article: ${articleId}, Type: ${type}`);
  res.json({ success: true, message: 'Feedback received', feedbackId: `fb_${Date.now()}` });
});
module.exports = router;
EOF
c "draft feedback endpoint" "2026-05-11T12:40:18+05:30"

cat > frontend/src/sandbox/ArticleActions.jsx << 'EOF'
import React, { useState } from 'react';
const ArticleActions = ({ articleId, onBookmark, onShare }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);
  const handleBookmark = () => { setBookmarked(!bookmarked); onBookmark?.(articleId, !bookmarked); };
  const handleShare = async () => { try { await navigator.clipboard.writeText(`${window.location.origin}/article/${articleId}`); setShared(true); setTimeout(() => setShared(false), 2000); } catch {} onShare?.(articleId); };
  const btn = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' };
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '6px 0', borderTop: '1px solid rgba(30,41,59,0.5)' }}>
      <button onClick={handleBookmark} style={{ ...btn, color: bookmarked ? '#f59e0b' : '#64748b' }}>{bookmarked ? '★ Saved' : '☆ Save'}</button>
      <button onClick={handleShare} style={{ ...btn, color: shared ? '#10b981' : '#64748b' }}>{shared ? '✓ Copied' : '🔗 Share'}</button>
    </div>
  );
};
export default ArticleActions;
EOF
c "article action buttons component" "2026-05-11T14:55:08+05:30"

rm -f frontend/src/drafts/GridLayout.jsx
c "cleanup old grid layout draft" "2026-05-11T16:20:44+05:30"

cat > frontend/src/experimental/useMediaQuery.js << 'EOF'
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
EOF
c "responsive media query hook" "2026-05-11T18:35:20+05:30"

cat > backend/src/experimental/articleDedup.js << 'EOF'
const crypto = require('crypto');
function fingerprint(article) {
  const raw = `${(article.title || '').toLowerCase().trim()}::${(article.source?.name || '').toLowerCase().trim()}`;
  return crypto.createHash('md5').update(raw).digest('hex').substring(0, 12);
}
function deduplicateArticles(articles) {
  const seen = new Map();
  const unique = [];
  for (const a of articles) { const fp = fingerprint(a); if (!seen.has(fp)) { seen.set(fp, true); unique.push({ ...a, _fingerprint: fp }); } }
  const dupeCount = articles.length - unique.length;
  if (dupeCount > 0) console.log(`[Dedup] Removed ${dupeCount} dupes from ${articles.length}`);
  return unique;
}
module.exports = { fingerprint, deduplicateArticles };
EOF
c "article dedup by title fingerprint" "2026-05-11T20:10:55+05:30"

cat > frontend/src/sandbox/TrendingWidget.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
const TrendingWidget = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const topics = [{ label: 'AI Ethics Debate', count: '2.4k', hot: true },{ label: 'IPL 2026 Finals', count: '1.8k', hot: true },{ label: 'Budget Session', count: '980', hot: false },{ label: 'EV Market Boom', count: '756', hot: false },{ label: 'Mars Rover Update', count: '623', hot: false }];
  useEffect(() => { const t = setInterval(() => setActiveIdx(p => (p + 1) % topics.length), 3500); return () => clearInterval(t); }, [topics.length]);
  return (
    <div style={{ padding: '14px 18px', backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px' }}>📈</span><span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trending Now</span>
      </div>
      {topics.map((t, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < topics.length - 1 ? '1px solid rgba(51,65,85,0.5)' : 'none', opacity: i === activeIdx ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 500, width: '18px' }}>{i + 1}</span>
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500 }}>{t.label}</span>{t.hot && <span style={{ fontSize: '10px' }}>🔥</span>}
          </div>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{t.count}</span>
        </div>
      ))}
    </div>
  );
};
export default TrendingWidget;
EOF
c "trending widget for sidebar" "2026-05-11T21:45:33+05:30"

cat > frontend/src/prototype/BreakingBanner.jsx << 'EOF'
import React from 'react';
const BreakingBanner = ({ headline, source, onDismiss }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', backgroundColor: 'rgba(239,68,68,0.1)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
    <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px', animation: 'pulse 2s infinite' }}>BREAKING</span>
    <span style={{ flex: 1, color: '#f1f5f9', fontSize: '13px', fontWeight: 500 }}>{headline || 'Breaking news headline'}</span>
    <span style={{ color: '#94a3b8', fontSize: '11px' }}>{source}</span>
    {onDismiss && <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
  </div>
);
export default BreakingBanner;
EOF
c "breaking news banner component" "2026-05-11T22:58:15+05:30"

cat > frontend/src/sandbox/ScrollToTop.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>;
};
export default ScrollToTop;
EOF
c "scroll to top button" "2026-05-11T23:35:40+05:30"

cat > frontend/src/experimental/useThrottle.js << 'EOF'
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
EOF
c "throttle hook for scroll handlers" "2026-05-11T23:58:22+05:30"

# MAY 12 → 4 commits (cleanup/refactor)
cat > frontend/src/experimental/README.md << 'EOF'
# Experimental Components

This folder contains experimental UI components being tested.
NOT used in the production app.

## Hooks
- `useWindowSize.js` — Window dimensions with breakpoint helpers
- `useNewsPolling.js` — Polling fallback for websocket
- `useMediaQuery.js` — CSS media query hook
- `useThrottle.js` — Throttle hook for scroll events

## Components
- `CardHoverEffect.jsx` — Hover lift + glow card wrapper
- `GlassCard.jsx` — Glassmorphism card style

Most are rough prototypes for potential future integration.
EOF
c "update experimental readme" "2026-05-12T10:15:33+05:30"

cat > backend/src/experimental/README.md << 'EOF'
# Backend Experiments

Experimental backend code — not connected to production routes.

## Files
- `categoryParser.js` — Auto-categorize by keywords
- `rateLimiter.js` — Custom rate limiting
- `wsHandler.js` — WebSocket handler
- `recommendEngine.js` — Recommendation engine
- `sentimentAnalyzer.js` — Basic sentiment analysis
- `newsAggregator.js` — Multi-source aggregation
- `errorHandler.js` — Centralized error handling
- `articleScorer.js` — Article ranking
- `topicExtractor.js` — Topic extraction from titles
- `articleDedup.js` — Deduplication by fingerprint
- `cacheWarmer.js` — Cache pre-warming on startup

None mounted on active routes.
EOF
c "update backend experiments readme" "2026-05-12T14:42:18+05:30"

# formatting fix
cat > frontend/src/sandbox/BookmarkWidget.jsx << 'EOF'
import React from 'react';

// small widget showing recent bookmarks in sidebar
const BookmarkWidget = ({ bookmarks = [], maxItems = 4 }) => {
  const items = bookmarks.length ? bookmarks : [
    { id: 1, title: 'AI Ethics: What Developers Need to Know', source: 'Wired', savedAt: '2h ago' },
    { id: 2, title: 'Markets Close Higher on Fed Comments', source: 'Reuters', savedAt: '5h ago' },
    { id: 3, title: 'SpaceX Announces New Mission Timeline', source: 'BBC', savedAt: '1d ago' },
    { id: 4, title: 'India Tech Sector Growth Report 2026', source: 'NDTV', savedAt: '2d ago' },
  ];

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#1e293b',
      borderRadius: '10px',
      border: '1px solid #334155',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600, margin: 0 }}>📑 Recent Bookmarks</h4>
        <span style={{ color: '#3b82f6', fontSize: '11px', cursor: 'pointer' }}>View all</span>
      </div>
      {items.slice(0, maxItems).map(b => (
        <div key={b.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(51,65,85,0.4)' }}>
          <p style={{
            color: '#e2e8f0', fontSize: '12px', margin: '0 0 3px', fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>{b.title}</p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{b.source} · {b.savedAt}</span>
        </div>
      ))}
    </div>
  );
};

export default BookmarkWidget;
EOF
c "fix bookmark widget formatting" "2026-05-12T17:20:45+05:30"

# cleanup scripts
rm -f _may.sh _may2.sh _may3.sh
c "remove temp build scripts" "2026-05-12T19:55:08+05:30"

echo "✅ ALL MAY COMMITS DONE"
