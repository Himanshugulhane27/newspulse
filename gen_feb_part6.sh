#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 21 - 10 commits (busiest day)
###############################################

cat > frontend/src/drafts/HeroSection.jsx << 'EOF'
import React from 'react';
// hero section redesign attempt - trying a more minimal approach
const HeroSection = ({ topArticle }) => {
  const article = topArticle || {
    title: 'Breaking: Major Technology Breakthrough Announced',
    source: 'TechCrunch', category: 'Technology',
    image: 'https://picsum.photos/800/400'
  };
  return (
    <section style={{
      position: 'relative', borderRadius: '16px', overflow: 'hidden',
      height: '360px', marginBottom: '24px'
    }}>
      <img src={article.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px'
      }}>
        <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
          {article.category}
        </span>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', maxWidth: '600px' }}>
          {article.title}
        </h1>
        <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{article.source} • Just now</span>
      </div>
    </section>
  );
};
export default HeroSection;
EOF
commit "hero section redesign attempt" "2026-02-21T08:20:11+05:30"

cat > frontend/src/prototype/FeaturedCarousel.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
// auto-rotating featured news carousel
const FeaturedCarousel = ({ articles = [] }) => {
  const [current, setCurrent] = useState(0);
  const items = articles.length ? articles : [
    { title: 'Top Story One', source: 'BBC', category: 'World' },
    { title: 'Top Story Two', source: 'CNN', category: 'Tech' },
    { title: 'Top Story Three', source: 'Reuters', category: 'Science' },
  ];
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % items.length), 4000);
    return () => clearInterval(timer);
  }, [items.length]);
  return (
    <div style={{ position: 'relative', height: '200px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1e293b' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          opacity: i === current ? 1 : 0, transition: 'opacity 0.5s ease'
        }}>
          <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 600 }}>{item.category}</span>
          <h3 style={{ color: '#f1f5f9', fontSize: '20px', margin: '4px 0' }}>{item.title}</h3>
          <span style={{ color: '#64748b', fontSize: '12px' }}>{item.source}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '6px' }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px',
            backgroundColor: i === current ? '#3b82f6' : '#334155', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}/>
        ))}
      </div>
    </div>
  );
};
export default FeaturedCarousel;
EOF
commit "featured news carousel prototype" "2026-02-21T09:45:33+05:30"

cat > backend/src/sandbox/loggerUtil.js << 'EOF'
// simple colorized logger utility for development
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};
const timestamp = () => new Date().toISOString().split('T')[1].split('.')[0];
const logger = {
  info: (msg, ...args) => console.log(`${colors.blue}[INFO]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  warn: (msg, ...args) => console.log(`${colors.yellow}[WARN]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  error: (msg, ...args) => console.log(`${colors.red}[ERROR]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  success: (msg, ...args) => console.log(`${colors.green}[OK]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  debug: (msg, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.gray}[DEBUG] ${timestamp()} ${msg}${colors.reset}`, ...args);
    }
  }
};
module.exports = logger;
EOF
commit "colorized logger utility" "2026-02-21T11:12:08+05:30"

cat > frontend/src/sandbox/CategoryCard.jsx << 'EOF'
import React from 'react';
// category card for explore page
const gradients = {
  technology: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
  business: 'linear-gradient(135deg, #064e3b, #10b981)',
  science: 'linear-gradient(135deg, #3b1f6e, #8b5cf6)',
  sports: 'linear-gradient(135deg, #78350f, #f59e0b)',
  health: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
  entertainment: 'linear-gradient(135deg, #831843, #ec4899)',
};
const icons = { technology: '💻', business: '📊', science: '🔬', sports: '⚽', health: '🏥', entertainment: '🎬' };
const CategoryCard = ({ category, articleCount, onClick }) => (
  <div onClick={onClick} style={{
    background: gradients[category] || 'linear-gradient(135deg, #334155, #64748b)',
    borderRadius: '12px', padding: '20px', cursor: 'pointer',
    transition: 'transform 0.2s ease', minHeight: '120px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  }}>
    <span style={{ fontSize: '32px' }}>{icons[category] || '📰'}</span>
    <div>
      <h3 style={{ color: '#fff', fontSize: '16px', margin: '0 0 2px 0', textTransform: 'capitalize' }}>{category}</h3>
      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{articleCount || 0} articles</span>
    </div>
  </div>
);
export default CategoryCard;
EOF
commit "category explore cards with gradients" "2026-02-21T13:30:45+05:30"

cat > backend/src/experimental/sentimentAnalyzer.js << 'EOF'
// super basic sentiment analysis - just keyword matching
// obv not real NLP but good enough for a prototype
const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive', 'growth', 'success', 'win', 'breakthrough', 'progress', 'improve', 'benefit'];
const negativeWords = ['bad', 'terrible', 'crisis', 'fail', 'loss', 'crash', 'decline', 'threat', 'danger', 'disaster', 'collapse', 'war'];

function analyzeSentiment(text) {
  if (!text) return { score: 0, label: 'neutral' };
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  const normalized = Math.max(-1, Math.min(1, score / Math.max(words.length * 0.1, 1)));
  let label = 'neutral';
  if (normalized > 0.2) label = 'positive';
  if (normalized < -0.2) label = 'negative';
  return { score: normalized, label };
}

// test
if (require.main === module) {
  console.log(analyzeSentiment('Great breakthrough in technology brings positive growth'));
  console.log(analyzeSentiment('Market crash threatens economic collapse'));
  console.log(analyzeSentiment('New policy announced today'));
}

module.exports = { analyzeSentiment };
EOF
commit "basic sentiment analysis prototype" "2026-02-21T15:50:20+05:30"

cat > frontend/src/experimental/Tabs.jsx << 'EOF'
import React, { useState } from 'react';
// reusable tab component
const Tabs = ({ tabs = [], defaultTab = 0, onChange }) => {
  const [active, setActive] = useState(defaultTab);
  const handleChange = (idx) => {
    setActive(idx);
    onChange?.(idx, tabs[idx]);
  };
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '16px' }}>
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => handleChange(i)} style={{
            padding: '10px 20px', border: 'none', backgroundColor: 'transparent',
            color: active === i ? '#3b82f6' : '#64748b', cursor: 'pointer',
            borderBottom: active === i ? '2px solid #3b82f6' : '2px solid transparent',
            fontSize: '13px', fontWeight: active === i ? 600 : 400,
            transition: 'all 0.2s ease'
          }}>
            {tab.label || tab}
          </button>
        ))}
      </div>
      {tabs[active]?.content && <div>{tabs[active].content}</div>}
    </div>
  );
};
export default Tabs;
EOF
commit "reusable tabs component" "2026-02-21T17:25:33+05:30"

cat > frontend/src/drafts/footer.css << 'EOF'
/* footer styles - not sure if we need a footer */
.site-footer {
  padding: 32px 24px;
  background-color: #0f172a;
  border-top: 1px solid #1e293b;
  margin-top: auto;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand h3 {
  color: #f1f5f9;
  font-size: 18px;
  margin: 0 0 8px 0;
}
.footer-brand p {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}
.footer-links h4 {
  color: #e2e8f0;
  font-size: 13px;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.footer-links a {
  display: block;
  color: #94a3b8;
  font-size: 13px;
  text-decoration: none;
  padding: 4px 0;
}
.footer-links a:hover {
  color: #3b82f6;
}
.footer-bottom {
  text-align: center;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #1e293b;
  color: #475569;
  font-size: 12px;
}
EOF
commit "footer styles draft" "2026-02-21T19:40:18+05:30"

cat > frontend/src/archive/oldDashboardLayout.jsx << 'EOF'
import React from 'react';
// old dashboard layout before the redesign
// keeping for reference - had a 3 column grid
const OldDashboardLayout = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
    <aside style={{ borderRight: '1px solid #1e293b', padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', fontSize: '14px' }}>Categories</h3>
    </aside>
    <main style={{ padding: '20px' }}>
      <h2 style={{ color: '#f1f5f9' }}>News Feed</h2>
    </main>
    <aside style={{ borderLeft: '1px solid #1e293b', padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', fontSize: '14px' }}>Trending</h3>
    </aside>
  </div>
);
export default OldDashboardLayout;
EOF
commit "archived old 3-column dashboard layout" "2026-02-21T21:15:55+05:30"

cat > backend/src/sandbox/responseFormatter.js << 'EOF'
// standardized API response formatter
// ensures all endpoints return consistent structure
const formatSuccess = (data, message = 'Success', meta = {}) => ({
  success: true,
  message,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    ...meta
  }
});

const formatError = (message, code = 500, details = null) => ({
  success: false,
  error: {
    message,
    code,
    ...(details && { details })
  },
  meta: {
    timestamp: new Date().toISOString()
  }
});

const formatPaginated = (data, page, pageSize, total) => ({
  success: true,
  data,
  pagination: {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    hasNext: page * pageSize < total,
    hasPrev: page > 1
  },
  meta: { timestamp: new Date().toISOString() }
});

module.exports = { formatSuccess, formatError, formatPaginated };
EOF
commit "response formatter utility" "2026-02-21T23:50:42+05:30"

###############################################
# FEB 22 - 4 commits
###############################################

cat > frontend/src/prototype/ReadingList.jsx << 'EOF'
import React, { useState } from 'react';
// reading list / save for later feature
const ReadingList = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'The Future of AI in Journalism', source: 'Wired', addedAt: '2 days ago', read: false },
    { id: 2, title: 'Climate Policy Changes in 2026', source: 'Reuters', addedAt: '3 days ago', read: true },
    { id: 3, title: 'Startup Ecosystem Report', source: 'TechCrunch', addedAt: '5 days ago', read: false },
  ]);
  const toggleRead = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, read: !i.read } : i));
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  return (
    <div style={{ padding: '24px', maxWidth: '700px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '20px' }}>📚 Reading List</h2>
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
          borderBottom: '1px solid #1e293b', opacity: item.read ? 0.5 : 1
        }}>
          <input type="checkbox" checked={item.read} onChange={() => toggleRead(item.id)}/>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#e2e8f0', fontSize: '14px', margin: '0 0 2px 0', textDecoration: item.read ? 'line-through' : 'none' }}>
              {item.title}
            </h4>
            <span style={{ color: '#64748b', fontSize: '11px' }}>{item.source} • Added {item.addedAt}</span>
          </div>
          <button onClick={() => removeItem(item.id)} style={{
            background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px'
          }}>✕</button>
        </div>
      ))}
    </div>
  );
};
export default ReadingList;
EOF
commit "reading list feature prototype" "2026-02-22T10:30:15+05:30"

cat > backend/src/experimental/scheduler.js << 'EOF'
// simple job scheduler for periodic tasks
// like refreshing news cache, cleanup, etc
class TaskScheduler {
  constructor() {
    this.tasks = new Map();
  }
  schedule(name, fn, intervalMs) {
    if (this.tasks.has(name)) {
      console.warn(`Task "${name}" already scheduled, skipping`);
      return;
    }
    const id = setInterval(async () => {
      try {
        console.log(`[Scheduler] Running "${name}"`);
        await fn();
      } catch (err) {
        console.error(`[Scheduler] "${name}" failed:`, err.message);
      }
    }, intervalMs);
    this.tasks.set(name, { id, interval: intervalMs, fn });
    console.log(`[Scheduler] Scheduled "${name}" every ${intervalMs / 1000}s`);
  }
  cancel(name) {
    const task = this.tasks.get(name);
    if (task) {
      clearInterval(task.id);
      this.tasks.delete(name);
    }
  }
  cancelAll() {
    for (const [name] of this.tasks) this.cancel(name);
  }
  list() {
    return Array.from(this.tasks.entries()).map(([name, t]) => ({ name, interval: t.interval }));
  }
}
module.exports = TaskScheduler;
EOF
commit "task scheduler for background jobs" "2026-02-22T14:22:48+05:30"

# cleanup commit
cat > frontend/src/experimental/useLocalStorage.js << 'EOF'
import { useState, useEffect } from 'react';

// custom hook for persisting state in localStorage
// might be handy for saving user preferences like theme, category
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

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setStoredValue, removeValue];
}

export default useLocalStorage;
EOF
commit "added removeValue to localStorage hook" "2026-02-22T18:40:33+05:30"

cat > frontend/src/drafts/MobileMenu.jsx << 'EOF'
import React, { useState } from 'react';
// mobile hamburger menu drawer
const MobileMenu = ({ isOpen, onClose, categories }) => {
  if (!isOpen) return null;
  const cats = categories || ['General', 'Technology', 'Business', 'Science', 'Health', 'Sports', 'Entertainment'];
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 98 }}/>
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px',
        backgroundColor: '#0f172a', zIndex: 99, padding: '24px',
        transform: 'translateX(0)', transition: 'transform 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '18px', margin: 0 }}>NewsPulse</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {cats.map(cat => (
            <a key={cat} href="#" style={{
              padding: '10px 14px', color: '#e2e8f0', textDecoration: 'none',
              borderRadius: '8px', fontSize: '14px'
            }}>{cat}</a>
          ))}
        </nav>
      </div>
    </>
  );
};
export default MobileMenu;
EOF
commit "mobile hamburger menu drawer" "2026-02-22T22:55:10+05:30"

echo "✅ Feb 21-22 done"
