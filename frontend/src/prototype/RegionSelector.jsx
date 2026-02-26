import React, { useState } from 'react';
// region/country selector for localized news
const RegionSelector = ({ regions, onSelect }) => {
  const [selected, setSelected] = useState('in');
  const defaultRegions = regions || [
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
  ];
  const handleSelect = (code) => {
    setSelected(code);
    onSelect?.(code);
  };
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
      {defaultRegions.map(r => (
        <button key={r.code} onClick={() => handleSelect(r.code)} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
          border: selected === r.code ? '1px solid #3b82f6' : '1px solid #334155',
          backgroundColor: selected === r.code ? 'rgba(59,130,246,0.15)' : 'transparent',
          color: selected === r.code ? '#60a5fa' : '#94a3b8', cursor: 'pointer'
        }}>
          <span>{r.flag}</span> {r.name}
        </button>
      ))}
    </div>
  );
};
export default RegionSelector;
