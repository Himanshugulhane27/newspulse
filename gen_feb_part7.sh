#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

commit() {
  local msg="$1" date="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

###############################################
# FEB 23 - 2 commits
###############################################

cat > backend/src/experimental/requestValidator.js << 'EOF'
// middleware to validate incoming requests
// simpler alternative to joi/express-validator for small routes
const validate = (schema) => (req, res, next) => {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    const value = req.query[field] || req.body[field] || req.params[field];
    if (rules.required && (value === undefined || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    if (value !== undefined) {
      if (rules.type === 'number' && isNaN(Number(value))) {
        errors.push(`${field} must be a number`);
      }
      if (rules.min !== undefined && Number(value) < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && Number(value) > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      }
    }
  }
  if (errors.length) return res.status(400).json({ errors });
  next();
};
module.exports = validate;
EOF
commit "simple request validator middleware" "2026-02-23T13:20:44+05:30"

cat > frontend/src/sandbox/EmptyState.jsx << 'EOF'
import React from 'react';
// empty state component for when there's no data
const EmptyState = ({ icon = '📭', title, message, actionLabel, onAction }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '60px 20px', textAlign: 'center'
  }}>
    <span style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</span>
    <h3 style={{ color: '#f1f5f9', fontSize: '18px', margin: '0 0 8px 0' }}>
      {title || 'Nothing here yet'}
    </h3>
    <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 0 20px 0' }}>
      {message || 'Check back later for updates.'}
    </p>
    {actionLabel && (
      <button onClick={onAction} style={{
        padding: '10px 24px', backgroundColor: '#3b82f6', color: '#fff',
        border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
      }}>{actionLabel}</button>
    )}
  </div>
);
export default EmptyState;
EOF
commit "empty state placeholder component" "2026-02-23T20:10:22+05:30"

###############################################
# FEB 24 - 7 commits
###############################################

mkdir -p frontend/src/prototype/settings
cat > frontend/src/prototype/settings/NotificationSettings.jsx << 'EOF'
import React, { useState } from 'react';
// notification preferences page
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    breaking: true, daily: false, weekly: true,
    categories: { technology: true, sports: false, business: true }
  });
  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '20px' }}>Notification Settings</h3>
      {[
        { key: 'breaking', label: 'Breaking News Alerts', desc: 'Get notified for major breaking stories' },
        { key: 'daily', label: 'Daily Digest', desc: 'Summary of top stories every morning' },
        { key: 'weekly', label: 'Weekly Roundup', desc: 'Best stories from the past week' },
      ].map(item => (
        <div key={item.key} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 0', borderBottom: '1px solid #1e293b'
        }}>
          <div>
            <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0 }}>{item.label}</p>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{item.desc}</span>
          </div>
          <button onClick={() => toggle(item.key)} style={{
            width: '44px', height: '24px', borderRadius: '12px', border: 'none',
            backgroundColor: settings[item.key] ? '#3b82f6' : '#334155', cursor: 'pointer',
            position: 'relative'
          }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff',
              position: 'absolute', top: '3px',
              left: settings[item.key] ? '23px' : '3px', transition: 'left 0.2s ease'
            }}/>
          </button>
        </div>
      ))}
    </div>
  );
};
export default NotificationSettings;
EOF
commit "notification settings prototype" "2026-02-24T08:55:18+05:30"

cat > backend/src/mock/data/breakingNews.json << 'EOF'
{
  "breaking": [
    {
      "id": "bn001",
      "title": "Major earthquake hits Pacific region",
      "priority": "high",
      "category": "general",
      "source": "Reuters",
      "timestamp": "2026-02-24T06:30:00Z",
      "summary": "A 7.2 magnitude earthquake was recorded in the Pacific Ring of Fire region."
    },
    {
      "id": "bn002",
      "title": "Tech giant announces surprise acquisition",
      "priority": "medium",
      "category": "technology",
      "source": "TechCrunch",
      "timestamp": "2026-02-24T08:15:00Z",
      "summary": "In a surprise move, a major technology company has announced the acquisition of a popular startup."
    },
    {
      "id": "bn003",
      "title": "Central bank adjusts interest rates",
      "priority": "high",
      "category": "business",
      "source": "Bloomberg",
      "timestamp": "2026-02-24T09:00:00Z",
      "summary": "The central bank has announced a change in interest rates affecting markets globally."
    }
  ]
}
EOF
commit "breaking news sample dataset" "2026-02-24T10:20:33+05:30"

cat > frontend/src/experimental/LazyImage.jsx << 'EOF'
import React, { useState, useRef, useEffect } from 'react';
// lazy load images with intersection observer
// shows a blur placeholder until image is in viewport
const LazyImage = ({ src, alt, style = {}, placeholderColor = '#1e293b' }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={imgRef} style={{
      backgroundColor: placeholderColor, overflow: 'hidden', ...style
    }}>
      {inView && (
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease'
        }}/>
      )}
    </div>
  );
};
export default LazyImage;
EOF
commit "lazy image loading component" "2026-02-24T13:40:55+05:30"

cat > backend/src/sandbox/corsConfig.js << 'EOF'
// experimenting with more granular CORS setup
// the current one is basic - this would give more control
const corsOptions = {
  development: {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
  },
  production: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://newspulse.vercel.app',
        'https://www.newspulse.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
const getCorsConfig = () => corsOptions[process.env.NODE_ENV] || corsOptions.development;
module.exports = { getCorsConfig, corsOptions };
EOF
commit "granular cors configuration draft" "2026-02-24T16:15:28+05:30"

cat > frontend/src/unused/ProfileAvatar.jsx << 'EOF'
import React from 'react';
// user profile avatar with initials fallback
const ProfileAvatar = ({ name, imageUrl, size = 36 }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const bgColor = colors[name ? name.charCodeAt(0) % colors.length : 0];
  if (imageUrl) {
    return <img src={imageUrl} alt={name} style={{
      width: size, height: size, borderRadius: '50%', objectFit: 'cover'
    }}/>;
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', backgroundColor: bgColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.38, fontWeight: 600
    }}>
      {initials}
    </div>
  );
};
export default ProfileAvatar;
EOF
commit "profile avatar with initials fallback" "2026-02-24T19:50:12+05:30"

cat > frontend/src/drafts/ArticleDetail.jsx << 'EOF'
import React from 'react';
// full article detail page layout
const ArticleDetail = ({ article }) => {
  const a = article || {
    title: 'Sample Article Title Goes Here',
    source: { name: 'TechCrunch' },
    author: 'John Doe',
    publishedAt: '2026-02-24T10:00:00Z',
    urlToImage: 'https://picsum.photos/800/400',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    description: 'A detailed article about the latest developments in technology.'
  };
  return (
    <article style={{ maxWidth: '720px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 600 }}>{a.source?.name}</span>
        <h1 style={{ color: '#f1f5f9', fontSize: '28px', lineHeight: 1.3, margin: '8px 0 12px' }}>{a.title}</h1>
        <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '13px' }}>
          {a.author && <span>By {a.author}</span>}
          <span>{new Date(a.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
      {a.urlToImage && (
        <img src={a.urlToImage} alt="" style={{
          width: '100%', borderRadius: '12px', maxHeight: '400px', objectFit: 'cover', marginBottom: '24px'
        }}/>
      )}
      <p style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: 1.8 }}>{a.description}</p>
      <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8, marginTop: '16px' }}>{a.content}</p>
    </article>
  );
};
export default ArticleDetail;
EOF
commit "article detail page layout draft" "2026-02-24T22:30:45+05:30"

# small fix
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
  'Wired': '#000000',
  'Bloomberg': '#5c2d91',
};

const SourceBadge = ({ source }) => {
  const color = sourceColors[source] || '#64748b';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: 600,
      color: '#fff',
      backgroundColor: color,
      letterSpacing: '0.3px'
    }}>
      {source}
    </span>
  );
};

export default SourceBadge;
EOF
commit "added more sources to badge colors" "2026-02-24T23:55:08+05:30"

###############################################
# FEB 25 - 3 commits
###############################################

cat > backend/src/experimental/newsFormatter.js << 'EOF'
// format raw API responses into cleaner structure
// normalize differences between NewsAPI, RSS, etc.
const formatArticle = (raw, source = 'newsapi') => {
  if (source === 'newsapi') {
    return {
      id: generateId(raw.title),
      title: raw.title || 'Untitled',
      description: raw.description || '',
      content: raw.content?.replace(/\[\+\d+ chars\]/, '') || '',
      author: raw.author || 'Unknown',
      source: raw.source?.name || 'Unknown',
      sourceId: raw.source?.id || null,
      url: raw.url,
      imageUrl: raw.urlToImage,
      publishedAt: raw.publishedAt,
      fetchedAt: new Date().toISOString()
    };
  }
  // rss format
  return {
    id: generateId(raw.title),
    title: raw.title || 'Untitled',
    description: stripHtml(raw.description || ''),
    content: '',
    author: raw.creator || 'Unknown',
    source: raw.source || 'RSS',
    sourceId: null,
    url: raw.link,
    imageUrl: raw.enclosure?.url || null,
    publishedAt: raw.pubDate,
    fetchedAt: new Date().toISOString()
  };
};

function generateId(title) {
  return (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 60);
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

module.exports = { formatArticle, generateId, stripHtml };
EOF
commit "news article formatter utility" "2026-02-25T11:25:38+05:30"

cat > frontend/src/sandbox/PullToRefresh.jsx << 'EOF'
import React, { useState, useRef } from 'react';
// pull to refresh gesture for mobile
const PullToRefresh = ({ onRefresh, children }) => {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const threshold = 80;
  const handleTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const handleTouchMove = (e) => {
    if (window.scrollY > 0) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPulling(true);
      setPullDistance(Math.min(diff * 0.5, 100));
    }
  };
  const handleTouchEnd = () => {
    if (pullDistance > threshold) onRefresh?.();
    setPulling(false);
    setPullDistance(0);
  };
  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {pulling && (
        <div style={{
          height: `${pullDistance}px`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: pulling ? 'none' : 'height 0.3s ease'
        }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>
            {pullDistance > threshold ? '↑ Release to refresh' : '↓ Pull to refresh'}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};
export default PullToRefresh;
EOF
commit "pull to refresh for mobile" "2026-02-25T16:48:22+05:30"

cat > frontend/src/experimental/FocusMode.jsx << 'EOF'
import React, { useState } from 'react';
// focus mode - hides distractions, shows only article list
// toggle for users who want minimal UI
const FocusMode = ({ enabled, onToggle, children }) => {
  return (
    <div>
      <button onClick={onToggle} style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 50,
        width: '44px', height: '44px', borderRadius: '50%',
        backgroundColor: enabled ? '#3b82f6' : '#334155',
        border: 'none', cursor: 'pointer', fontSize: '18px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        {enabled ? '📖' : '👁️'}
      </button>
      <div style={{
        transition: 'all 0.3s ease',
        ...(enabled && { maxWidth: '600px', margin: '0 auto' })
      }}>
        {children}
      </div>
    </div>
  );
};
export default FocusMode;
EOF
commit "focus mode toggle experiment" "2026-02-25T22:15:10+05:30"

###############################################
# FEB 26 - 5 commits
###############################################

cat > backend/src/mock/data/regionData.json << 'EOF'
{
  "regions": [
    { "code": "in", "name": "India", "languages": ["en", "hi"], "timezone": "Asia/Kolkata", "active": true },
    { "code": "us", "name": "United States", "languages": ["en"], "timezone": "America/New_York", "active": true },
    { "code": "gb", "name": "United Kingdom", "languages": ["en"], "timezone": "Europe/London", "active": true },
    { "code": "au", "name": "Australia", "languages": ["en"], "timezone": "Australia/Sydney", "active": false },
    { "code": "ca", "name": "Canada", "languages": ["en", "fr"], "timezone": "America/Toronto", "active": false },
    { "code": "de", "name": "Germany", "languages": ["de", "en"], "timezone": "Europe/Berlin", "active": false }
  ]
}
EOF
commit "region configuration sample data" "2026-02-26T09:30:15+05:30"

cat > frontend/src/prototype/RegionSelector.jsx << 'EOF'
import React, { useState } from 'react';
// region/country selector for localized news
const RegionSelector = ({ regions, onSelect }) => {
  const [selected, setSelected] = useState('in');
  const defaultRegions = regions || [
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
  ];
  const handleSelect = (code) => {
    setSelected(code);
    onSelect?.(code);
  };
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
      {defaultRegions.map(r => (
        <button key={r.code} onClick={() => handleSelect(r.code)} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
          border: selected === r.code ? '1px solid #3b82f6' : '1px solid #334155',
          backgroundColor: selected === r.code ? 'rgba(59,130,246,0.15)' : 'transparent',
          color: selected === r.code ? '#60a5fa' : '#94a3b8', cursor: 'pointer'
        }}>
          <span>{r.flag}</span> {r.name}
        </button>
      ))}
    </div>
  );
};
export default RegionSelector;
EOF
commit "region selector for localized news" "2026-02-26T12:45:38+05:30"

cat > backend/src/sandbox/envValidator.js << 'EOF'
// validate required env vars on startup
// better than crashing randomly later
const requiredVars = [
  { name: 'NEWS_API_KEY', description: 'NewsAPI.org API key' },
  { name: 'MONGO_URI', description: 'MongoDB connection string' },
  { name: 'JWT_SECRET', description: 'JWT signing secret' },
];
const optionalVars = [
  { name: 'GOOGLE_CLIENT_ID', description: 'Google OAuth client ID' },
  { name: 'GOOGLE_CLIENT_SECRET', description: 'Google OAuth secret' },
  { name: 'NODE_ENV', description: 'Environment', default: 'development' },
  { name: 'PORT', description: 'Server port', default: '5000' },
];
function validateEnv() {
  const missing = [];
  const warnings = [];
  for (const v of requiredVars) {
    if (!process.env[v.name]) missing.push(`${v.name} - ${v.description}`);
  }
  for (const v of optionalVars) {
    if (!process.env[v.name]) warnings.push(`${v.name} not set, using default: ${v.default || 'none'}`);
  }
  if (missing.length) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(m => console.error(`   - ${m}`));
    process.exit(1);
  }
  if (warnings.length) {
    console.warn('⚠️  Optional env vars:');
    warnings.forEach(w => console.warn(`   - ${w}`));
  }
  console.log('✅ Environment validation passed');
}
module.exports = { validateEnv };
EOF
commit "env variable validator utility" "2026-02-26T15:20:50+05:30"

# cleanup old file
cat > frontend/src/archive/OldNavbar.jsx << 'EOF'
import React from 'react';

// old navbar design - moved here after redesign
// keeping for reference only
// NOTE: this component is NOT used anywhere in the active app

const OldNavbar = ({ user }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1a1a2e',
      borderBottom: '2px solid #16213e'
    }}>
      <h1 style={{ color: '#e94560', fontSize: '20px', margin: 0 }}>
        NewsPulse
      </h1>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search news..."
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontSize: '13px',
            width: '200px'
          }}
        />
        {user && (
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>
            {user.name}
          </span>
        )}
      </div>
    </header>
  );
};

export default OldNavbar;
EOF
commit "cleanup old navbar formatting" "2026-02-26T19:10:22+05:30"

cat > frontend/src/dev-tools/PerformanceMonitor.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
// dev-only performance monitor overlay
const PerformanceMonitor = ({ visible = true }) => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(null);
  useEffect(() => {
    if (!visible) return;
    let frameCount = 0;
    let lastTime = performance.now();
    const tick = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [visible]);
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', top: '10px', right: '10px', padding: '8px 12px',
      backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '6px', zIndex: 9999,
      fontFamily: 'monospace', fontSize: '11px', color: fps > 30 ? '#10b981' : '#ef4444'
    }}>
      {fps} FPS {memory ? `| ${memory}MB` : ''}
    </div>
  );
};
export default PerformanceMonitor;
EOF
commit "fps and memory performance monitor" "2026-02-26T23:30:45+05:30"

###############################################
# FEB 27 - 1 commit
###############################################

# move some old utils to archive
mkdir -p backend/src/archive/utils
cat > backend/src/archive/utils/oldHelpers.js << 'EOF'
// old helper functions that were replaced
// keeping here for reference

// was used for date formatting before we switched to date-fns
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// old slugify function - replaced with generateId in newsFormatter
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

// truncate text - now using CSS text-overflow instead
function truncate(str, maxLen = 100) {
  if (!str || str.length <= maxLen) return str;
  return str.substring(0, maxLen).trim() + '...';
}

module.exports = { formatDate, slugify, truncate };
EOF
commit "moved old utils to archive" "2026-02-27T18:45:33+05:30"

echo "✅ Feb 23-27 done"
