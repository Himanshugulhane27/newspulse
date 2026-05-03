#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

c() { git add -A; GIT_AUTHOR_DATE="$2" GIT_COMMITTER_DATE="$2" git commit -m "$1"; }

########################################
# MAY 06 → 3 commits (normal work)
########################################

cat > frontend/src/prototype/FeedGrouping.jsx << 'EOF'
import React from 'react';
const FeedGrouping = () => {
  const groups = [
    { label: 'Today', items: [
      { title: 'AI regulation bill passes committee vote', source: 'Reuters', time: '1h ago' },
      { title: 'Tech stocks rally after earnings beat', source: 'Bloomberg', time: '3h ago' },
      { title: 'New satellite internet service launches', source: 'TechCrunch', time: '5h ago' },
    ]},
    { label: 'Yesterday', items: [
      { title: 'Climate summit reaches key agreement', source: 'BBC News', time: '1d ago' },
      { title: 'Sports league announces expansion teams', source: 'ESPN', time: '1d ago' },
    ]},
    { label: 'This Week', items: [
      { title: 'Electric vehicle sales hit record high', source: 'NDTV', time: '3d ago' },
    ]}
  ];
  return (
    <div style={{ maxWidth: '700px' }}>
      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{g.label}</h3>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#1e293b' }}/>
          </div>
          {g.items.map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', borderLeft: '3px solid #334155', marginBottom: '6px', borderRadius: '0 8px 8px 0', backgroundColor: '#0f172a', cursor: 'pointer' }}>
              <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>{item.title}</h4>
              <span style={{ color: '#64748b', fontSize: '11px' }}>{item.source} · {item.time}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default FeedGrouping;
EOF
c "temp feed grouping experiment" "2026-05-06T11:30:42+05:30"

cat > backend/src/experimental/articleScorer.js << 'EOF'
const sourceReliability = { 'reuters': 0.95, 'bbc-news': 0.93, 'techcrunch': 0.88, 'cnn': 0.85, 'ndtv': 0.83, 'espn': 0.90, 'bloomberg': 0.92 };
const hotKeywords = ['breaking', 'exclusive', 'urgent', 'live', 'just in', 'developing'];
function scoreArticle(article) {
  let score = 50;
  const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / 3600000;
  if (hoursAgo < 1) score += 30; else if (hoursAgo < 3) score += 25; else if (hoursAgo < 6) score += 20;
  else if (hoursAgo < 12) score += 10; else if (hoursAgo < 24) score += 5;
  const sourceId = article.source?.id?.toLowerCase() || '';
  score += Math.round((sourceReliability[sourceId] || 0.7) * 15);
  const titleLower = (article.title || '').toLowerCase();
  score += Math.min(hotKeywords.filter(kw => titleLower.includes(kw)).length * 5, 10);
  if (article.urlToImage) score += 3;
  return Math.min(score, 100);
}
function rankArticles(articles) {
  return articles.map(a => ({ ...a, _score: scoreArticle(a) })).sort((a, b) => b._score - a._score);
}
module.exports = { scoreArticle, rankArticles };
EOF
c "article scoring and ranking system" "2026-05-06T16:10:28+05:30"

cat > frontend/src/drafts/sidebar-styles.css << 'EOF'
.sidebar-exp { width: 280px; background-color: #0f172a; border-right: 1px solid #1e293b; padding: 20px 0; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; }
.sidebar-exp__header { padding: 0 20px 20px; border-bottom: 1px solid #1e293b; }
.sidebar-exp__nav { flex: 1; overflow-y: auto; padding: 16px 12px; }
.sidebar-exp__item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; color: #94a3b8; font-size: 14px; cursor: pointer; transition: all 0.15s ease; border: none; background: none; width: 100%; text-align: left; }
.sidebar-exp__item:hover { background-color: rgba(59,130,246,0.08); color: #e2e8f0; }
.sidebar-exp__item--active { background-color: rgba(59,130,246,0.15); color: #3b82f6; font-weight: 500; }
.sidebar-exp__footer { padding: 16px 20px; border-top: 1px solid #1e293b; }
EOF
c "trying alternate sidebar spacing" "2026-05-06T22:48:15+05:30"

########################################
# MAY 07 → 9 commits (major coding sprint)
########################################

cat > frontend/src/prototype/HeadlineStrip.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
const HeadlineStrip = ({ headlines = [] }) => {
  const [idx, setIdx] = useState(0);
  const items = headlines.length ? headlines : [
    'Breaking: AI regulation bill advances to floor vote',
    'Markets: Sensex crosses 80,000 for the first time',
    'Sports: India wins test series against Australia',
    'Tech: New smartphone chip delivers 40% better battery life',
    'Science: James Webb telescope captures new galaxy images',
  ];
  useEffect(() => { const t = setInterval(() => setIdx(p => (p + 1) % items.length), 5000); return () => clearInterval(t); }, [items.length]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', overflow: 'hidden' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', padding: '3px 8px', borderRadius: '4px', flexShrink: 0, letterSpacing: '0.5px' }}>LIVE</span>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '18px' }}>
        {items.map((text, i) => (
          <p key={i} style={{ position: 'absolute', top: 0, left: 0, right: 0, color: '#e2e8f0', fontSize: '12px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: i === idx ? 1 : 0, transform: i === idx ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>{text}</p>
        ))}
      </div>
    </div>
  );
};
export default HeadlineStrip;
EOF
c "headline ticker strip prototype" "2026-05-07T08:30:15+05:30"

cat > backend/src/sandbox/bookmarkStats.js << 'EOF'
const express = require('express');
const router = express.Router();
router.get('/bookmarks/stats', (req, res) => {
  res.json({ success: true, data: {
    totalBookmarks: 47, thisWeek: 8,
    topCategories: [
      { category: 'technology', count: 18, percentage: 38 },
      { category: 'science', count: 12, percentage: 26 },
      { category: 'business', count: 9, percentage: 19 },
    ],
    topSources: [{ source: 'TechCrunch', count: 11 }, { source: 'BBC News', count: 8 }],
    readRate: '72%', avgBookmarksPerDay: 1.8
  }});
});
module.exports = router;
EOF
c "bookmark stats mock endpoint" "2026-05-07T09:55:42+05:30"

cat > frontend/src/drafts/CompactHeadlineList.jsx << 'EOF'
import React from 'react';
const CompactHeadlineList = ({ headlines = [], maxItems = 8 }) => {
  const items = headlines.length ? headlines : [
    { title: 'India GDP growth exceeds expectations', source: 'Reuters', hot: true },
    { title: 'New climate data shows accelerating trend', source: 'BBC', hot: false },
    { title: 'Tech layoffs slow down in Q2', source: 'TechCrunch', hot: false },
    { title: 'Cricket world cup schedule announced', source: 'ESPN', hot: true },
    { title: 'Electric car sales surge in Europe', source: 'Bloomberg', hot: false },
    { title: 'AI chatbot passes medical exam', source: 'Wired', hot: true },
    { title: 'Housing market shows recovery signs', source: 'NDTV', hot: false },
    { title: 'Space agency reveals moon mission update', source: 'BBC', hot: false },
  ];
  return (
    <div style={{ padding: '12px 0' }}>
      {items.slice(0, maxItems).map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 12px', cursor: 'pointer', borderRadius: '6px' }}>
          <span style={{ color: '#475569', fontSize: '11px', fontWeight: 600, width: '16px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#e2e8f0', fontSize: '13px', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>{item.title}{item.hot && <span style={{ color: '#f59e0b', marginLeft: '4px', fontSize: '10px' }}> 🔥</span>}</p>
            <span style={{ color: '#64748b', fontSize: '10px' }}>{item.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CompactHeadlineList;
EOF
c "rough compact headline layout" "2026-05-07T11:40:28+05:30"

cat > backend/src/archive/oldPaginationLogic.js << 'EOF'
// archived: old pagination helper before we switched to cursor-based
// Old approach: offset-based pagination
// Problems: performance degrades on large datasets
// function paginate(query, page, pageSize) { const skip = (page - 1) * pageSize; return { query: query.skip(skip).limit(pageSize), meta: { page, pageSize, skip } }; }
// New approach (planned): cursor-based using publishedAt
module.exports = {};
EOF
c "archive unused filter utils" "2026-05-07T13:22:50+05:30"

cat > frontend/src/sandbox/ReadProgress.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
const ReadProgress = ({ color = '#3b82f6', height = 3 }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: `${height}px`, backgroundColor: 'transparent', zIndex: 999 }}>
      <div style={{ height: '100%', width: `${progress}%`, backgroundColor: color, transition: 'width 0.1s ease', borderRadius: '0 2px 2px 0' }}/>
    </div>
  );
};
export default ReadProgress;
EOF
c "scroll reading progress indicator" "2026-05-07T15:05:18+05:30"

cat > frontend/src/unused/CountdownTimer.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
// countdown to next refresh - felt unnecessary, not using
const CountdownTimer = ({ seconds = 30, onComplete }) => {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) { onComplete?.(); setRemaining(seconds); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, seconds, onComplete]);
  const pct = (remaining / seconds) * 100;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `conic-gradient(#3b82f6 ${pct}%, #1e293b ${pct}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{remaining}</span>
        </div>
      </div>
      <span style={{ color: '#64748b', fontSize: '11px' }}>refresh</span>
    </div>
  );
};
export default CountdownTimer;
EOF
c "countdown timer - decided not to use" "2026-05-07T17:38:05+05:30"

cat > frontend/src/prototype/MobileBottomNav.jsx << 'EOF'
import React from 'react';
const MobileBottomNav = ({ activePage = 'home', onNavigate }) => {
  const tabs = [{ id: 'home', label: 'Home', icon: '🏠' }, { id: 'search', label: 'Search', icon: '🔍' }, { id: 'bookmarks', label: 'Saved', icon: '📑' }, { id: 'profile', label: 'Profile', icon: '👤' }];
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', padding: '6px 0', zIndex: 80 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNavigate?.(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '6px 0', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <span style={{ fontSize: '18px', opacity: activePage === tab.id ? 1 : 0.5 }}>{tab.icon}</span>
          <span style={{ fontSize: '10px', fontWeight: 500, color: activePage === tab.id ? '#3b82f6' : '#64748b' }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
export default MobileBottomNav;
EOF
c "testing old mobile nav idea" "2026-05-07T20:15:33+05:30"

cat > backend/src/mock/data/mockAnalytics.json << 'EOF'
{
  "dashboard": {
    "period": "last_7_days",
    "overview": { "totalViews": 12847, "uniqueVisitors": 3241, "avgSessionDuration": "3m 48s", "bounceRate": "34%", "newUsers": 487 },
    "dailyViews": [
      { "date": "2026-05-01", "views": 1823 }, { "date": "2026-05-02", "views": 1945 },
      { "date": "2026-05-03", "views": 1567 }, { "date": "2026-05-04", "views": 2103 },
      { "date": "2026-05-05", "views": 1876 }, { "date": "2026-05-06", "views": 2012 },
      { "date": "2026-05-07", "views": 1521 }
    ],
    "topArticles": [
      { "title": "AI Breakthrough in Medical Research", "views": 892 },
      { "title": "Budget 2026 Key Highlights", "views": 756 },
      { "title": "IPL Finals Preview", "views": 634 }
    ],
    "deviceBreakdown": { "mobile": 58, "desktop": 34, "tablet": 8 }
  }
}
EOF
c "mock analytics dashboard data" "2026-05-07T22:50:44+05:30"

# late night quick fix
cat > frontend/src/prototype/HeadlineStrip.jsx << 'EOF'
import React, { useState, useEffect } from 'react';

// scrolling headline strip - news ticker
const HeadlineStrip = ({ headlines = [] }) => {
  const [idx, setIdx] = useState(0);
  const items = headlines.length ? headlines : [
    'Breaking: AI regulation bill advances to floor vote',
    'Markets: Sensex crosses 80,000 for the first time',
    'Sports: India wins test series against Australia',
    'Tech: New smartphone chip delivers 40% better battery life',
    'Science: James Webb telescope captures new galaxy images',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '8px 16px', backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b', overflow: 'hidden'
    }}>
      <span style={{
        fontSize: '10px', fontWeight: 700, color: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)', padding: '3px 8px',
        borderRadius: '4px', flexShrink: 0, letterSpacing: '0.5px'
      }}>LIVE</span>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '18px' }}>
        {items.map((text, i) => (
          <p key={i} style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            color: '#e2e8f0', fontSize: '12px', margin: 0,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default HeadlineStrip;
EOF
c "fix ticker formatting" "2026-05-07T23:55:12+05:30"

########################################
# MAY 08 → 2 commits (minor fixes)
########################################

rm -f backend/src/sandbox/rssParser.js
c "cleanup unused response mocks" "2026-05-08T15:20:33+05:30"

cat > frontend/src/experimental/GlassCard.jsx << 'EOF'
import React from 'react';
const GlassCard = ({ children, padding = '20px', blur = 12 }) => (
  <div style={{
    padding, borderRadius: '16px',
    background: 'rgba(30, 41, 59, 0.6)',
    backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`,
    border: '1px solid rgba(148, 163, 184, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  }}>{children}</div>
);
export default GlassCard;
EOF
c "glassmorphism card experiment" "2026-05-08T21:42:18+05:30"

echo "✅ May 06-08 done"
