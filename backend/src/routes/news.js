const express = require('express');
const { getNews, searchNews, getCategories } = require('../controllers/newsController');

const router = express.Router();

// Get news by category
router.get('/', getNews);

// Search news
router.get('/search', searchNews);

// Get available categories
router.get('/categories', getCategories);

module.exports = router;