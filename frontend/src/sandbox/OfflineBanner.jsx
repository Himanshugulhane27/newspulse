import React from 'react';
// shows when user loses internet connection
const OfflineBanner = ({ isOnline = true }) => {
  if (isOnline) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px',
      backgroundColor: '#ef4444', color: '#fff', textAlign: 'center',
      fontSize: '13px', fontWeight: 500, zIndex: 9999
    }}>
      ⚠️ You're offline. Some features may not work.
    </div>
  );
};
export default OfflineBanner;
