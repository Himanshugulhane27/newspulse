// simple in-memory cache for API responses
// reduce NewsAPI calls by caching for a few minutes
class SimpleCache {
  constructor(ttlMs = 5 * 60 * 1000) {
    this.cache = new Map();
    this.ttl = ttlMs;
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  set(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
  clear() { this.cache.clear(); }
  size() { return this.cache.size; }
  // cleanup expired entries
  prune() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > this.ttl) this.cache.delete(key);
    }
  }
}
module.exports = SimpleCache;
