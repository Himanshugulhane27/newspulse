class ApiUsageTracker {
  constructor(dailyLimit = 100) { this.dailyLimit = dailyLimit; this.requests = []; }
  recordRequest() { this.requests.push(Date.now()); this._clean(); }
  getTodayCount() { this._clean(); return this.requests.length; }
  getRemainingQuota() { return Math.max(0, this.dailyLimit - this.getTodayCount()); }
  canMakeRequest() { return this.getRemainingQuota() > 0; }
  getStats() { const c = this.getTodayCount(); return { used: c, remaining: this.dailyLimit - c, limit: this.dailyLimit, percentage: Math.round((c / this.dailyLimit) * 100), canRequest: this.canMakeRequest() }; }
  _clean() { const d = new Date(); d.setHours(0,0,0,0); this.requests = this.requests.filter(ts => ts >= d.getTime()); }
}
module.exports = ApiUsageTracker;
