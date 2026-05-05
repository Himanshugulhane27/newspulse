import React, { useState } from 'react';
const SourceTabs = ({ sources, onSourceChange }) => {
  const [active, setActive] = useState('all');
  const defaultSources = sources || [
    { id: 'all', label: 'All Sources' }, { id: 'bbc', label: 'BBC' },
    { id: 'cnn', label: 'CNN' }, { id: 'reuters', label: 'Reuters' },
    { id: 'techcrunch', label: 'TechCrunch' }, { id: 'ndtv', label: 'NDTV' },
  ];
  const handleClick = (id) => { setActive(id); onSourceChange?.(id); };
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '8px', backgroundColor: '#0f172a', borderRadius: '10px', overflowX: 'auto' }}>
      {defaultSources.map(src => (
        <button key={src.id} onClick={() => handleClick(src.id)} style={{
          padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 500,
          cursor: 'pointer', whiteSpace: 'nowrap',
          backgroundColor: active === src.id ? '#3b82f6' : 'transparent',
          color: active === src.id ? '#fff' : '#94a3b8', transition: 'all 0.15s ease'
        }}>{src.label}</button>
      ))}
    </div>
  );
};
export default SourceTabs;
