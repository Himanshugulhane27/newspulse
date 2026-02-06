import React from 'react';

// calculate estimated reading time for articles
// probably wont use this since we only show snippets
const ReadingTime = ({ text, wordsPerMinute = 200 }) => {
  if (!text) return null;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return (
    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
      📖 {minutes} min read
    </span>
  );
};

export default ReadingTime;
