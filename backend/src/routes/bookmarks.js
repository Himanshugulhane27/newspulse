const express = require('express');
const { createBookmark, getBookmarks, deleteBookmark, checkBookmark } = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

const router = express.Router();

// All bookmark routes require authentication
router.use(auth);

// Create bookmark
router.post('/', createBookmark);

// Get user bookmarks
router.get('/', getBookmarks);

// Check if article is bookmarked
router.get('/check', checkBookmark);

// Delete bookmark
router.delete('/:id', deleteBookmark);

module.exports = router;