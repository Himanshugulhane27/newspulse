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
