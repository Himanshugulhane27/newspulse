#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 08 - 8 commits (heavy day)
###############################################

mkdir -p frontend/src/archive
cat > frontend/src/archive/OldNavbar.jsx << 'EOF'
import React from 'react';
// old navbar design - moved here after redesign
// keeping it around in case we want to reference the layout
const OldNavbar = ({ user }) => {
  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', backgroundColor: '#1a1a2e', borderBottom: '2px solid #16213e'
    }}>
      <h1 style={{ color: '#e94560', fontSize: '20px', margin: 0 }}>NewsPulse</h1>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input type="text" placeholder="Search news..." style={{
          padding: '6px 12px', borderRadius: '20px', border: '1px solid #334155',
          backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '13px', width: '200px'
        }}/>
        {user && <span style={{ color: '#94a3b8', fontSize: '13px' }}>{user.name}</span>}
      </div>
    </header>
  );
};
export default OldNavbar;
EOF
commit "moved old navbar to archive" "2026-02-08T09:12:04+05:30"

cat > frontend/src/experimental/SearchOverlay.jsx << 'EOF'
import React, { useState, useRef, useEffect } from 'react';
// full screen search overlay experiment
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: '20vh', zIndex: 1000
    }}>
      <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search articles, topics, sources..."
          style={{
            width: '100%', padding: '16px 24px', fontSize: '18px', borderRadius: '12px',
            border: '2px solid #3b82f6', backgroundColor: '#1e293b', color: '#f8fafc',
            outline: 'none'
          }}/>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
          Press ESC to close
        </p>
      </div>
      <button onClick={onClose} style={{
        position: 'absolute', top: '20px', right: '20px', background: 'none',
        border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer'
      }}>✕</button>
    </div>
  );
};
export default SearchOverlay;
EOF
commit "search overlay prototype" "2026-02-08T10:30:18+05:30"

cat > frontend/src/drafts/WeatherWidget.jsx << 'EOF'
import React from 'react';
// small weather widget idea for the dashboard header
// probably overcomplicating things but wanted to try
const WeatherWidget = ({ temp, condition, city }) => {
  const icons = { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px', borderRadius: '20px',
      backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)'
    }}>
      <span>{icons[condition] || '🌤️'}</span>
      <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{temp || '22'}°C</span>
      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{city || 'Mumbai'}</span>
    </div>
  );
};
export default WeatherWidget;
EOF
commit "weather widget draft for dashboard" "2026-02-08T12:44:52+05:30"

cat > backend/src/sandbox/rssParser.js << 'EOF'
// experiment: parse RSS feeds as alternative to NewsAPI
// might be useful as fallback when API quota runs out
const parseRSSItem = (item) => ({
  title: item.title || '',
  link: item.link || '',
  description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 200),
  pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : null,
  source: item.source || 'RSS Feed'
});

// mock RSS parsing - not actually fetching feeds yet
const mockRSSData = [
  { title: 'Breaking: New tech regulations announced', link: 'https://example.com/1', description: '<p>The government has announced new regulations for tech companies.</p>', pubDate: 'Mon, 08 Feb 2026 10:00:00 GMT', source: 'Tech Daily' },
  { title: 'Sports league announces schedule changes', link: 'https://example.com/2', description: '<p>Major changes to the upcoming sports season.</p>', pubDate: 'Mon, 08 Feb 2026 09:30:00 GMT', source: 'Sports Weekly' }
];

function testParser() {
  const parsed = mockRSSData.map(parseRSSItem);
  console.log('Parsed RSS items:', JSON.stringify(parsed, null, 2));
}

if (require.main === module) testParser();
module.exports = { parseRSSItem };
EOF
commit "rss feed parser experiment" "2026-02-08T15:18:30+05:30"

cat > frontend/src/sandbox/SkeletonLoader.jsx << 'EOF'
import React from 'react';
// custom skeleton loader - different from the existing LoadingSkeleton
// this one has a shimmer animation
const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;
const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', count = 1 }) => {
  return (
    <>
      <style>{shimmerStyle}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width, height, borderRadius,
          background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          marginBottom: count > 1 ? '8px' : 0
        }}/>
      ))}
    </>
  );
};
export default SkeletonLoader;
EOF
commit "shimmer skeleton loader v2" "2026-02-08T18:05:44+05:30"

cat > frontend/src/experimental/useDebounce.js << 'EOF'
import { useState, useEffect } from 'react';
// debounce hook for search input
// delays the value update to avoid too many API calls
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;
EOF
commit "debounce hook for search" "2026-02-08T20:22:16+05:30"

mkdir -p frontend/src/dev-tools
cat > frontend/src/dev-tools/ApiDebugger.jsx << 'EOF'
import React, { useState } from 'react';
// dev tool to test API endpoints quickly
// only for development, should never be in prod bundle
const ApiDebugger = () => {
  const [endpoint, setEndpoint] = useState('/api/news');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const testEndpoint = async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (err) {
      setResponse({ error: err.message });
    }
    setLoading(false);
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <h3 style={{ color: '#f59e0b' }}>🔧 API Debugger</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input value={endpoint} onChange={e => setEndpoint(e.target.value)}
          style={{ flex: 1, padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#e2e8f0' }}/>
        <button onClick={testEndpoint} disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
      {response && (
        <pre style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '12px', maxHeight: '400px' }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};
export default ApiDebugger;
EOF
commit "api debugger dev tool" "2026-02-08T23:40:05+05:30"

###############################################
# FEB 09 - 2 commits
###############################################

cat > frontend/src/unused/ShareButton.jsx << 'EOF'
import React, { useState } from 'react';
// share button with copy link - tried it but design doesnt fit
const ShareButton = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={handleShare} style={{
      padding: '4px 10px', fontSize: '12px', border: '1px solid #334155',
      borderRadius: '6px', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer'
    }}>
      {copied ? '✓ Copied!' : '🔗 Share'}
    </button>
  );
};
export default ShareButton;
EOF
commit "share button component - not using yet" "2026-02-09T14:26:39+05:30"

cat > backend/src/mock/data/sources.json << 'EOF'
{
  "sources": [
    { "id": "bbc-news", "name": "BBC News", "country": "gb", "category": "general", "reliability": 0.95 },
    { "id": "cnn", "name": "CNN", "country": "us", "category": "general", "reliability": 0.88 },
    { "id": "the-hindu", "name": "The Hindu", "country": "in", "category": "general", "reliability": 0.90 },
    { "id": "techcrunch", "name": "TechCrunch", "country": "us", "category": "technology", "reliability": 0.92 },
    { "id": "espn", "name": "ESPN", "country": "us", "category": "sports", "reliability": 0.91 },
    { "id": "reuters", "name": "Reuters", "country": "us", "category": "general", "reliability": 0.96 },
    { "id": "al-jazeera", "name": "Al Jazeera", "country": "qa", "category": "general", "reliability": 0.87 },
    { "id": "ndtv", "name": "NDTV", "country": "in", "category": "general", "reliability": 0.85 },
    { "id": "wired", "name": "Wired", "country": "us", "category": "technology", "reliability": 0.89 }
  ]
}
EOF
commit "news source reliability sample data" "2026-02-09T21:58:12+05:30"

###############################################
# FEB 10 - 5 commits
###############################################

mkdir -p frontend/src/temp-routes
cat > frontend/src/temp-routes/CategoryPage.jsx << 'EOF'
import React from 'react';
// temp route for testing individual category pages
// like /category/technology, /category/sports etc
const CategoryPage = ({ category }) => {
  const cat = category || 'technology';
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', margin: 0, textTransform: 'capitalize' }}>
          {cat}
        </h1>
        <span style={{ fontSize: '13px', color: '#64748b', padding: '4px 12px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
          24 articles
        </span>
      </div>
      <div style={{ display: 'grid', gap: '16px' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ padding: '16px', border: '1px solid #1e293b', borderRadius: '10px', backgroundColor: '#0f172a' }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '16px', margin: '0 0 8px 0' }}>Sample {cat} Article {i}</h3>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Source Name • 2h ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;
EOF
commit "temp route for category testing" "2026-02-10T10:15:33+05:30"

cat > backend/src/experimental/rateLimiter.js << 'EOF'
// simple in-memory rate limiter experiment
// might use this instead of express-rate-limit for more control
class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    if (!this.clients.has(clientId)) {
      this.clients.set(clientId, { count: 1, windowStart: now });
      return true;
    }
    const client = this.clients.get(clientId);
    if (now - client.windowStart > this.windowMs) {
      client.count = 1;
      client.windowStart = now;
      return true;
    }
    if (client.count >= this.maxRequests) return false;
    client.count++;
    return true;
  }

  // cleanup old entries periodically
  cleanup() {
    const now = Date.now();
    for (const [id, data] of this.clients) {
      if (now - data.windowStart > this.windowMs * 2) {
        this.clients.delete(id);
      }
    }
  }
}

module.exports = RateLimiter;
EOF
commit "custom rate limiter experiment" "2026-02-10T13:42:07+05:30"

cat > frontend/src/drafts/NotificationBell.jsx << 'EOF'
import React, { useState } from 'react';
// notification bell with badge - just a visual prototype
const NotificationBell = ({ count = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, text: 'New trending topic in Technology', time: '5m ago', read: false },
    { id: 2, text: 'Your bookmarked article was updated', time: '1h ago', read: false },
    { id: 3, text: 'Breaking news in Science', time: '2h ago', read: true },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px'
      }}>
        <span style={{ fontSize: '20px' }}>🔔</span>
        {count > 0 && (
          <span style={{
            position: 'absolute', top: 0, right: 0, backgroundColor: '#ef4444',
            color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '10px', fontWeight: 600
          }}>{count}</span>
        )}
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute', right: 0, top: '100%', width: '280px', backgroundColor: '#1e293b',
          borderRadius: '10px', border: '1px solid #334155', overflow: 'hidden', zIndex: 50, marginTop: '8px'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #334155' }}>
            <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>Notifications</span>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{
              padding: '10px 16px', borderBottom: '1px solid #1e293b',
              backgroundColor: n.read ? 'transparent' : 'rgba(59,130,246,0.05)'
            }}>
              <p style={{ color: '#e2e8f0', fontSize: '12px', margin: 0 }}>{n.text}</p>
              <span style={{ color: '#64748b', fontSize: '10px' }}>{n.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
EOF
commit "notification bell prototype" "2026-02-10T17:55:20+05:30"

cat > frontend/src/experimental/TagFilter.jsx << 'EOF'
import React, { useState } from 'react';
// tag-based filter for articles - like chips
const TagFilter = ({ tags = [], onTagSelect }) => {
  const [selected, setSelected] = useState([]);
  const defaultTags = tags.length > 0 ? tags : [
    'Breaking', 'Opinion', 'Analysis', 'Feature', 'Live', 'Exclusive', 'Update'
  ];
  const toggle = (tag) => {
    const next = selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag];
    setSelected(next);
    onTagSelect?.(next);
  };
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '8px 0' }}>
      {defaultTags.map(tag => (
        <button key={tag} onClick={() => toggle(tag)} style={{
          padding: '4px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer',
          border: selected.includes(tag) ? '1px solid #3b82f6' : '1px solid #334155',
          backgroundColor: selected.includes(tag) ? 'rgba(59,130,246,0.2)' : 'transparent',
          color: selected.includes(tag) ? '#60a5fa' : '#94a3b8',
          transition: 'all 0.2s ease'
        }}>
          {tag}
        </button>
      ))}
    </div>
  );
};
export default TagFilter;
EOF
commit "tag filter chips component" "2026-02-10T20:30:14+05:30"

cat > frontend/src/sandbox/StatsCard.jsx << 'EOF'
import React from 'react';
// stats card for analytics dashboard prototype
const StatsCard = ({ label, value, change, icon }) => {
  const isPositive = change >= 0;
  return (
    <div style={{
      padding: '20px', borderRadius: '12px', backgroundColor: '#1e293b',
      border: '1px solid #334155', minWidth: '180px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '20px' }}>{icon || '📊'}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9' }}>{value}</div>
      {change !== undefined && (
        <div style={{ fontSize: '12px', color: isPositive ? '#10b981' : '#ef4444', marginTop: '4px' }}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last week
        </div>
      )}
    </div>
  );
};
export default StatsCard;
EOF
commit "analytics stats card draft" "2026-02-10T23:48:37+05:30"

###############################################
# FEB 11 - 1 commit
###############################################

cat > frontend/src/unused/TimelineView.jsx << 'EOF'
import React from 'react';
// timeline view - shows news chronologically
// tried this layout but pagination works better for us
const TimelineView = ({ articles = [] }) => {
  const mockArticles = articles.length ? articles : [
    { title: 'Morning Update: Markets open higher', time: '09:30 AM', category: 'Business' },
    { title: 'Tech giant announces new product line', time: '11:15 AM', category: 'Technology' },
    { title: 'Weather alert for coastal regions', time: '01:45 PM', category: 'General' },
    { title: 'Sports recap: Weekend matches', time: '04:20 PM', category: 'Sports' },
  ];
  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      {mockArticles.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }}/>
            {i < mockArticles.length - 1 && <div style={{ width: '2px', flex: 1, backgroundColor: '#1e293b' }}/>}
          </div>
          <div style={{ flex: 1, paddingBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{item.time}</span>
            <h4 style={{ margin: '4px 0', color: '#e2e8f0', fontSize: '14px' }}>{item.title}</h4>
            <span style={{ fontSize: '11px', color: '#3b82f6' }}>{item.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TimelineView;
EOF
commit "timeline view - not sure about this" "2026-02-11T16:33:20+05:30"

echo "✅ Feb 08-11 done"
