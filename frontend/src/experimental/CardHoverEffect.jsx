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
