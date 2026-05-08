import React from 'react';
const GlassCard = ({ children, padding = '20px', blur = 12 }) => (
  <div style={{
    padding, borderRadius: '16px',
    background: 'rgba(30, 41, 59, 0.6)',
    backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`,
    border: '1px solid rgba(148, 163, 184, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  }}>{children}</div>
);
export default GlassCard;
