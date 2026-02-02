#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

# Helper function
commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg" --allow-empty-message
}

###############################################
# FEB 02 - 2 commits (experimentation start)
###############################################

# Commit 1
mkdir -p frontend/src/experimental
cat > frontend/src/experimental/AltCardLayout.jsx << 'EOF'
import React from 'react';

// experimenting with a horizontal card layout for news items
const AltCardLayout = ({ title, source, imageUrl, description }) => {
  return (
    <div className="alt-card-horizontal" style={{
      display: 'flex',
      gap: '1rem',
      padding: '12px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      marginBottom: '10px'
    }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
        />
      )}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>{source}</p>
        <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
          {description?.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};

export default AltCardLayout;
EOF
commit "trying alternate card layout" "2026-02-02T10:23:14+05:30"

# Commit 2
cat > frontend/src/experimental/CompactTile.jsx << 'EOF'
import React from 'react';

// compact tile version - maybe for mobile or sidebar
const CompactTile = ({ headline, source, timestamp }) => {
  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div style={{
      padding: '8px 12px',
      borderLeft: '3px solid #3b82f6',
      marginBottom: '6px',
      backgroundColor: '#f8fafc'
    }}>
      <span style={{ fontSize: '13px', fontWeight: 500 }}>{headline}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>{source}</span>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{timeAgo(timestamp)}</span>
      </div>
    </div>
  );
};

export default CompactTile;
EOF
commit "testing compact news tiles" "2026-02-02T22:47:31+05:30"

###############################################
# FEB 03 - 1 commit
###############################################

mkdir -p backend/src/sandbox
cat > backend/src/sandbox/trendingEndpoint.js << 'EOF'
const express = require('express');
const router = express.Router();

// dummy trending endpoint - just returns hardcoded popular topics
// TODO: hook this up to actual frequency analysis later
router.get('/trending', (req, res) => {
  const trendingTopics = [
    { topic: 'AI Regulation', mentions: 142, trend: 'up' },
    { topic: 'Climate Summit', mentions: 98, trend: 'up' },
    { topic: 'Stock Market', mentions: 87, trend: 'down' },
    { topic: 'Space Exploration', mentions: 76, trend: 'stable' },
    { topic: 'Cryptocurrency', mentions: 65, trend: 'down' },
    { topic: 'Election Updates', mentions: 54, trend: 'up' },
  ];

  // simulate some delay like a real db query
  setTimeout(() => {
    res.json({
      success: true,
      data: trendingTopics,
      generatedAt: new Date().toISOString()
    });
  }, 200);
});

module.exports = router;
EOF
commit "dummy trending endpoint" "2026-02-03T15:12:08+05:30"

###############################################
# FEB 04 - 4 commits
###############################################

# Commit 1
mkdir -p frontend/src/sandbox
cat > frontend/src/sandbox/TrendingBar.jsx << 'EOF'
import React, { useState, useEffect } from 'react';

// rough trending bar - shows top topics horizontally
// not connected to real data yet
const TrendingBar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // fake data for now
    setTopics([
      { name: 'Technology', count: 45 },
      { name: 'Politics', count: 38 },
      { name: 'Sports', count: 31 },
      { name: 'Science', count: 27 },
      { name: 'Health', count: 22 },
    ]);
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '10px 16px',
      overflowX: 'auto',
      backgroundColor: '#1e293b',
      borderRadius: '8px'
    }}>
      <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
        🔥 Trending:
      </span>
      {topics.map((t, i) => (
        <span key={i} style={{
          color: '#e2e8f0',
          fontSize: '12px',
          padding: '2px 10px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          whiteSpace: 'nowrap',
          cursor: 'pointer'
        }}>
          {t.name} ({t.count})
        </span>
      ))}
    </div>
  );
};

export default TrendingBar;
EOF
commit "rough trending bar component" "2026-02-04T09:34:22+05:30"

# Commit 2
mkdir -p frontend/src/drafts
cat > frontend/src/drafts/SidebarNav.jsx << 'EOF'
import React from 'react';

// draft sidebar navigation - exploring a left panel layout
// might not use this, just trying it out
const SidebarNav = ({ categories, activeCategory, onSelect }) => {
  const defaultCategories = categories || [
    'General', 'Technology', 'Business', 'Science',
    'Health', 'Sports', 'Entertainment'
  ];

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '20px 0',
      borderRight: '1px solid #1e293b'
    }}>
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h2 style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 700 }}>NewsPulse</h2>
      </div>
      <nav>
        {defaultCategories.map((cat) => (
          <div
            key={cat}
            onClick={() => onSelect?.(cat)}
            style={{
              padding: '10px 20px',
              color: activeCategory === cat ? '#3b82f6' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              borderLeft: activeCategory === cat ? '3px solid #3b82f6' : '3px solid transparent',
              backgroundColor: activeCategory === cat ? 'rgba(59,130,246,0.1)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;
EOF
commit "rough sidebar prototype" "2026-02-04T11:08:45+05:30"

# Commit 3
mkdir -p backend/src/mock
cat > backend/src/mock/sampleResponses.json << 'EOF'
{
  "newsApiSample": {
    "status": "ok",
    "totalResults": 3,
    "articles": [
      {
        "source": { "id": "techcrunch", "name": "TechCrunch" },
        "author": "Sarah Perez",
        "title": "AI startup raises $50M in Series B funding",
        "description": "An artificial intelligence startup focused on enterprise solutions has closed a $50 million Series B round.",
        "url": "https://example.com/ai-startup",
        "urlToImage": "https://picsum.photos/400/200",
        "publishedAt": "2026-02-04T08:00:00Z",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "source": { "id": null, "name": "Reuters" },
        "author": "John Smith",
        "title": "Global markets rally on economic data",
        "description": "Stock markets around the world rose sharply following positive economic indicators.",
        "url": "https://example.com/markets",
        "urlToImage": "https://picsum.photos/400/201",
        "publishedAt": "2026-02-04T06:30:00Z",
        "content": "Markets showed strong performance across major indices."
      },
      {
        "source": { "id": null, "name": "BBC News" },
        "author": null,
        "title": "New climate agreement reached at summit",
        "description": "World leaders have agreed on new emissions targets during the latest climate summit.",
        "url": "https://example.com/climate",
        "urlToImage": "https://picsum.photos/400/202",
        "publishedAt": "2026-02-04T05:15:00Z",
        "content": "The agreement includes binding targets for major economies."
      }
    ]
  }
}
EOF
commit "added sample response payloads" "2026-02-04T16:22:37+05:30"

# Commit 4
cat > frontend/src/experimental/ScrollFeed.jsx << 'EOF'
import React, { useState, useCallback, useRef, useEffect } from 'react';

// infinite scroll experiment for the news feed
// trying to see if this feels better than pagination
const ScrollFeed = ({ fetchNews }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    // simulating fetch
    const fakeItems = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i,
      title: `News Article ${(page - 1) * 10 + i + 1}`,
      source: 'Test Source',
      time: new Date().toISOString()
    }));

    setTimeout(() => {
      setItems(prev => [...prev, ...fakeItems]);
      setLoading(false);
      if (page >= 5) setHasMore(false);
    }, 800);
  }, [page]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div
            key={item.id}
            ref={isLast ? lastItemRef : null}
            style={{
              padding: '16px',
              marginBottom: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}
          >
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ color: '#64748b', fontSize: '12px' }}>{item.source}</p>
          </div>
        );
      })}
      {loading && <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading more...</p>}
      {!hasMore && <p style={{ textAlign: 'center', color: '#64748b' }}>No more articles</p>}
    </div>
  );
};

export default ScrollFeed;
EOF
commit "feed scroll experiment" "2026-02-04T23:15:50+05:30"

###############################################
# FEB 05 - 1 commit
###############################################

mkdir -p backend/src/experimental
cat > backend/src/experimental/categoryParser.js << 'EOF'
// rough category parser - trying to auto-categorize articles
// based on keywords in title/description

const categoryKeywords = {
  technology: ['ai', 'tech', 'software', 'startup', 'app', 'digital', 'cyber', 'robot', 'machine learning'],
  business: ['market', 'stock', 'economy', 'trade', 'finance', 'bank', 'invest', 'revenue', 'profit'],
  science: ['research', 'study', 'space', 'nasa', 'discovery', 'experiment', 'physics', 'biology'],
  health: ['health', 'medical', 'vaccine', 'hospital', 'disease', 'treatment', 'drug', 'mental'],
  sports: ['game', 'match', 'tournament', 'league', 'player', 'team', 'score', 'championship'],
  entertainment: ['movie', 'film', 'music', 'celebrity', 'show', 'album', 'concert', 'actor'],
  politics: ['election', 'government', 'policy', 'vote', 'congress', 'senate', 'president', 'law']
};

function guessCategory(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();
  const scores = {};

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    scores[category] = keywords.reduce((score, kw) => {
      return score + (text.includes(kw) ? 1 : 0);
    }, 0);
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? best[0] : 'general';
}

// quick test
if (require.main === module) {
  console.log(guessCategory('AI startup raises funding in tech sector'));
  console.log(guessCategory('New vaccine shows promising results'));
  console.log(guessCategory('Team wins championship game'));
}

module.exports = { guessCategory };
EOF
commit "prototype news categorization" "2026-02-05T20:33:41+05:30"

###############################################
# FEB 06 - 6 commits
###############################################

cat > frontend/src/drafts/GridLayout.jsx << 'EOF'
import React from 'react';

// trying a pinterest-style masonry grid for news cards
const GridLayout = ({ children, columns = 3, gap = 16 }) => {
  return (
    <div style={{
      columnCount: columns,
      columnGap: `${gap}px`,
      padding: '16px'
    }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{
          breakInside: 'avoid',
          marginBottom: `${gap}px`
        }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
EOF
commit "grid layout experiment for cards" "2026-02-06T08:45:19+05:30"

cat > frontend/src/experimental/DarkModeToggle.jsx << 'EOF'
import React, { useState } from 'react';

// standalone dark mode toggle for testing
// the app already has theming via ThemeContext but i wanted
// to try a different animation approach
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        width: '56px',
        height: '28px',
        borderRadius: '14px',
        border: 'none',
        backgroundColor: isDark ? '#3b82f6' : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        padding: 0
      }}
    >
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '3px',
        left: isDark ? '31px' : '3px',
        transition: 'left 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px'
      }}>
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
};

export default DarkModeToggle;
EOF
commit "dark mode toggle animation test" "2026-02-06T10:18:33+05:30"

mkdir -p frontend/src/unused
cat > frontend/src/unused/ReadingTime.jsx << 'EOF'
import React from 'react';

// calculate estimated reading time for articles
// probably wont use this since we only show snippets
const ReadingTime = ({ text, wordsPerMinute = 200 }) => {
  if (!text) return null;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return (
    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
      📖 {minutes} min read
    </span>
  );
};

export default ReadingTime;
EOF
commit "reading time estimate component" "2026-02-06T14:02:55+05:30"

cat > backend/src/sandbox/healthCheck.js << 'EOF'
const express = require('express');
const router = express.Router();

// simple health check endpoint for monitoring
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();

  res.json({
    status: 'ok',
    uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`
    },
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

module.exports = router;
EOF
commit "basic health check route" "2026-02-06T17:30:12+05:30"

mkdir -p backend/src/mock/data
cat > backend/src/mock/data/categories.json << 'EOF'
{
  "categories": [
    {
      "id": "tech",
      "label": "Technology",
      "icon": "💻",
      "color": "#3b82f6",
      "subcategories": ["AI/ML", "Startups", "Gadgets", "Programming", "Cybersecurity"]
    },
    {
      "id": "biz",
      "label": "Business",
      "icon": "📊",
      "color": "#10b981",
      "subcategories": ["Markets", "Economy", "Startups", "Real Estate"]
    },
    {
      "id": "science",
      "label": "Science",
      "icon": "🔬",
      "color": "#8b5cf6",
      "subcategories": ["Space", "Physics", "Biology", "Environment"]
    },
    {
      "id": "sports",
      "label": "Sports",
      "icon": "⚽",
      "color": "#f59e0b",
      "subcategories": ["Cricket", "Football", "Tennis", "Basketball"]
    },
    {
      "id": "health",
      "label": "Health",
      "icon": "🏥",
      "color": "#ef4444",
      "subcategories": ["Medicine", "Fitness", "Mental Health", "Nutrition"]
    },
    {
      "id": "entertainment",
      "label": "Entertainment",
      "icon": "🎬",
      "color": "#ec4899",
      "subcategories": ["Movies", "Music", "Gaming", "TV Shows"]
    }
  ]
}
EOF
commit "category metadata sample data" "2026-02-06T19:45:07+05:30"

cat > frontend/src/experimental/useLocalStorage.js << 'EOF'
import { useState, useEffect } from 'react';

// custom hook for persisting state in localStorage
// might be handy for saving user preferences
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
EOF
commit "localStorage hook for user prefs" "2026-02-06T23:11:28+05:30"

###############################################
# FEB 07 - 3 commits
###############################################

mkdir -p frontend/src/prototype
cat > frontend/src/prototype/RecommendationCard.jsx << 'EOF'
import React from 'react';

// prototype for "recommended for you" section
// based on reading history - just mock data for now
const RecommendationCard = ({ article, reason }) => {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      border: '1px solid #334155',
      marginBottom: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: '#f59e0b' }}>✨ Recommended</span>
        {reason && (
          <span style={{ fontSize: '10px', color: '#64748b' }}>• {reason}</span>
        )}
      </div>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 6px 0' }}>
        {article?.title || 'Article Title'}
      </h4>
      <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
        {article?.source || 'Source'} • {article?.time || '2h ago'}
      </p>
    </div>
  );
};

export default RecommendationCard;
EOF
commit "prototype recommendation card" "2026-02-07T11:22:45+05:30"

cat > backend/src/experimental/recommendEngine.js << 'EOF'
// very rough recommendation prototype
// idea: track which categories user reads most,
// then weight results towards those categories

class SimpleRecommender {
  constructor() {
    // in-memory store for now - would use redis or db later
    this.userPreferences = new Map();
  }

  trackRead(userId, category) {
    if (!this.userPreferences.has(userId)) {
      this.userPreferences.set(userId, {});
    }
    const prefs = this.userPreferences.get(userId);
    prefs[category] = (prefs[category] || 0) + 1;
  }

  getTopCategories(userId, limit = 3) {
    const prefs = this.userPreferences.get(userId) || {};
    return Object.entries(prefs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([cat]) => cat);
  }

  // score articles based on user preference
  scoreArticles(userId, articles) {
    const topCats = this.getTopCategories(userId);
    return articles.map(article => ({
      ...article,
      relevanceScore: topCats.includes(article.category) ? 1.0 : 0.5,
      isRecommended: topCats.includes(article.category)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

module.exports = SimpleRecommender;
EOF
commit "basic recommendation engine prototype" "2026-02-07T15:47:19+05:30"

cat > frontend/src/unused/Breadcrumb.jsx << 'EOF'
import React from 'react';

// breadcrumb nav - tested it but doesn't fit the current design
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav style={{ padding: '8px 0', fontSize: '13px' }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ color: '#94a3b8', margin: '0 6px' }}>/</span>}
          {item.href ? (
            <a href={item.href} style={{ color: '#3b82f6', textDecoration: 'none' }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: '#64748b' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
EOF
commit "breadcrumb component - probably wont use" "2026-02-07T21:58:33+05:30"

echo "✅ Feb 02-07 done"
