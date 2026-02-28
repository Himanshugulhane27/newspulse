import React from 'react';
// alternative loading spinner - tried a dots animation
// sticking with the skeleton loader for now
const spinnerStyle = `
@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
`;
const LoadingSpinner = ({ color = '#3b82f6', size = 'medium' }) => {
  const dotSize = size === 'small' ? 6 : size === 'large' ? 12 : 8;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '20px' }}>
      <style>{spinnerStyle}</style>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: dotSize, height: dotSize, borderRadius: '50%',
          backgroundColor: color,
          animation: `dot-bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
        }}/>
      ))}
    </div>
  );
};
export default LoadingSpinner;
