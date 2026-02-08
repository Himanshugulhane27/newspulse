import React from 'react';
// custom skeleton loader - different from the existing LoadingSkeleton
// this one has a shimmer animation
const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;
const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', count = 1 }) => {
  return (
    <>
      <style>{shimmerStyle}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width, height, borderRadius,
          background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          marginBottom: count > 1 ? '8px' : 0
        }}/>
      ))}
    </>
  );
};
export default SkeletonLoader;
