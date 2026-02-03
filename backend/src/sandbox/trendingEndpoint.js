const express = require('express');
const router = express.Router();

// dummy trending endpoint - just returns hardcoded popular topics
// TODO: hook this up to actual frequency analysis later
router.get('/trending', (req, res) => {
  const trendingTopics = [
    { topic: 'AI Regulation', mentions: 142, trend: 'up' },
    { topic: 'Climate Summit', mentions: 98, trend: 'up' },
    { topic: 'Stock Market', mentions: 87, trend: 'down' },
    { topic: 'Space Exploration', mentions: 76, trend: 'stable' },
    { topic: 'Cryptocurrency', mentions: 65, trend: 'down' },
    { topic: 'Election Updates', mentions: 54, trend: 'up' },
  ];

  // simulate some delay like a real db query
  setTimeout(() => {
    res.json({
      success: true,
      data: trendingTopics,
      generatedAt: new Date().toISOString()
    });
  }, 200);
});

module.exports = router;
