import React from 'react';
const SplitCardLayout = ({ title, source, imageUrl, description, time }) => {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '240px 1fr', gap: '16px', padding: '16px',
      backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155',
      marginBottom: '14px', cursor: 'pointer', transition: 'border-color 0.2s ease'
    }}>
      {imageUrl ? (
        <img src={imageUrl} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}/>
      ) : (
        <div style={{ width: '100%', height: '140px', borderRadius: '8px', backgroundColor: '#334155',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '28px' }}>📰</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.4 }}>
            {title || 'Article headline goes here'}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
            {description?.substring(0, 120) || 'Short description...'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 500 }}>{source || 'Source'}</span>
          <span style={{ color: '#475569', fontSize: '11px' }}>{time || '3h ago'}</span>
        </div>
      </div>
    </div>
  );
};
export default SplitCardLayout;
