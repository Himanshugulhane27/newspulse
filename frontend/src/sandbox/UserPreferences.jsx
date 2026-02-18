import React, { useState } from 'react';
// user preferences page prototype
const UserPreferences = () => {
  const [prefs, setPrefs] = useState({
    categories: ['technology', 'science'],
    darkMode: true,
    notifications: false,
    language: 'en',
    articlesPerPage: 20
  });
  const categories = ['technology', 'business', 'science', 'health', 'sports', 'entertainment', 'politics'];
  const toggleCat = (cat) => {
    setPrefs(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };
  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>Preferences</h2>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '10px' }}>Favorite Categories</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => toggleCat(cat)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
              textTransform: 'capitalize', border: 'none',
              backgroundColor: prefs.categories.includes(cat) ? '#3b82f6' : '#334155',
              color: prefs.categories.includes(cat) ? '#fff' : '#94a3b8'
            }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e2e8f0', fontSize: '14px' }}>Articles per page</span>
        <select value={prefs.articlesPerPage} onChange={e => setPrefs(prev => ({ ...prev, articlesPerPage: +e.target.value }))}
          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#e2e8f0', fontSize: '13px' }}>
          {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
};
export default UserPreferences;
