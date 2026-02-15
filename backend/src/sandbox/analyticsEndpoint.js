const express = require('express');
const router = express.Router();
// dummy analytics endpoint - returns fake usage stats
router.get('/analytics/overview', (req, res) => {
  res.json({
    totalUsers: 342,
    activeToday: 56,
    articlesRead: 1893,
    topCategories: [
      { name: 'Technology', count: 456 },
      { name: 'Business', count: 389 },
      { name: 'Science', count: 267 },
      { name: 'Sports', count: 198 },
    ],
    peakHour: '18:00',
    avgSessionTime: '4m 32s'
  });
});
router.get('/analytics/daily', (req, res) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 100) + 20,
      articles: Math.floor(Math.random() * 500) + 100
    };
  });
  res.json({ data: days.reverse() });
});
module.exports = router;
