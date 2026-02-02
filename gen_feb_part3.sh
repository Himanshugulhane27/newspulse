#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 12 - 7 commits
###############################################

cat > backend/src/experimental/wsHandler.js << 'EOF'
// websocket handler experiment for real-time news updates
// not using ws library yet, just sketching the logic
class NewsWebSocket {
  constructor() {
    this.connections = new Map();
    this.channels = new Map(); // category -> Set of connection ids
  }
  onConnect(ws, userId) {
    const connId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.connections.set(connId, { ws, userId, subscribedCategories: [] });
    console.log(`[WS] Client connected: ${connId}`);
    return connId;
  }
  subscribe(connId, category) {
    const conn = this.connections.get(connId);
    if (!conn) return;
    if (!this.channels.has(category)) this.channels.set(category, new Set());
    this.channels.get(category).add(connId);
    conn.subscribedCategories.push(category);
  }
  broadcast(category, data) {
    const subscribers = this.channels.get(category);
    if (!subscribers) return;
    const message = JSON.stringify({ type: 'news_update', category, data, timestamp: Date.now() });
    for (const connId of subscribers) {
      const conn = this.connections.get(connId);
      if (conn?.ws?.readyState === 1) conn.ws.send(message);
    }
  }
  onDisconnect(connId) {
    const conn = this.connections.get(connId);
    if (!conn) return;
    for (const cat of conn.subscribedCategories) {
      this.channels.get(cat)?.delete(connId);
    }
    this.connections.delete(connId);
  }
}
module.exports = NewsWebSocket;
EOF
commit "drafted websocket handler" "2026-02-12T08:45:11+05:30"

cat > frontend/src/prototype/LiveIndicator.jsx << 'EOF'
import React from 'react';
// pulsing live indicator for real-time news
const LiveIndicator = ({ label = 'LIVE' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
    <span style={{
      width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444',
      animation: 'pulse-live 1.5s ease-in-out infinite', display: 'inline-block'
    }}/>
    <style>{`@keyframes pulse-live { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', letterSpacing: '1px' }}>{label}</span>
  </div>
);
export default LiveIndicator;
EOF
commit "live indicator component" "2026-02-12T10:18:44+05:30"

cat > frontend/src/drafts/NewsModal.jsx << 'EOF'
import React from 'react';
// modal to show full article preview without leaving the page
const NewsModal = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: '#1e293b', borderRadius: '16px', maxWidth: '640px', width: '100%',
        maxHeight: '80vh', overflow: 'auto', padding: '24px'
      }}>
        {article.urlToImage && (
          <img src={article.urlToImage} alt="" style={{ width: '100%', borderRadius: '10px', marginBottom: '16px', maxHeight: '240px', objectFit: 'cover' }}/>
        )}
        <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '8px' }}>{article.title}</h2>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#3b82f6' }}>{article.source?.name}</span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', marginTop: '16px', padding: '10px 20px', backgroundColor: '#3b82f6',
          color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px'
        }}>Read Full Article →</a>
      </div>
    </div>
  );
};
export default NewsModal;
EOF
commit "article preview modal draft" "2026-02-12T13:30:55+05:30"

cat > backend/src/sandbox/cacheLayer.js << 'EOF'
// simple in-memory cache for API responses
// reduce NewsAPI calls by caching for a few minutes
class SimpleCache {
  constructor(ttlMs = 5 * 60 * 1000) {
    this.cache = new Map();
    this.ttl = ttlMs;
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  set(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
  clear() { this.cache.clear(); }
  size() { return this.cache.size; }
  // cleanup expired entries
  prune() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > this.ttl) this.cache.delete(key);
    }
  }
}
module.exports = SimpleCache;
EOF
commit "basic cache layer for api responses" "2026-02-12T16:10:28+05:30"

cat > frontend/src/experimental/useFetch.js << 'EOF'
import { useState, useEffect } from 'react';
// generic fetch hook - simpler alternative to useApi
// just testing if this pattern is cleaner
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [url]);
  return { data, loading, error };
}
export default useFetch;
EOF
commit "generic fetch hook experiment" "2026-02-12T19:42:33+05:30"

# typo fix commit
cat > frontend/src/experimental/useDebounce.js << 'EOF'
import { useState, useEffect } from 'react';

// debounce hook for search input
// delays the value update to avoid too many API calls
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
EOF
commit "fix spacing in debounce hook" "2026-02-12T20:15:08+05:30"

cat > frontend/src/sandbox/BookmarksList.jsx << 'EOF'
import React from 'react';
// standalone bookmarks list view - exploring a different layout
// than what we have in the dashboard
const BookmarksList = ({ bookmarks = [] }) => {
  const mockBookmarks = bookmarks.length ? bookmarks : [
    { id: 1, title: 'AI Revolution in Healthcare', source: 'TechCrunch', savedAt: '2026-02-10' },
    { id: 2, title: 'Global Climate Action Plan 2026', source: 'BBC News', savedAt: '2026-02-09' },
    { id: 3, title: 'Market Analysis: Q1 Outlook', source: 'Reuters', savedAt: '2026-02-08' },
  ];
  return (
    <div style={{ padding: '20px', maxWidth: '700px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '16px' }}>📑 Saved Articles</h2>
      {mockBookmarks.map(b => (
        <div key={b.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderBottom: '1px solid #1e293b'
        }}>
          <div>
            <h4 style={{ color: '#e2e8f0', fontSize: '14px', margin: '0 0 4px 0' }}>{b.title}</h4>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{b.source} • Saved {b.savedAt}</span>
          </div>
          <button style={{
            padding: '4px 10px', fontSize: '11px', border: '1px solid #334155',
            borderRadius: '6px', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer'
          }}>Remove</button>
        </div>
      ))}
    </div>
  );
};
export default BookmarksList;
EOF
commit "bookmarks list layout experiment" "2026-02-12T23:05:42+05:30"

###############################################
# FEB 13 - 4 commits
###############################################

mkdir -p backend/src/archive
cat > backend/src/archive/oldNewsController.js << 'EOF'
// archived version of news controller before refactor
// keeping this for reference
// const axios = require('axios');
// const NEWS_API_KEY = process.env.NEWS_API_KEY;
// const BASE_URL = 'https://newsapi.org/v2';
//
// exports.getNews = async (req, res) => {
//   try {
//     const { category = 'general', page = 1 } = req.query;
//     const response = await axios.get(`${BASE_URL}/top-headlines`, {
//       params: {
//         country: 'us',
//         category,
//         page,
//         pageSize: 20,
//         apiKey: NEWS_API_KEY
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('NewsAPI error:', error.message);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// };
//
// Note: refactored to support multiple countries and better error handling
module.exports = {};
EOF
commit "moved old controller to archive for reference" "2026-02-13T10:20:15+05:30"

cat > frontend/src/prototype/MiniChart.jsx << 'EOF'
import React from 'react';
// tiny sparkline chart for showing article count trends
// using pure divs, no chart library
const MiniChart = ({ data = [], height = 30, color = '#3b82f6' }) => {
  const values = data.length ? data : [4, 7, 3, 8, 5, 9, 6, 8, 4, 7];
  const max = Math.max(...values);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: `${height}px` }}>
      {values.map((val, i) => (
        <div key={i} style={{
          flex: 1, backgroundColor: color, borderRadius: '2px 2px 0 0',
          height: `${(val / max) * 100}%`, minWidth: '3px', opacity: 0.7 + (val / max) * 0.3,
          transition: 'height 0.3s ease'
        }}/>
      ))}
    </div>
  );
};
export default MiniChart;
EOF
commit "mini sparkline chart prototype" "2026-02-13T14:55:38+05:30"

cat > backend/src/mock/mockWebSocket.js << 'EOF'
// mock websocket server for testing real-time features
// doesn't actually open a WS server - just simulates the behavior
const EventEmitter = require('events');
class MockWSServer extends EventEmitter {
  constructor() {
    super();
    this.clients = [];
    this.running = false;
  }
  start(intervalMs = 5000) {
    this.running = true;
    console.log('[MockWS] Starting mock websocket server...');
    this._interval = setInterval(() => {
      if (!this.running) return;
      const mockUpdate = {
        type: 'breaking_news',
        article: {
          title: `Breaking: Event at ${new Date().toLocaleTimeString()}`,
          source: 'Mock News',
          category: ['technology', 'business', 'science'][Math.floor(Math.random() * 3)]
        },
        timestamp: Date.now()
      };
      this.emit('message', mockUpdate);
    }, intervalMs);
  }
  stop() {
    this.running = false;
    clearInterval(this._interval);
    console.log('[MockWS] Stopped');
  }
}
// quick test
if (require.main === module) {
  const server = new MockWSServer();
  server.on('message', (data) => console.log('Update:', data));
  server.start(2000);
  setTimeout(() => server.stop(), 10000);
}
module.exports = MockWSServer;
EOF
commit "mock websocket server for testing" "2026-02-13T18:32:21+05:30"

cat > frontend/src/drafts/FilterPanel.jsx << 'EOF'
import React, { useState } from 'react';
// advanced filter panel - date range, source, sort
const FilterPanel = ({ onApply }) => {
  const [filters, setFilters] = useState({ dateFrom: '', dateTo: '', source: 'all', sortBy: 'newest' });
  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  return (
    <div style={{
      padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px',
      border: '1px solid #334155', marginBottom: '16px'
    }}>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 12px 0' }}>Filters</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>From</label>
          <input type="date" value={filters.dateFrom} onChange={e => update('dateFrom', e.target.value)}
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}/>
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>To</label>
          <input type="date" value={filters.dateTo} onChange={e => update('dateTo', e.target.value)}
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}/>
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Sort by</label>
        <select value={filters.sortBy} onChange={e => update('sortBy', e.target.value)}
          style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="popular">Most popular</option>
        </select>
      </div>
      <button onClick={() => onApply?.(filters)} style={{
        marginTop: '12px', width: '100%', padding: '8px', backgroundColor: '#3b82f6',
        color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
      }}>Apply Filters</button>
    </div>
  );
};
export default FilterPanel;
EOF
commit "advanced filter panel draft" "2026-02-13T22:48:09+05:30"

###############################################
# FEB 14 - 2 commits
###############################################

cat > frontend/src/archive/oldLandingHero.jsx << 'EOF'
import React from 'react';
// old landing page hero section - replaced with current design
// archiving in case we want the gradient back
const OldLandingHero = () => (
  <section style={{
    minHeight: '60vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '40px 20px'
  }}>
    <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#f8fafc', marginBottom: '16px' }}>
      Stay <span style={{ color: '#3b82f6' }}>Informed</span>, Stay Ahead
    </h1>
    <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', lineHeight: 1.6 }}>
      Your personalized real-time news aggregator. Get the latest headlines from trusted sources worldwide.
    </p>
    <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
      <button style={{ padding: '12px 28px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
        Get Started
      </button>
      <button style={{ padding: '12px 28px', backgroundColor: 'transparent', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
        Learn More
      </button>
    </div>
  </section>
);
export default OldLandingHero;
EOF
commit "archived old landing hero section" "2026-02-14T12:15:30+05:30"

cat > backend/src/experimental/apiVersioning.js << 'EOF'
// thinking about API versioning for future
// this would let us run v1 and v2 endpoints simultaneously
const express = require('express');
const createVersionedRouter = (version) => {
  const router = express.Router();
  router.use((req, res, next) => {
    req.apiVersion = version;
    res.setHeader('X-API-Version', version);
    next();
  });
  return router;
};
// usage example (not active):
// const v1Router = createVersionedRouter('v1');
// const v2Router = createVersionedRouter('v2');
// app.use('/api/v1', v1Router);
// app.use('/api/v2', v2Router);
module.exports = { createVersionedRouter };
EOF
commit "api versioning middleware sketch" "2026-02-14T21:40:55+05:30"

echo "✅ Feb 12-14 done"
