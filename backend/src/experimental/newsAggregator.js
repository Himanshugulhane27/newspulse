// experiment: aggregate from multiple sources
// combine NewsAPI with other potential sources
const aggregateSources = async (sources) => {
  const results = [];
  for (const source of sources) {
    try {
      // mock - would actually fetch from each source
      results.push({
        source: source.name,
        articles: [],
        fetchedAt: new Date().toISOString(),
        status: 'ok'
      });
    } catch (err) {
      results.push({
        source: source.name,
        articles: [],
        fetchedAt: new Date().toISOString(),
        status: 'error',
        error: err.message
      });
    }
  }
  return results;
};

// deduplicate articles from different sources by title similarity
const deduplicateArticles = (articles) => {
  const seen = new Set();
  return articles.filter(article => {
    const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

module.exports = { aggregateSources, deduplicateArticles };
