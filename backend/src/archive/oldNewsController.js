// archived version of news controller before refactor
// keeping this for reference
// const axios = require('axios');
// const NEWS_API_KEY = process.env.NEWS_API_KEY;
// const BASE_URL = 'https://newsapi.org/v2';
//
// exports.getNews = async (req, res) => {
//   try {
//     const { category = 'general', page = 1 } = req.query;
//     const response = await axios.get(`${BASE_URL}/top-headlines`, {
//       params: {
//         country: 'us',
//         category,
//         page,
//         pageSize: 20,
//         apiKey: NEWS_API_KEY
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('NewsAPI error:', error.message);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// };
//
// Note: refactored to support multiple countries and better error handling
module.exports = {};
