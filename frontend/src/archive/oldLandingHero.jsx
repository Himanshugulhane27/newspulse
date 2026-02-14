import React from 'react';
// old landing page hero section - replaced with current design
// archiving in case we want the gradient back
const OldLandingHero = () => (
  <section style={{
    minHeight: '60vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '40px 20px'
  }}>
    <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#f8fafc', marginBottom: '16px' }}>
      Stay <span style={{ color: '#3b82f6' }}>Informed</span>, Stay Ahead
    </h1>
    <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', lineHeight: 1.6 }}>
      Your personalized real-time news aggregator. Get the latest headlines from trusted sources worldwide.
    </p>
    <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
      <button style={{ padding: '12px 28px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
        Get Started
      </button>
      <button style={{ padding: '12px 28px', backgroundColor: 'transparent', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
        Learn More
      </button>
    </div>
  </section>
);
export default OldLandingHero;
