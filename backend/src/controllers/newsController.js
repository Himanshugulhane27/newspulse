const axios = require('axios');
const { getSampleArticles, searchSampleArticles } = require('../data/sampleNews');

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// ── In-memory cache ────────────────────────────────────────────────────
// Stores { data, timestamp } keyed by a stringified params object.
// TTL = 30 minutes – keeps responses alive long enough to survive rate limits.
const newsCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const getCacheKey = (prefix, params) => {
  return `${prefix}:${JSON.stringify(params)}`;
};

const getFromCache = (key) => {
  const cached = newsCache.get(key);
  if (!cached) return null;
  // Return cached data even if stale (fallback for rate limits)
  return cached;
};

const setCache = (key, data) => {
  newsCache.set(key, { data, timestamp: Date.now() });
};

const isCacheFresh = (cached) => {
  return cached && (Date.now() - cached.timestamp) < CACHE_TTL;
};

// ── getNews ────────────────────────────────────────────────────────────
const getNews = async (req, res) => {
  try {
    const { 
      category = 'general', 
      sortBy = 'publishedAt',
      country = 'us'
    } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));

    const params = { category, page, pageSize, sortBy, country };
    const cacheKey = getCacheKey('news', params);
    const cached = getFromCache(cacheKey);

    // If cache is fresh, serve it directly (saves API calls)
    if (isCacheFresh(cached)) {
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
          apiKey: process.env.NEWS_API_KEY
        }
      });

      const responseData = {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      };

      // Cache the successful response
      setCache(cacheKey, responseData);

      res.json(responseData);
    } catch (apiError) {
      // If API fails but we have stale cache, serve it as fallback
      if (cached) {
        console.log('NewsAPI error – serving stale cache for:', cacheKey);
        return res.json(cached.data);
      }

      // No cache – serve sample data as last resort fallback
      console.log('NewsAPI unavailable – serving sample data for category:', category);
      const sampleData = getSampleArticles(category, page, pageSize);
      res.json(sampleData);
    }
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
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
      language = 'en'
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
          apiKey: process.env.NEWS_API_KEY
        }
      });

      const responseData = {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      };

      setCache(cacheKey, responseData);

      res.json(responseData);
    } catch (apiError) {
      if (cached) {
        console.log('NewsAPI search error – serving stale cache for:', cacheKey);
        return res.json(cached.data);
      }
      // No cache – serve sample search results as fallback
      console.log('NewsAPI search unavailable – serving sample search for:', q);
      const sampleData = searchSampleArticles(q, page, pageSize);
      res.json(sampleData);
    }
  } catch (error) {
    console.error('News search error:', error.response?.data || error.message);
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
    { id: 'entertainment', name: 'Entertainment' }
  ];
  
  res.json({ categories });
};

module.exports = { getNews, searchNews, getCategories };