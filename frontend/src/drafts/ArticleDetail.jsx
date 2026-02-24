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
