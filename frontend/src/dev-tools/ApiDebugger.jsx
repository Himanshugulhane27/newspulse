import React, { useState } from 'react';
// dev tool to test API endpoints quickly
// only for development, should never be in prod bundle
const ApiDebugger = () => {
  const [endpoint, setEndpoint] = useState('/api/news');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const testEndpoint = async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (err) {
      setResponse({ error: err.message });
    }
    setLoading(false);
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <h3 style={{ color: '#f59e0b' }}>🔧 API Debugger</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input value={endpoint} onChange={e => setEndpoint(e.target.value)}
          style={{ flex: 1, padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#e2e8f0' }}/>
        <button onClick={testEndpoint} disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
      {response && (
        <pre style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '12px', maxHeight: '400px' }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};
export default ApiDebugger;
