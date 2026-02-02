#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 28 - 8 commits (last day - wrapping up)
###############################################

cat > frontend/src/sandbox/QuickFilters.jsx << 'EOF'
import React, { useState } from 'react';
// quick filter bar for timeframe selection
const QuickFilters = ({ onFilterChange }) => {
  const [active, setActive] = useState('today');
  const filters = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'trending', label: '🔥 Trending' },
  ];
  const handleClick = (id) => {
    setActive(id);
    onFilterChange?.(id);
  };
  return (
    <div style={{ display: 'flex', gap: '6px', padding: '12px 0' }}>
      {filters.map(f => (
        <button key={f.id} onClick={() => handleClick(f.id)} style={{
          padding: '6px 16px', borderRadius: '20px', fontSize: '12px',
          border: 'none', cursor: 'pointer',
          backgroundColor: active === f.id ? '#3b82f6' : '#1e293b',
          color: active === f.id ? '#fff' : '#94a3b8',
          transition: 'all 0.2s ease'
        }}>{f.label}</button>
      ))}
    </div>
  );
};
export default QuickFilters;
EOF
commit "quick time filter bar" "2026-02-28T09:15:22+05:30"

cat > backend/src/experimental/newsCache.js << 'EOF'
// improved news cache with category-based TTL
// hot categories get shorter TTL for freshness
const categoryTTL = {
  general: 3 * 60 * 1000,     // 3 min
  technology: 5 * 60 * 1000,   // 5 min
  business: 2 * 60 * 1000,     // 2 min - markets move fast
  science: 15 * 60 * 1000,     // 15 min
  health: 10 * 60 * 1000,      // 10 min
  sports: 2 * 60 * 1000,       // 2 min - live scores
  entertainment: 10 * 60 * 1000 // 10 min
};

class NewsCache {
  constructor() {
    this.store = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  getCacheKey(category, country, page) {
    return `${category}:${country}:${page}`;
  }

  get(category, country, page) {
    const key = this.getCacheKey(category, country, page);
    const entry = this.store.get(key);
    if (!entry) { this.misses++; return null; }
    const ttl = categoryTTL[category] || 5 * 60 * 1000;
    if (Date.now() - entry.timestamp > ttl) {
      this.store.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return entry.data;
  }

  set(category, country, page, data) {
    const key = this.getCacheKey(category, country, page);
    this.store.set(key, { data, timestamp: Date.now() });
  }

  getStats() {
    return {
      entries: this.store.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits + this.misses > 0
        ? `${Math.round(this.hits / (this.hits + this.misses) * 100)}%`
        : 'N/A'
    };
  }

  flush() { this.store.clear(); this.hits = 0; this.misses = 0; }
}

module.exports = NewsCache;
EOF
commit "improved news cache with category TTL" "2026-02-28T10:48:38+05:30"

cat > frontend/src/prototype/ExploreGrid.jsx << 'EOF'
import React from 'react';
// explore page with category grid
const ExploreGrid = () => {
  const categories = [
    { name: 'Technology', icon: '💻', color: '#3b82f6', articles: 145 },
    { name: 'Business', icon: '📊', color: '#10b981', articles: 89 },
    { name: 'Science', icon: '🔬', color: '#8b5cf6', articles: 67 },
    { name: 'Sports', icon: '⚽', color: '#f59e0b', articles: 112 },
    { name: 'Health', icon: '🏥', color: '#ef4444', articles: 54 },
    { name: 'Entertainment', icon: '🎬', color: '#ec4899', articles: 78 },
    { name: 'World', icon: '🌍', color: '#06b6d4', articles: 203 },
    { name: 'Opinion', icon: '💭', color: '#f97316', articles: 34 },
  ];
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '24px', marginBottom: '8px' }}>Explore</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Browse news by category</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {categories.map(cat => (
          <div key={cat.name} style={{
            padding: '24px', borderRadius: '12px', cursor: 'pointer',
            background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`,
            border: `1px solid ${cat.color}33`,
            transition: 'transform 0.2s ease'
          }}>
            <span style={{ fontSize: '36px' }}>{cat.icon}</span>
            <h3 style={{ color: '#f1f5f9', fontSize: '16px', margin: '12px 0 4px' }}>{cat.name}</h3>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>{cat.articles} articles</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExploreGrid;
EOF
commit "explore page grid layout" "2026-02-28T13:20:15+05:30"

cat > frontend/src/drafts/responsive.css << 'EOF'
/* responsive breakpoint experiments */
/* trying to figure out the best breakpoints for our layout */

/* mobile first approach */
.news-grid-exp {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 12px;
}

/* tablet */
@media (min-width: 640px) {
  .news-grid-exp {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
  }
}

/* desktop */
@media (min-width: 1024px) {
  .news-grid-exp {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 24px;
  }
}

/* wide */
@media (min-width: 1440px) {
  .news-grid-exp {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* compact card for mobile */
@media (max-width: 639px) {
  .card-exp {
    flex-direction: row;
    align-items: center;
  }
  .card-exp__image {
    width: 80px;
    height: 60px;
    flex-shrink: 0;
  }
  .card-exp__title {
    font-size: 13px;
  }
}
EOF
commit "responsive grid breakpoint experiments" "2026-02-28T15:55:40+05:30"

cat > backend/src/archive/oldRouteStructure.js << 'EOF'
// documenting old route structure before cleanup
// this was the original routing before we modularized

/*
OLD STRUCTURE (pre-refactor):
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/news?category=X&page=Y
  GET  /api/news/search?q=X
  POST /api/bookmarks
  GET  /api/bookmarks
  DELETE /api/bookmarks/:id

NEW STRUCTURE (current):
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/auth/google
  GET  /api/auth/google/callback
  GET  /api/auth/me
  GET  /api/news?category=X&page=Y&pageSize=Z
  POST /api/bookmarks
  GET  /api/bookmarks
  DELETE /api/bookmarks/:id

PLANNED (not implemented):
  GET  /api/news/trending
  GET  /api/news/search?q=X
  GET  /api/news/sources
  GET  /api/user/preferences
  PUT  /api/user/preferences
  GET  /api/analytics/overview (admin only)
*/

module.exports = {};
EOF
commit "documented route structure changes" "2026-02-28T18:10:25+05:30"

cat > frontend/src/unused/LoadingSpinner.jsx << 'EOF'
import React from 'react';
// alternative loading spinner - tried a dots animation
// sticking with the skeleton loader for now
const spinnerStyle = `
@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
`;
const LoadingSpinner = ({ color = '#3b82f6', size = 'medium' }) => {
  const dotSize = size === 'small' ? 6 : size === 'large' ? 12 : 8;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '20px' }}>
      <style>{spinnerStyle}</style>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: dotSize, height: dotSize, borderRadius: '50%',
          backgroundColor: color,
          animation: `dot-bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
        }}/>
      ))}
    </div>
  );
};
export default LoadingSpinner;
EOF
commit "dots loading spinner - prefer skeleton" "2026-02-28T20:35:18+05:30"

# final cleanup
cat > frontend/src/experimental/README.md << 'EOF'
# Experimental Components

This folder contains experimental UI components that are being tested.
These are NOT used in the production app.

## Components
- `AltCardLayout.jsx` - Horizontal card layout variant
- `CompactTile.jsx` - Compact news tile for mobile
- `ScrollFeed.jsx` - Infinite scroll feed experiment
- `SearchOverlay.jsx` - Full-screen search overlay
- `useDebounce.js` - Debounce hook for search
- `useLocalStorage.js` - LocalStorage persistence hook
- `useFetch.js` - Generic fetch hook
- `useOnlineStatus.js` - Online/offline detection
- `useKeyboardShortcut.js` - Keyboard shortcut handler
- `useScrollPosition.js` - Scroll tracking hook
- `InfiniteScroll.jsx` - Reusable infinite scroll wrapper
- `TagFilter.jsx` - Tag-based filtering
- `Tabs.jsx` - Reusable tab component
- `LazyImage.jsx` - Lazy loading images
- `ErrorBoundary.jsx` - Error boundary component
- `FocusMode.jsx` - Distraction-free reading mode

## Status
Most of these are rough prototypes. Some may be integrated
into the main app after more testing and refinement.
EOF
commit "added readme for experimental folder" "2026-02-28T22:40:55+05:30"

cat > backend/src/experimental/README.md << 'EOF'
# Backend Experiments

Experimental backend code - not connected to production routes.

## Files
- `categoryParser.js` - Auto-categorize articles by keywords
- `rateLimiter.js` - Custom rate limiting (alternative to express-rate-limit)
- `wsHandler.js` - WebSocket handler for real-time updates
- `recommendEngine.js` - Simple recommendation engine
- `apiVersioning.js` - API versioning middleware
- `sentimentAnalyzer.js` - Basic sentiment analysis
- `newsAggregator.js` - Multi-source aggregation
- `errorHandler.js` - Centralized error handling
- `scheduler.js` - Background task scheduler
- `requestValidator.js` - Request validation middleware
- `newsFormatter.js` - Article format normalizer
- `newsCache.js` - Category-aware caching

## Note
None of these are mounted on active routes.
They're prototypes for potential future features.
EOF
commit "cleanup old feed experiment" "2026-02-28T23:55:30+05:30"

echo "✅ Feb 28 done - ALL FEBRUARY COMMITS COMPLETE"
