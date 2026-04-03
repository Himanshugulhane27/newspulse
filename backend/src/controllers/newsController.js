const axios = require('axios');

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

const getNews = async (req, res) => {
  try {
    const { 
      category = 'general', 
      sortBy = 'publishedAt',
      country = 'us'
    } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 20));

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

    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to fetch news',
      error: error.response?.data?.message || 'News service unavailable'
    });
  }
};

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

    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });
  } catch (error) {
    console.error('News search error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to search news',
      error: error.response?.data?.message || 'News service unavailable'
    });
  }
};

const getCategories = (req, res) => {
  const categories = [
    { id: 'general', name: 'General', icon: '📰' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ];
  
  res.json({ categories });
};

module.exports = { getNews, searchNews, getCategories };