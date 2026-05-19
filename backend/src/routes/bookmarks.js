const express = require('express');
const { body, query, param } = require('express-validator');
const { createBookmark, getBookmarks, deleteBookmark, checkBookmark } = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

const router = express.Router();

// All bookmark routes require authentication
router.use(auth);

// Create bookmark
router.post(
  '/',
  [
    body('article.title')
      .trim()
      .notEmpty()
      .withMessage('Article title is required'),
    body('article.url')
      .trim()
      .isURL()
      .withMessage('A valid article URL is required'),
    body('article.publishedAt')
      .optional()
      .isISO8601()
      .withMessage('publishedAt must be a valid ISO 8601 date'),
  ],
  createBookmark
);

// Get user bookmarks
router.get(
  '/',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('page must be a positive integer'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('pageSize must be between 1 and 50'),
    query('category')
      .optional()
      .isString()
      .trim(),
  ],
  getBookmarks
);

// Check if article is bookmarked
router.get(
  '/check',
  [
    query('url')
      .notEmpty()
      .withMessage('URL query parameter is required')
      .isURL()
      .withMessage('url must be a valid URL'),
  ],
  checkBookmark
);

// Delete bookmark
router.delete('/:id', deleteBookmark);

module.exports = router;