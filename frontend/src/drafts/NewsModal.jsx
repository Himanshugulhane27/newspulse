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
