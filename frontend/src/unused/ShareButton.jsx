import React, { useState } from 'react';
// share button with copy link - tried it but design doesnt fit
const ShareButton = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={handleShare} style={{
      padding: '4px 10px', fontSize: '12px', border: '1px solid #334155',
      borderRadius: '6px', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer'
    }}>
      {copied ? '✓ Copied!' : '🔗 Share'}
    </button>
  );
};
export default ShareButton;
