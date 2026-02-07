import React from 'react';

// breadcrumb nav - tested it but doesn't fit the current design
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav style={{ padding: '8px 0', fontSize: '13px' }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ color: '#94a3b8', margin: '0 6px' }}>/</span>}
          {item.href ? (
            <a href={item.href} style={{ color: '#3b82f6', textDecoration: 'none' }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: '#64748b' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
