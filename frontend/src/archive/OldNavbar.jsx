import React from 'react';

// old navbar design - moved here after redesign
// keeping for reference only
// NOTE: this component is NOT used anywhere in the active app

const OldNavbar = ({ user }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#1a1a2e',
      borderBottom: '2px solid #16213e'
    }}>
      <h1 style={{ color: '#e94560', fontSize: '20px', margin: 0 }}>
        NewsPulse
      </h1>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search news..."
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontSize: '13px',
            width: '200px'
          }}
        />
        {user && (
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>
            {user.name}
          </span>
        )}
      </div>
    </header>
  );
};

export default OldNavbar;
