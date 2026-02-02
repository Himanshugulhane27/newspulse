import React from 'react';

// experimenting with a horizontal card layout for news items
const AltCardLayout = ({ title, source, imageUrl, description }) => {
  return (
    <div className="alt-card-horizontal" style={{
      display: 'flex',
      gap: '1rem',
      padding: '12px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      marginBottom: '10px'
    }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
        />
      )}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>{source}</p>
        <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
          {description?.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};

export default AltCardLayout;
