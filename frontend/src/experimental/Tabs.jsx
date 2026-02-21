import React, { useState } from 'react';
// reusable tab component
const Tabs = ({ tabs = [], defaultTab = 0, onChange }) => {
  const [active, setActive] = useState(defaultTab);
  const handleChange = (idx) => {
    setActive(idx);
    onChange?.(idx, tabs[idx]);
  };
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '16px' }}>
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => handleChange(i)} style={{
            padding: '10px 20px', border: 'none', backgroundColor: 'transparent',
            color: active === i ? '#3b82f6' : '#64748b', cursor: 'pointer',
            borderBottom: active === i ? '2px solid #3b82f6' : '2px solid transparent',
            fontSize: '13px', fontWeight: active === i ? 600 : 400,
            transition: 'all 0.2s ease'
          }}>
            {tab.label || tab}
          </button>
        ))}
      </div>
      {tabs[active]?.content && <div>{tabs[active].content}</div>}
    </div>
  );
};
export default Tabs;
