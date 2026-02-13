import React, { useState } from 'react';
// advanced filter panel - date range, source, sort
const FilterPanel = ({ onApply }) => {
  const [filters, setFilters] = useState({ dateFrom: '', dateTo: '', source: 'all', sortBy: 'newest' });
  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  return (
    <div style={{
      padding: '16px', backgroundColor: '#1e293b', borderRadius: '10px',
      border: '1px solid #334155', marginBottom: '16px'
    }}>
      <h4 style={{ color: '#f1f5f9', fontSize: '14px', margin: '0 0 12px 0' }}>Filters</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>From</label>
          <input type="date" value={filters.dateFrom} onChange={e => update('dateFrom', e.target.value)}
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}/>
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>To</label>
          <input type="date" value={filters.dateTo} onChange={e => update('dateTo', e.target.value)}
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}/>
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Sort by</label>
        <select value={filters.sortBy} onChange={e => update('sortBy', e.target.value)}
          style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#e2e8f0', fontSize: '12px' }}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="popular">Most popular</option>
        </select>
      </div>
      <button onClick={() => onApply?.(filters)} style={{
        marginTop: '12px', width: '100%', padding: '8px', backgroundColor: '#3b82f6',
        color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
      }}>Apply Filters</button>
    </div>
  );
};
export default FilterPanel;
