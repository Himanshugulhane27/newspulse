// very rough recommendation prototype
// idea: track which categories user reads most,
// then weight results towards those categories

class SimpleRecommender {
  constructor() {
    // in-memory store for now - would use redis or db later
    this.userPreferences = new Map();
  }

  trackRead(userId, category) {
    if (!this.userPreferences.has(userId)) {
      this.userPreferences.set(userId, {});
    }
    const prefs = this.userPreferences.get(userId);
    prefs[category] = (prefs[category] || 0) + 1;
  }

  getTopCategories(userId, limit = 3) {
    const prefs = this.userPreferences.get(userId) || {};
    return Object.entries(prefs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([cat]) => cat);
  }

  // score articles based on user preference
  scoreArticles(userId, articles) {
    const topCats = this.getTopCategories(userId);
    return articles.map(article => ({
      ...article,
      relevanceScore: topCats.includes(article.category) ? 1.0 : 0.5,
      isRecommended: topCats.includes(article.category)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

module.exports = SimpleRecommender;
