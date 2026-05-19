const { validationResult } = require('express-validator');
const Bookmark = require('../models/Bookmark');
const { logger } = require('../utils/logger');

const createBookmark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { article } = req.body;

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      userId: req.user._id,
      'article.url': article.url,
    }).lean();

    if (existingBookmark) {
      return res.status(400).json({ message: 'Article already bookmarked' });
    }

    const bookmark = new Bookmark({
      userId: req.user._id,
      article: {
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source,
        category: article.category,
        content: article.content,
      },
    });

    await bookmark.save();

    res.status(201).json({
      message: 'Article bookmarked successfully',
      bookmark,
    });
  } catch (error) {
    logger.error('Create bookmark error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page = 1, pageSize = 20, category } = req.query;

    const query = { userId: req.user._id };
    if (category && category !== 'all') {
      query['article.category'] = category;
    }

    // .lean() returns plain JS objects — ~5x faster for read-only responses
    const bookmarks = await Bookmark.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize * 1)
      .skip((page - 1) * pageSize)
      .lean();

    const total = await Bookmark.countDocuments(query);

    res.json({
      bookmarks,
      totalResults: total,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    logger.error('Get bookmarks error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    logger.error('Delete bookmark error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const checkBookmark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url } = req.query;

    // .lean() for read-only check
    const bookmark = await Bookmark.findOne({
      userId: req.user._id,
      'article.url': url,
    }).lean();

    res.json({ isBookmarked: !!bookmark, bookmarkId: bookmark?._id });
  } catch (error) {
    logger.error('Check bookmark error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBookmark, getBookmarks, deleteBookmark, checkBookmark };