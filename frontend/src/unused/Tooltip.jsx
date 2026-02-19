import React, { useState } from 'react';
// simple tooltip component
const Tooltip = ({ text, children, position = 'top' }) => {
  const [show, setShow] = useState(false);
  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '6px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '6px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '6px' },
  };
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', ...positions[position],
          padding: '4px 10px', backgroundColor: '#334155', color: '#f1f5f9',
          fontSize: '11px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 50,
          pointerEvents: 'none'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
