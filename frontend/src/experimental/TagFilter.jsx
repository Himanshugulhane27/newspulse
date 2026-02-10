import React, { useState } from 'react';
// tag-based filter for articles - like chips
const TagFilter = ({ tags = [], onTagSelect }) => {
  const [selected, setSelected] = useState([]);
  const defaultTags = tags.length > 0 ? tags : [
    'Breaking', 'Opinion', 'Analysis', 'Feature', 'Live', 'Exclusive', 'Update'
  ];
  const toggle = (tag) => {
    const next = selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag];
    setSelected(next);
    onTagSelect?.(next);
  };
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '8px 0' }}>
      {defaultTags.map(tag => (
        <button key={tag} onClick={() => toggle(tag)} style={{
          padding: '4px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer',
          border: selected.includes(tag) ? '1px solid #3b82f6' : '1px solid #334155',
          backgroundColor: selected.includes(tag) ? 'rgba(59,130,246,0.2)' : 'transparent',
          color: selected.includes(tag) ? '#60a5fa' : '#94a3b8',
          transition: 'all 0.2s ease'
        }}>
          {tag}
        </button>
      ))}
    </div>
  );
};
export default TagFilter;
