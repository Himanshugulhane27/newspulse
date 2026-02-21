import React from 'react';
// old dashboard layout before the redesign
// keeping for reference - had a 3 column grid
const OldDashboardLayout = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
    <aside style={{ borderRight: '1px solid #1e293b', padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', fontSize: '14px' }}>Categories</h3>
    </aside>
    <main style={{ padding: '20px' }}>
      <h2 style={{ color: '#f1f5f9' }}>News Feed</h2>
    </main>
    <aside style={{ borderLeft: '1px solid #1e293b', padding: '20px' }}>
      <h3 style={{ color: '#f1f5f9', fontSize: '14px' }}>Trending</h3>
    </aside>
  </div>
);
export default OldDashboardLayout;
