#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

c() { git add -A; GIT_AUTHOR_DATE="$2" GIT_COMMITTER_DATE="$2" git commit -m "$1"; }

########################################
# MAY 03 → 2 commits (light setup)
########################################

cat > frontend/src/experimental/useWindowSize.js << 'EOF'
import { useState, useEffect } from 'react';
function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); clearTimeout(timeout); };
  }, []);
  return { ...size, isMobile: size.width < 640, isTablet: size.width >= 640 && size.width < 1024, isDesktop: size.width >= 1024 };
}
export default useWindowSize;
EOF
c "window size hook for responsive stuff" "2026-05-03T14:22:18+05:30"

cat > backend/src/sandbox/sourceTabsPayload.js << 'EOF'
const express = require('express');
const router = express.Router();
router.get('/sources/grouped', (req, res) => {
  const grouped = {
    'BBC News': { count: 12, latest: '2026-05-03T08:00:00Z', categories: ['general', 'politics'],
      articles: [{ title: 'World leaders meet for summit talks', publishedAt: '2026-05-03T08:00:00Z' }] },
    'TechCrunch': { count: 8, latest: '2026-05-03T09:15:00Z', categories: ['technology'],
      articles: [{ title: 'New AI chip promises 3x performance', publishedAt: '2026-05-03T09:15:00Z' }] },
    'ESPN': { count: 6, latest: '2026-05-03T10:00:00Z', categories: ['sports'],
      articles: [{ title: 'Championship finals set for weekend', publishedAt: '2026-05-03T10:00:00Z' }] }
  };
  res.json({ success: true, data: grouped, generatedAt: new Date().toISOString() });
});
module.exports = router;
EOF
c "mock payload for source tabs" "2026-05-03T21:45:33+05:30"

########################################
# MAY 04 → 1 commit (tiny cleanup)
########################################

cat > frontend/src/archive/oldCategoryFilter.jsx << 'EOF'
import React from 'react';
// old dropdown category filter - replaced with pill buttons
const OldCategoryFilter = ({ categories, selected, onChange }) => {
  const cats = categories || ['general', 'technology', 'business', 'science', 'health', 'sports'];
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ color: '#94a3b8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Category</label>
      <select value={selected || 'general'} onChange={e => onChange?.(e.target.value)}
        style={{ width: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #334155',
          backgroundColor: '#1e293b', color: '#e2e8f0', fontSize: '13px' }}>
        {cats.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
      </select>
    </div>
  );
};
export default OldCategoryFilter;
EOF
c "archive old dropdown category filter" "2026-05-04T17:08:50+05:30"

########################################
# MAY 05 → 7 commits (heavy experimentation)
########################################

cat > frontend/src/experimental/CardHoverEffect.jsx << 'EOF'
import React, { useState } from 'react';
const CardHoverEffect = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      padding: '16px', backgroundColor: '#1e293b', borderRadius: '12px',
      border: `1px solid ${hovered ? '#3b82f6' : '#334155'}`,
      transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: hovered ? '0 8px 24px rgba(59,130,246,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease', cursor: 'pointer',
    }}>{children}</div>
  );
};
export default CardHoverEffect;
EOF
c "quick card hover tweak" "2026-05-05T09:15:22+05:30"

cat > frontend/src/drafts/SplitCardLayout.jsx << 'EOF'
import React from 'react';
const SplitCardLayout = ({ title, source, imageUrl, description, time }) => {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '240px 1fr', gap: '16px', padding: '16px',
      backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155',
      marginBottom: '14px', cursor: 'pointer', transition: 'border-color 0.2s ease'
    }}>
      {imageUrl ? (
        <img src={imageUrl} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}/>
      ) : (
        <div style={{ width: '100%', height: '140px', borderRadius: '8px', backgroundColor: '#334155',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '28px' }}>📰</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.4 }}>
            {title || 'Article headline goes here'}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
            {description?.substring(0, 120) || 'Short description...'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 500 }}>{source || 'Source'}</span>
          <span style={{ color: '#475569', fontSize: '11px' }}>{time || '3h ago'}</span>
        </div>
      </div>
    </div>
  );
};
export default SplitCardLayout;
EOF
c "split card layout for wider screens" "2026-05-05T11:08:44+05:30"

cat > backend/src/experimental/topicExtractor.js << 'EOF'
const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are',
  'was','were','has','have','had','be','been','will','would','could','should','may','might','can','do','does','did',
  'not','no','so','if','than','too','very','just','about','after','before','new','says','said','report','according']);
function extractTopics(title) {
  if (!title) return [];
  const words = title.split(/\s+/);
  const topics = [];
  let current = [];
  for (const word of words) {
    const clean = word.replace(/[^a-zA-Z'-]/g, '');
    if (clean.length > 1 && clean[0] === clean[0].toUpperCase() && !stopWords.has(clean.toLowerCase())) {
      current.push(clean);
    } else {
      if (current.length > 0) { topics.push(current.join(' ')); current = []; }
    }
  }
  if (current.length > 0) topics.push(current.join(' '));
  return [...new Set(topics)].filter(t => t.length > 2);
}
if (require.main === module) {
  console.log(extractTopics('Apple Announces New iPhone at WWDC Event'));
  console.log(extractTopics('IPL 2026: Mumbai Indians Beat Chennai Super Kings'));
}
module.exports = { extractTopics };
EOF
c "topic extraction from article titles" "2026-05-05T13:42:15+05:30"

cat > frontend/src/sandbox/SourceTabs.jsx << 'EOF'
import React, { useState } from 'react';
const SourceTabs = ({ sources, onSourceChange }) => {
  const [active, setActive] = useState('all');
  const defaultSources = sources || [
    { id: 'all', label: 'All Sources' }, { id: 'bbc', label: 'BBC' },
    { id: 'cnn', label: 'CNN' }, { id: 'reuters', label: 'Reuters' },
    { id: 'techcrunch', label: 'TechCrunch' }, { id: 'ndtv', label: 'NDTV' },
  ];
  const handleClick = (id) => { setActive(id); onSourceChange?.(id); };
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '8px', backgroundColor: '#0f172a', borderRadius: '10px', overflowX: 'auto' }}>
      {defaultSources.map(src => (
        <button key={src.id} onClick={() => handleClick(src.id)} style={{
          padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 500,
          cursor: 'pointer', whiteSpace: 'nowrap',
          backgroundColor: active === src.id ? '#3b82f6' : 'transparent',
          color: active === src.id ? '#fff' : '#94a3b8', transition: 'all 0.15s ease'
        }}>{src.label}</button>
      ))}
    </div>
  );
};
export default SourceTabs;
EOF
c "source tabs filter component" "2026-05-05T16:30:08+05:30"

cat > frontend/src/sandbox/BookmarkWidget.jsx << 'EOF'
import React from 'react';
const BookmarkWidget = ({ bookmarks = [], maxItems = 4 }) => {
  const items = bookmarks.length ? bookmarks : [
    { id: 1, title: 'AI Ethics: What Developers Need to Know', source: 'Wired', savedAt: '2h ago' },
    { id: 2, title: 'Markets Close Higher on Fed Comments', source: 'Reuters', savedAt: '5h ago' },
    { id: 3, title: 'SpaceX Announces New Mission Timeline', source: 'BBC', savedAt: '1d ago' },
    { id: 4, title: 'India Tech Sector Growth Report 2026', source: 'NDTV', savedAt: '2d ago' },
  ];
  return (
    <div style={{ padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600, margin: 0 }}>📑 Recent Bookmarks</h4>
        <span style={{ color: '#3b82f6', fontSize: '11px', cursor: 'pointer' }}>View all</span>
      </div>
      {items.slice(0, maxItems).map(b => (
        <div key={b.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(51,65,85,0.4)' }}>
          <p style={{ color: '#e2e8f0', fontSize: '12px', margin: '0 0 3px', fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{b.source} · {b.savedAt}</span>
        </div>
      ))}
    </div>
  );
};
export default BookmarkWidget;
EOF
c "draft bookmark widget" "2026-05-05T19:55:40+05:30"

cat > frontend/src/unused/RelativeTime.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
// auto-updating relative time display - decided to use a util fn instead
const RelativeTime = ({ date }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(t); }, []);
  const getRelative = () => {
    const diff = now - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };
  return <span>{getRelative()}</span>;
};
export default RelativeTime;
EOF
c "relative time component - might just use util" "2026-05-05T22:18:33+05:30"

# cleanup
rm -f backend/src/mock/mockWebSocket.js
c "cleanup unused ws mock server" "2026-05-05T23:42:10+05:30"

echo "✅ May 03-05 done"
