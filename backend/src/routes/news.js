const express = require('express');
const { query } = require('express-validator');
const { getNews, searchNews, getCategories } = require('../controllers/newsController');

const router = express.Router();

const VALID_CATEGORIES = ['general', 'technology', 'business', 'sports', 'health', 'entertainment'];

// Get news by category
router.get(
  '/',
  [
    query('category')
      .optional()
      .isIn(VALID_CATEGORIES)
      .withMessage(`category must be one of: ${VALID_CATEGORIES.join(', ')}`),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('page must be a positive integer'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('pageSize must be between 1 and 50'),
    query('sortBy')
      .optional()
      .isIn(['publishedAt', 'relevancy', 'popularity'])
      .withMessage('sortBy must be publishedAt, relevancy, or popularity'),
  ],
  getNews
);

// Search news
router.get(
  '/search',
  [
    query('q')
      .notEmpty()
      .withMessage('Search query (q) is required')
      .isLength({ min: 1, max: 200 })
      .withMessage('Search query must be 1–200 characters'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('page must be a positive integer'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('pageSize must be between 1 and 50'),
  ],
  searchNews
);

// Get available categories
router.get('/categories', getCategories);

module.exports = router;