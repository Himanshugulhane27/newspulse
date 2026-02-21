import React from 'react';

// back to top button that shows after scrolling down
// floats in bottom-right corner
const BackToTop = ({ showAfter = 300 }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(59,130,246,0.4)',
        transition: 'opacity 0.3s ease',
        zIndex: 40
      }}
    >
      ↑
    </button>
  );
};

export default BackToTop;
