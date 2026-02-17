import React from 'react';
// two column layout - main feed + sidebar
// testing if this works better than full-width
const TwoColumnLayout = ({ mainContent, sideContent }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px',
    maxWidth: '1200px', margin: '0 auto', padding: '20px'
  }}>
    <main>{mainContent || <p style={{ color: '#64748b' }}>Main content goes here</p>}</main>
    <aside style={{
      position: 'sticky', top: '20px', alignSelf: 'start'
    }}>
      {sideContent || (
        <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', margin: '0 0 12px 0' }}>Trending</h3>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Sidebar content</p>
        </div>
      )}
    </aside>
  </div>
);
export default TwoColumnLayout;
