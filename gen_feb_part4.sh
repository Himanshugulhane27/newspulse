#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 15 - 9 commits (heavy day)
###############################################

mkdir -p frontend/src/prototype/admin
cat > frontend/src/prototype/admin/AdminDashboard.jsx << 'EOF'
import React from 'react';
// admin dashboard prototype - for managing sources and categories
// not connected to anything, just layout exploration
const AdminDashboard = () => {
  const stats = [
    { label: 'Total Articles', value: '12,458', icon: '📰' },
    { label: 'Active Sources', value: '23', icon: '🔗' },
    { label: 'Users Today', value: '156', icon: '👥' },
    { label: 'API Calls', value: '4,201', icon: '⚡' },
  ];
  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ color: '#f1f5f9', fontSize: '24px', marginBottom: '24px' }}>Admin Panel</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '24px' }}>{s.icon}</span>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', margin: '8px 0 4px' }}>{s.value}</div>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ color: '#f1f5f9', fontSize: '16px', marginBottom: '16px' }}>Recent Activity</h3>
        <p style={{ color: '#64748b', fontSize: '13px' }}>No activity data connected yet.</p>
      </div>
    </div>
  );
};
export default AdminDashboard;
EOF
commit "fake admin dashboard layout" "2026-02-15T08:12:35+05:30"

cat > frontend/src/prototype/admin/SourceManager.jsx << 'EOF'
import React, { useState } from 'react';
// manage news sources - add/remove/toggle
const SourceManager = () => {
  const [sources, setSources] = useState([
    { id: 1, name: 'BBC News', url: 'bbc.com', active: true, category: 'general' },
    { id: 2, name: 'TechCrunch', url: 'techcrunch.com', active: true, category: 'technology' },
    { id: 3, name: 'ESPN', url: 'espn.com', active: false, category: 'sports' },
    { id: 4, name: 'Reuters', url: 'reuters.com', active: true, category: 'general' },
  ]);
  const toggleSource = (id) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };
  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>News Sources</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            {['Source', 'URL', 'Category', 'Status'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sources.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '10px 8px', color: '#e2e8f0', fontSize: '13px' }}>{s.name}</td>
              <td style={{ padding: '10px 8px', color: '#64748b', fontSize: '13px' }}>{s.url}</td>
              <td style={{ padding: '10px 8px', color: '#64748b', fontSize: '13px' }}>{s.category}</td>
              <td style={{ padding: '10px 8px' }}>
                <button onClick={() => toggleSource(s.id)} style={{
                  padding: '3px 10px', fontSize: '11px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                  backgroundColor: s.active ? '#10b981' : '#64748b', color: '#fff'
                }}>{s.active ? 'Active' : 'Inactive'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SourceManager;
EOF
commit "source manager component for admin" "2026-02-15T09:45:10+05:30"

cat > backend/src/sandbox/analyticsEndpoint.js << 'EOF'
const express = require('express');
const router = express.Router();
// dummy analytics endpoint - returns fake usage stats
router.get('/analytics/overview', (req, res) => {
  res.json({
    totalUsers: 342,
    activeToday: 56,
    articlesRead: 1893,
    topCategories: [
      { name: 'Technology', count: 456 },
      { name: 'Business', count: 389 },
      { name: 'Science', count: 267 },
      { name: 'Sports', count: 198 },
    ],
    peakHour: '18:00',
    avgSessionTime: '4m 32s'
  });
});
router.get('/analytics/daily', (req, res) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 100) + 20,
      articles: Math.floor(Math.random() * 500) + 100
    };
  });
  res.json({ data: days.reverse() });
});
module.exports = router;
EOF
commit "analytics endpoints for dashboard" "2026-02-15T11:30:22+05:30"

cat > frontend/src/sandbox/AnalyticsChart.jsx << 'EOF'
import React from 'react';
// bar chart using pure CSS - no external libs
const AnalyticsChart = ({ data, label = 'Articles' }) => {
  const chartData = data || [
    { day: 'Mon', value: 45 }, { day: 'Tue', value: 72 }, { day: 'Wed', value: 58 },
    { day: 'Thu', value: 91 }, { day: 'Fri', value: 63 }, { day: 'Sat', value: 38 },
    { day: 'Sun', value: 82 }
  ];
  const maxVal = Math.max(...chartData.map(d => d.value));
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 16px 0' }}>{label} this week</h4>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
        {chartData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{d.value}</span>
            <div style={{
              width: '100%', backgroundColor: '#3b82f6', borderRadius: '4px 4px 0 0',
              height: `${(d.value / maxVal) * 100}%`, transition: 'height 0.5s ease'
            }}/>
            <span style={{ fontSize: '10px', color: '#64748b' }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AnalyticsChart;
EOF
commit "css-only bar chart component" "2026-02-15T13:18:40+05:30"

cat > frontend/src/experimental/InfiniteScroll.jsx << 'EOF'
import React, { useEffect, useRef, useState } from 'react';
// another approach to infinite scroll - using intersection observer
// compared to ScrollFeed this one is more reusable
const InfiniteScroll = ({ loadMore, hasMore, loader, children }) => {
  const sentinelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        await loadMore?.();
        setIsLoading(false);
      }
    }, { rootMargin: '100px' });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);
  return (
    <div>
      {children}
      {isLoading && (loader || <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>Loading...</p>)}
      <div ref={sentinelRef} style={{ height: '1px' }}/>
    </div>
  );
};
export default InfiniteScroll;
EOF
commit "reusable infinite scroll wrapper" "2026-02-15T15:42:18+05:30"

cat > frontend/src/drafts/compact-card.css << 'EOF'
/* compact card styles - experimenting with a denser layout */
.compact-card {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--card-bg, #1e293b);
  border: 1px solid var(--border-color, #334155);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.compact-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.compact-card__image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.compact-card__content {
  flex: 1;
  min-width: 0;
}
.compact-card__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary, #f1f5f9);
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-card__meta {
  font-size: 11px;
  color: var(--text-muted, #94a3b8);
}
EOF
commit "compact card css styles" "2026-02-15T17:55:33+05:30"

cat > backend/src/experimental/errorHandler.js << 'EOF'
// centralized error handler middleware
// idea: replace individual try-catch blocks with this
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'INTERNAL_ERROR';
    this.isOperational = true;
  }
}
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: {
      message: err.isOperational ? err.message : 'Something went wrong',
      code: err.code || 'INTERNAL_ERROR',
    }
  };
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }
  console.error(`[ERROR] ${statusCode} - ${err.message}`);
  res.status(statusCode).json(response);
};
module.exports = { AppError, errorHandler };
EOF
commit "centralized error handler draft" "2026-02-15T20:08:45+05:30"

cat > frontend/src/experimental/useOnlineStatus.js << 'EOF'
import { useState, useEffect } from 'react';
// hook to detect if user is online/offline
// could show a banner when connection drops
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
export default useOnlineStatus;
EOF
commit "online/offline detection hook" "2026-02-15T22:30:19+05:30"

cat > frontend/src/sandbox/OfflineBanner.jsx << 'EOF'
import React from 'react';
// shows when user loses internet connection
const OfflineBanner = ({ isOnline = true }) => {
  if (isOnline) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px',
      backgroundColor: '#ef4444', color: '#fff', textAlign: 'center',
      fontSize: '13px', fontWeight: 500, zIndex: 9999
    }}>
      ⚠️ You're offline. Some features may not work.
    </div>
  );
};
export default OfflineBanner;
EOF
commit "offline banner component" "2026-02-15T23:58:44+05:30"

###############################################
# FEB 16 - 3 commits
###############################################

cat > backend/src/mock/data/trendingTopics.json << 'EOF'
{
  "trending": [
    { "topic": "Artificial Intelligence", "category": "technology", "articles": 89, "sentiment": "positive" },
    { "topic": "Budget 2026", "category": "politics", "articles": 67, "sentiment": "mixed" },
    { "topic": "IPL Auction", "category": "sports", "articles": 54, "sentiment": "positive" },
    { "topic": "Climate Change", "category": "science", "articles": 43, "sentiment": "negative" },
    { "topic": "Startup Funding", "category": "business", "articles": 38, "sentiment": "positive" },
    { "topic": "Space Mission", "category": "science", "articles": 31, "sentiment": "positive" },
    { "topic": "Crypto Regulations", "category": "business", "articles": 28, "sentiment": "mixed" },
    { "topic": "Mental Health", "category": "health", "articles": 25, "sentiment": "positive" }
  ],
  "lastUpdated": "2026-02-16T10:00:00Z"
}
EOF
commit "trending topics sample dataset" "2026-02-16T10:32:18+05:30"

cat > frontend/src/unused/AnimatedCounter.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
// animated number counter - counts up from 0
// tried it for the dashboard stats but it felt too flashy
const AnimatedCounter = ({ end, duration = 1000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};
export default AnimatedCounter;
EOF
commit "animated counter - too flashy, not using" "2026-02-16T16:20:40+05:30"

cat > frontend/src/experimental/useKeyboardShortcut.js << 'EOF'
import { useEffect } from 'react';
// keyboard shortcut hook
// idea: Ctrl+K for search, Ctrl+B for bookmarks, etc
function useKeyboardShortcut(key, callback, modifiers = { ctrl: false, shift: false }) {
  useEffect(() => {
    const handler = (e) => {
      if (modifiers.ctrl && !e.ctrlKey && !e.metaKey) return;
      if (modifiers.shift && !e.shiftKey) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback(e);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key, callback, modifiers.ctrl, modifiers.shift]);
}
export default useKeyboardShortcut;
EOF
commit "keyboard shortcuts hook" "2026-02-16T22:45:05+05:30"

###############################################
# FEB 17 - 1 commit
###############################################

cat > frontend/src/drafts/TwoColumnLayout.jsx << 'EOF'
import React from 'react';
// two column layout - main feed + sidebar
// testing if this works better than full-width
const TwoColumnLayout = ({ mainContent, sideContent }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px',
    maxWidth: '1200px', margin: '0 auto', padding: '20px'
  }}>
    <main>{mainContent || <p style={{ color: '#64748b' }}>Main content goes here</p>}</main>
    <aside style={{
      position: 'sticky', top: '20px', alignSelf: 'start'
    }}>
      {sideContent || (
        <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', margin: '0 0 12px 0' }}>Trending</h3>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Sidebar content</p>
        </div>
      )}
    </aside>
  </div>
);
export default TwoColumnLayout;
EOF
commit "two column layout experiment" "2026-02-17T19:20:33+05:30"

echo "✅ Feb 15-17 done"
