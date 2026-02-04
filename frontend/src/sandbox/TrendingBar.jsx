import React, { useState, useEffect } from 'react';

// rough trending bar - shows top topics horizontally
// not connected to real data yet
const TrendingBar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // fake data for now
    setTopics([
      { name: 'Technology', count: 45 },
      { name: 'Politics', count: 38 },
      { name: 'Sports', count: 31 },
      { name: 'Science', count: 27 },
      { name: 'Health', count: 22 },
    ]);
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '10px 16px',
      overflowX: 'auto',
      backgroundColor: '#1e293b',
      borderRadius: '8px'
    }}>
      <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
        🔥 Trending:
      </span>
      {topics.map((t, i) => (
        <span key={i} style={{
          color: '#e2e8f0',
          fontSize: '12px',
          padding: '2px 10px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          whiteSpace: 'nowrap',
          cursor: 'pointer'
        }}>
          {t.name} ({t.count})
        </span>
      ))}
    </div>
  );
};

export default TrendingBar;
