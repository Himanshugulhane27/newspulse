const axios = require('axios');
const { getSampleArticles, searchSampleArticles } = require('../data/sampleNews');
const { logger } = require('../utils/logger');

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// ── LRU Cache ──────────────────────────────────────────────────────────
// In-memory cache with a maximum size limit and LRU eviction.
// Map preserves insertion order — on read we delete-and-reinsert to
// promote the entry to "most recently used". On write, if the map
// exceeds MAX_CACHE_SIZE we evict the oldest (least recently used) key.

const newsCache = new Map();
const MAX_CACHE_SIZE = 100;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const getCacheKey = (prefix, params) => {
  return `${prefix}:${JSON.stringify(params)}`;
};

const getFromCache = (key) => {
  const cached = newsCache.get(key);
  if (!cached) return null;

  // Promote to most-recently-used (move to end of Map)
  newsCache.delete(key);
  newsCache.set(key, cached);
  return cached;
};

const setCache = (key, data) => {
  // If key already exists, delete it first (will be re-inserted at end)
  if (newsCache.has(key)) {
    newsCache.delete(key);
  }

  // Evict least-recently-used entries if at capacity
  while (newsCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = newsCache.keys().next().value;
    newsCache.delete(oldestKey);
    logger.debug('Cache evicted:', oldestKey);
  }

  newsCache.set(key, { data, timestamp: Date.now() });
};

const isCacheFresh = (cached) => {
  return cached && Date.now() - cached.timestamp < CACHE_TTL;
};

// ── getNews ────────────────────────────────────────────────────────────
const getNews = async (req, res) => {
  try {
    const {
      category = 'general',
      sortBy = 'publishedAt',
      country = 'us',
    } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));

    const params = { category, page, pageSize, sortBy, country };
    const cacheKey = getCacheKey('news', params);
    const cached = getFromCache(cacheKey);

    // If cache is fresh, serve it directly (saves API calls)
    if (isCacheFresh(cached)) {
      logger.debug('Cache HIT (fresh):', cacheKey);
      return res.json(cached.data);
    }

    // Try fetching from NewsAPI
    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
        params: {
          category,
          page,
          pageSize,
          sortBy,
          country,
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      const responseData = {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      };

      setCache(cacheKey, responseData);
      res.json(responseData);
    } catch (apiError) {
      // If API fails but we have stale cache, serve it as fallback
      if (cached) {
        logger.warn('NewsAPI error — serving stale cache for:', cacheKey);
        return res.json(cached.data);
      }

      // No cache – serve sample data as last resort fallback
      logger.warn('NewsAPI unavailable — serving sample data for category:', category);
      const sampleData = getSampleArticles(category, page, pageSize);
      res.json(sampleData);
    }
  } catch (error) {
    logger.error('News API error:', error.message);
    // Even on unexpected errors, serve sample data instead of a 500
    const category = req.query.category || 'general';
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));
    const sampleData = getSampleArticles(category, page, pageSize);
    res.json(sampleData);
  }
};

// ── searchNews ─────────────────────────────────────────────────────────
const searchNews = async (req, res) => {
  try {
    const {
      q,
      sortBy = 'publishedAt',
      from,
      to,
      language = 'en',
    } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const params = { q, page, pageSize, sortBy, from, to, language };
    const cacheKey = getCacheKey('search', params);
    const cached = getFromCache(cacheKey);

    // If cache is fresh, serve it directly
    if (isCacheFresh(cached)) {
      logger.debug('Search cache HIT (fresh):', cacheKey);
      return res.json(cached.data);
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          q,
          page,
          pageSize,
          sortBy,
          from,
          to,
          language,
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      const responseData = {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      };

      setCache(cacheKey, responseData);
      res.json(responseData);
    } catch (apiError) {
      if (cached) {
        logger.warn('NewsAPI search error — serving stale cache for:', cacheKey);
        return res.json(cached.data);
      }
      logger.warn('NewsAPI search unavailable — serving sample search for:', q);
      const sampleData = searchSampleArticles(q, page, pageSize);
      res.json(sampleData);
    }
  } catch (error) {
    logger.error('News search error:', error.message);
    const q = req.query.q || '';
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));
    const sampleData = searchSampleArticles(q, page, pageSize);
    res.json(sampleData);
  }
};

// ── getCategories ──────────────────────────────────────────────────────
const getCategories = (req, res) => {
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'sports', name: 'Sports' },
    { id: 'health', name: 'Health' },
    { id: 'entertainment', name: 'Entertainment' },
  ];

  res.json({ categories });
};

module.exports = { getNews, searchNews, getCategories };