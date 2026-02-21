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
