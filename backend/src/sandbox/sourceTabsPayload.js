const express = require('express');
const router = express.Router();
router.get('/sources/grouped', (req, res) => {
  const grouped = {
    'BBC News': { count: 12, latest: '2026-05-03T08:00:00Z', categories: ['general', 'politics'],
      articles: [{ title: 'World leaders meet for summit talks', publishedAt: '2026-05-03T08:00:00Z' }] },
    'TechCrunch': { count: 8, latest: '2026-05-03T09:15:00Z', categories: ['technology'],
      articles: [{ title: 'New AI chip promises 3x performance', publishedAt: '2026-05-03T09:15:00Z' }] },
    'ESPN': { count: 6, latest: '2026-05-03T10:00:00Z', categories: ['sports'],
      articles: [{ title: 'Championship finals set for weekend', publishedAt: '2026-05-03T10:00:00Z' }] }
  };
  res.json({ success: true, data: grouped, generatedAt: new Date().toISOString() });
});
module.exports = router;
