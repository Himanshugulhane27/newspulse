import React, { useState } from 'react';
const ArticleActions = ({ articleId, onBookmark, onShare }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);
  const handleBookmark = () => { setBookmarked(!bookmarked); onBookmark?.(articleId, !bookmarked); };
  const handleShare = async () => { try { await navigator.clipboard.writeText(`${window.location.origin}/article/${articleId}`); setShared(true); setTimeout(() => setShared(false), 2000); } catch {} onShare?.(articleId); };
  const btn = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' };
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '6px 0', borderTop: '1px solid rgba(30,41,59,0.5)' }}>
      <button onClick={handleBookmark} style={{ ...btn, color: bookmarked ? '#f59e0b' : '#64748b' }}>{bookmarked ? '★ Saved' : '☆ Save'}</button>
      <button onClick={handleShare} style={{ ...btn, color: shared ? '#10b981' : '#64748b' }}>{shared ? '✓ Copied' : '🔗 Share'}</button>
    </div>
  );
};
export default ArticleActions;
