// improved news cache with category-based TTL
// hot categories get shorter TTL for freshness
const categoryTTL = {
  general: 3 * 60 * 1000,     // 3 min
  technology: 5 * 60 * 1000,   // 5 min
  business: 2 * 60 * 1000,     // 2 min - markets move fast
  science: 15 * 60 * 1000,     // 15 min
  health: 10 * 60 * 1000,      // 10 min
  sports: 2 * 60 * 1000,       // 2 min - live scores
  entertainment: 10 * 60 * 1000 // 10 min
};

class NewsCache {
  constructor() {
    this.store = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  getCacheKey(category, country, page) {
    return `${category}:${country}:${page}`;
  }

  get(category, country, page) {
    const key = this.getCacheKey(category, country, page);
    const entry = this.store.get(key);
    if (!entry) { this.misses++; return null; }
    const ttl = categoryTTL[category] || 5 * 60 * 1000;
    if (Date.now() - entry.timestamp > ttl) {
      this.store.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return entry.data;
  }

  set(category, country, page, data) {
    const key = this.getCacheKey(category, country, page);
    this.store.set(key, { data, timestamp: Date.now() });
  }

  getStats() {
    return {
      entries: this.store.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits + this.misses > 0
        ? `${Math.round(this.hits / (this.hits + this.misses) * 100)}%`
        : 'N/A'
    };
  }

  flush() { this.store.clear(); this.hits = 0; this.misses = 0; }
}

module.exports = NewsCache;
