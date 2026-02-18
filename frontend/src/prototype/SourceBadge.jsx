import React from 'react';
// colored badge showing article source
const sourceColors = {
  'BBC News': '#bb1919',
  'CNN': '#cc0000',
  'TechCrunch': '#0a9e01',
  'Reuters': '#ff8000',
  'The Hindu': '#003366',
  'NDTV': '#e02020',
  'Al Jazeera': '#d2a019',
};
const SourceBadge = ({ source }) => {
  const color = sourceColors[source] || '#64748b';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
      fontSize: '10px', fontWeight: 600, color: '#fff',
      backgroundColor: color, letterSpacing: '0.3px'
    }}>
      {source}
    </span>
  );
};
export default SourceBadge;
