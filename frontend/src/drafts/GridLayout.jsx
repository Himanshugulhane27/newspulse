import React from 'react';

// trying a pinterest-style masonry grid for news cards
const GridLayout = ({ children, columns = 3, gap = 16 }) => {
  return (
    <div style={{
      columnCount: columns,
      columnGap: `${gap}px`,
      padding: '16px'
    }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{
          breakInside: 'avoid',
          marginBottom: `${gap}px`
        }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
