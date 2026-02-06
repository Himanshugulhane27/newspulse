import React, { useState } from 'react';

// standalone dark mode toggle for testing
// the app already has theming via ThemeContext but i wanted
// to try a different animation approach
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        width: '56px',
        height: '28px',
        borderRadius: '14px',
        border: 'none',
        backgroundColor: isDark ? '#3b82f6' : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        padding: 0
      }}
    >
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '3px',
        left: isDark ? '31px' : '3px',
        transition: 'left 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px'
      }}>
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
};

export default DarkModeToggle;
