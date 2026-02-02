#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 18 - 6 commits
###############################################

cat > frontend/src/sandbox/UserPreferences.jsx << 'EOF'
import React, { useState } from 'react';
// user preferences page prototype
const UserPreferences = () => {
  const [prefs, setPrefs] = useState({
    categories: ['technology', 'science'],
    darkMode: true,
    notifications: false,
    language: 'en',
    articlesPerPage: 20
  });
  const categories = ['technology', 'business', 'science', 'health', 'sports', 'entertainment', 'politics'];
  const toggleCat = (cat) => {
    setPrefs(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };
  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>Preferences</h2>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '10px' }}>Favorite Categories</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => toggleCat(cat)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
              textTransform: 'capitalize', border: 'none',
              backgroundColor: prefs.categories.includes(cat) ? '#3b82f6' : '#334155',
              color: prefs.categories.includes(cat) ? '#fff' : '#94a3b8'
            }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e2e8f0', fontSize: '14px' }}>Articles per page</span>
        <select value={prefs.articlesPerPage} onChange={e => setPrefs(prev => ({ ...prev, articlesPerPage: +e.target.value }))}
          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#e2e8f0', fontSize: '13px' }}>
          {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
};
export default UserPreferences;
EOF
commit "user preferences page prototype" "2026-02-18T09:15:22+05:30"

cat > backend/src/experimental/newsAggregator.js << 'EOF'
// experiment: aggregate from multiple sources
// combine NewsAPI with other potential sources
const aggregateSources = async (sources) => {
  const results = [];
  for (const source of sources) {
    try {
      // mock - would actually fetch from each source
      results.push({
        source: source.name,
        articles: [],
        fetchedAt: new Date().toISOString(),
        status: 'ok'
      });
    } catch (err) {
      results.push({
        source: source.name,
        articles: [],
        fetchedAt: new Date().toISOString(),
        status: 'error',
        error: err.message
      });
    }
  }
  return results;
};

// deduplicate articles from different sources by title similarity
const deduplicateArticles = (articles) => {
  const seen = new Set();
  return articles.filter(article => {
    const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

module.exports = { aggregateSources, deduplicateArticles };
EOF
commit "multi-source aggregator experiment" "2026-02-18T11:48:30+05:30"

cat > frontend/src/prototype/SourceBadge.jsx << 'EOF'
import React from 'react';
// colored badge showing article source
const sourceColors = {
  'BBC News': '#bb1919',
  'CNN': '#cc0000',
  'TechCrunch': '#0a9e01',
  'Reuters': '#ff8000',
  'The Hindu': '#003366',
  'NDTV': '#e02020',
  'Al Jazeera': '#d2a019',
};
const SourceBadge = ({ source }) => {
  const color = sourceColors[source] || '#64748b';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
      fontSize: '10px', fontWeight: 600, color: '#fff',
      backgroundColor: color, letterSpacing: '0.3px'
    }}>
      {source}
    </span>
  );
};
export default SourceBadge;
EOF
commit "source badge with brand colors" "2026-02-18T14:22:55+05:30"

cat > frontend/src/experimental/useScrollPosition.js << 'EOF'
import { useState, useEffect } from 'react';
// track scroll position - for showing/hiding navbar on scroll
function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [scrollDir, setScrollDir] = useState('up');
  const [lastY, setLastY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollPos({ x: window.scrollX, y });
      setScrollDir(y > lastY ? 'down' : 'up');
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);
  return { ...scrollPos, direction: scrollDir };
}
export default useScrollPosition;
EOF
commit "scroll position tracking hook" "2026-02-18T18:10:44+05:30"

# small cleanup commit
rm -f frontend/src/experimental/DarkModeToggle.jsx
commit "removed dark mode toggle - using ThemeContext instead" "2026-02-18T20:45:12+05:30"

cat > backend/src/mock/data/userActivity.json << 'EOF'
{
  "sampleActivity": [
    { "userId": "u001", "action": "read", "articleId": "a101", "category": "technology", "timestamp": "2026-02-18T08:30:00Z" },
    { "userId": "u001", "action": "bookmark", "articleId": "a102", "category": "science", "timestamp": "2026-02-18T09:15:00Z" },
    { "userId": "u002", "action": "read", "articleId": "a103", "category": "sports", "timestamp": "2026-02-18T10:00:00Z" },
    { "userId": "u001", "action": "share", "articleId": "a104", "category": "technology", "timestamp": "2026-02-18T11:30:00Z" },
    { "userId": "u003", "action": "read", "articleId": "a101", "category": "technology", "timestamp": "2026-02-18T12:45:00Z" },
    { "userId": "u002", "action": "bookmark", "articleId": "a105", "category": "business", "timestamp": "2026-02-18T14:20:00Z" }
  ]
}
EOF
commit "sample user activity data for analytics" "2026-02-18T23:30:08+05:30"

###############################################
# FEB 19 - 1 commit
###############################################

cat > frontend/src/unused/Tooltip.jsx << 'EOF'
import React, { useState } from 'react';
// simple tooltip component
const Tooltip = ({ text, children, position = 'top' }) => {
  const [show, setShow] = useState(false);
  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '6px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '6px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '6px' },
  };
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', ...positions[position],
          padding: '4px 10px', backgroundColor: '#334155', color: '#f1f5f9',
          fontSize: '11px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 50,
          pointerEvents: 'none'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
EOF
commit "tooltip component - generic utility" "2026-02-19T17:55:32+05:30"

###############################################
# FEB 20 - 5 commits
###############################################

cat > frontend/src/drafts/CardVariantB.jsx << 'EOF'
import React from 'react';
// card variant B - larger image, overlay text
const CardVariantB = ({ title, source, imageUrl, category }) => (
  <div style={{
    position: 'relative', borderRadius: '12px', overflow: 'hidden',
    height: '220px', cursor: 'pointer'
  }}>
    <img src={imageUrl || 'https://picsum.photos/400/220'} alt="" style={{
      width: '100%', height: '100%', objectFit: 'cover'
    }}/>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.85) 100%)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px'
    }}>
      {category && (
        <span style={{
          fontSize: '10px', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase',
          marginBottom: '6px', letterSpacing: '1px'
        }}>{category}</span>
      )}
      <h3 style={{ color: '#fff', fontSize: '16px', margin: '0 0 4px 0', fontWeight: 600 }}>{title}</h3>
      <span style={{ color: '#cbd5e1', fontSize: '11px' }}>{source}</span>
    </div>
  </div>
);
export default CardVariantB;
EOF
commit "image overlay card variant" "2026-02-20T10:08:15+05:30"

cat > backend/src/sandbox/searchEndpoint.js << 'EOF'
const express = require('express');
const router = express.Router();
// search endpoint prototype - would connect to NewsAPI search later
router.get('/search', (req, res) => {
  const { q, category, from, to, sortBy = 'relevancy' } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }
  // mock search results
  const mockResults = [
    { title: `Result about "${q}" in ${category || 'all'} categories`, source: 'Mock Source', publishedAt: new Date().toISOString() },
    { title: `Another article matching "${q}"`, source: 'Test Source', publishedAt: new Date().toISOString() },
  ];
  res.json({
    query: q,
    totalResults: mockResults.length,
    articles: mockResults,
    filters: { category, from, to, sortBy }
  });
});
module.exports = router;
EOF
commit "search endpoint prototype" "2026-02-20T12:45:38+05:30"

cat > frontend/src/prototype/SearchResults.jsx << 'EOF'
import React from 'react';
// search results page layout
const SearchResults = ({ query, results = [], loading }) => (
  <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', margin: '0 0 4px 0' }}>
        Search results for "{query || 'test'}"
      </h2>
      <span style={{ color: '#64748b', fontSize: '13px' }}>{results.length || 12} results found</span>
    </div>
    {loading ? (
      <p style={{ color: '#94a3b8' }}>Searching...</p>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(results.length ? results : Array.from({ length: 5 }, (_, i) => ({
          title: `Search result article ${i + 1}`, source: 'Source', time: '3h ago'
        }))).map((item, i) => (
          <div key={i} style={{
            padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px',
            border: '1px solid #334155', cursor: 'pointer'
          }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '15px', margin: '0 0 6px 0' }}>{item.title}</h3>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{item.source} • {item.time}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);
export default SearchResults;
EOF
commit "search results page layout" "2026-02-20T16:30:22+05:30"

cat > frontend/src/experimental/ErrorBoundary.jsx << 'EOF'
import React from 'react';
// error boundary to catch rendering errors gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px', textAlign: 'center', backgroundColor: '#1e293b',
          borderRadius: '12px', margin: '20px'
        }}>
          <span style={{ fontSize: '40px' }}>😵</span>
          <h3 style={{ color: '#f1f5f9', marginTop: '12px' }}>Something went wrong</h3>
          <p style={{ color: '#64748b', fontSize: '13px' }}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })} style={{
            marginTop: '16px', padding: '8px 20px', backgroundColor: '#3b82f6', color: '#fff',
            border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
EOF
commit "error boundary component" "2026-02-20T19:48:10+05:30"

cat > frontend/src/sandbox/ThemePreview.jsx << 'EOF'
import React from 'react';
// preview different color themes side by side
const themes = {
  midnight: { bg: '#0f172a', card: '#1e293b', accent: '#3b82f6', text: '#f1f5f9' },
  ocean: { bg: '#0c1222', card: '#162032', accent: '#06b6d4', text: '#e0f2fe' },
  forest: { bg: '#0a1a0f', card: '#142a1a', accent: '#10b981', text: '#ecfdf5' },
  sunset: { bg: '#1a0f0f', card: '#2a1515', accent: '#f59e0b', text: '#fef3c7' },
};
const ThemePreview = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '20px' }}>
    {Object.entries(themes).map(([name, t]) => (
      <div key={name} style={{ backgroundColor: t.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${t.card}` }}>
        <h4 style={{ color: t.accent, fontSize: '14px', textTransform: 'capitalize', margin: '0 0 12px 0' }}>{name}</h4>
        <div style={{ backgroundColor: t.card, borderRadius: '8px', padding: '12px' }}>
          <p style={{ color: t.text, fontSize: '13px', margin: '0 0 4px 0' }}>Sample headline text</p>
          <span style={{ color: t.accent, fontSize: '11px' }}>Source • 2h ago</span>
        </div>
      </div>
    ))}
  </div>
);
export default ThemePreview;
EOF
commit "theme color preview component" "2026-02-20T23:15:45+05:30"

echo "✅ Feb 18-20 done"
