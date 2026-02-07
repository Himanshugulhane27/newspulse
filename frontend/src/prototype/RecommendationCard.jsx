import React from 'react';

// prototype for "recommended for you" section
// based on reading history - just mock data for now
const RecommendationCard = ({ article, reason }) => {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      border: '1px solid #334155',
      marginBottom: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: '#f59e0b' }}>✨ Recommended</span>
        {reason && (
          <span style={{ fontSize: '10px', color: '#64748b' }}>• {reason}</span>
        )}
      </div>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 6px 0' }}>
        {article?.title || 'Article Title'}
      </h4>
      <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
        {article?.source || 'Source'} • {article?.time || '2h ago'}
      </p>
    </div>
  );
};

export default RecommendationCard;
