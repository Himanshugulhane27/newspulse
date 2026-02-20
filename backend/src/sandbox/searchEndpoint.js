const express = require('express');
const router = express.Router();
// search endpoint prototype - would connect to NewsAPI search later
router.get('/search', (req, res) => {
  const { q, category, from, to, sortBy = 'relevancy' } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }
  // mock search results
  const mockResults = [
    { title: `Result about "${q}" in ${category || 'all'} categories`, source: 'Mock Source', publishedAt: new Date().toISOString() },
    { title: `Another article matching "${q}"`, source: 'Test Source', publishedAt: new Date().toISOString() },
  ];
  res.json({
    query: q,
    totalResults: mockResults.length,
    articles: mockResults,
    filters: { category, from, to, sortBy }
  });
});
module.exports = router;
