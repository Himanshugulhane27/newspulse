const sourceReliability = { 'reuters': 0.95, 'bbc-news': 0.93, 'techcrunch': 0.88, 'cnn': 0.85, 'ndtv': 0.83, 'espn': 0.90, 'bloomberg': 0.92 };
const hotKeywords = ['breaking', 'exclusive', 'urgent', 'live', 'just in', 'developing'];
function scoreArticle(article) {
  let score = 50;
  const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / 3600000;
  if (hoursAgo < 1) score += 30; else if (hoursAgo < 3) score += 25; else if (hoursAgo < 6) score += 20;
  else if (hoursAgo < 12) score += 10; else if (hoursAgo < 24) score += 5;
  const sourceId = article.source?.id?.toLowerCase() || '';
  score += Math.round((sourceReliability[sourceId] || 0.7) * 15);
  const titleLower = (article.title || '').toLowerCase();
  score += Math.min(hotKeywords.filter(kw => titleLower.includes(kw)).length * 5, 10);
  if (article.urlToImage) score += 3;
  return Math.min(score, 100);
}
function rankArticles(articles) {
  return articles.map(a => ({ ...a, _score: scoreArticle(a) })).sort((a, b) => b._score - a._score);
}
module.exports = { scoreArticle, rankArticles };
