const express = require('express');
const router = express.Router();
router.get('/bookmarks/stats', (req, res) => {
  res.json({ success: true, data: {
    totalBookmarks: 47, thisWeek: 8,
    topCategories: [
      { category: 'technology', count: 18, percentage: 38 },
      { category: 'science', count: 12, percentage: 26 },
      { category: 'business', count: 9, percentage: 19 },
    ],
    topSources: [{ source: 'TechCrunch', count: 11 }, { source: 'BBC News', count: 8 }],
    readRate: '72%', avgBookmarksPerDay: 1.8
  }});
});
module.exports = router;
