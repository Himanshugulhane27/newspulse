// simple in-memory rate limiter experiment
// might use this instead of express-rate-limit for more control
class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    if (!this.clients.has(clientId)) {
      this.clients.set(clientId, { count: 1, windowStart: now });
      return true;
    }
    const client = this.clients.get(clientId);
    if (now - client.windowStart > this.windowMs) {
      client.count = 1;
      client.windowStart = now;
      return true;
    }
    if (client.count >= this.maxRequests) return false;
    client.count++;
    return true;
  }

  // cleanup old entries periodically
  cleanup() {
    const now = Date.now();
    for (const [id, data] of this.clients) {
      if (now - data.windowStart > this.windowMs * 2) {
        this.clients.delete(id);
      }
    }
  }
}

module.exports = RateLimiter;
