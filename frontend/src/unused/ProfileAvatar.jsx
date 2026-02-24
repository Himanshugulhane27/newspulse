import React from 'react';
// user profile avatar with initials fallback
const ProfileAvatar = ({ name, imageUrl, size = 36 }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const bgColor = colors[name ? name.charCodeAt(0) % colors.length : 0];
  if (imageUrl) {
    return <img src={imageUrl} alt={name} style={{
      width: size, height: size, borderRadius: '50%', objectFit: 'cover'
    }}/>;
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', backgroundColor: bgColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.38, fontWeight: 600
    }}>
      {initials}
    </div>
  );
};
export default ProfileAvatar;
