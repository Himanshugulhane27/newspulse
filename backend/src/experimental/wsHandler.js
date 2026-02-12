// websocket handler experiment for real-time news updates
// not using ws library yet, just sketching the logic
class NewsWebSocket {
  constructor() {
    this.connections = new Map();
    this.channels = new Map(); // category -> Set of connection ids
  }
  onConnect(ws, userId) {
    const connId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.connections.set(connId, { ws, userId, subscribedCategories: [] });
    console.log(`[WS] Client connected: ${connId}`);
    return connId;
  }
  subscribe(connId, category) {
    const conn = this.connections.get(connId);
    if (!conn) return;
    if (!this.channels.has(category)) this.channels.set(category, new Set());
    this.channels.get(category).add(connId);
    conn.subscribedCategories.push(category);
  }
  broadcast(category, data) {
    const subscribers = this.channels.get(category);
    if (!subscribers) return;
    const message = JSON.stringify({ type: 'news_update', category, data, timestamp: Date.now() });
    for (const connId of subscribers) {
      const conn = this.connections.get(connId);
      if (conn?.ws?.readyState === 1) conn.ws.send(message);
    }
  }
  onDisconnect(connId) {
    const conn = this.connections.get(connId);
    if (!conn) return;
    for (const cat of conn.subscribedCategories) {
      this.channels.get(cat)?.delete(connId);
    }
    this.connections.delete(connId);
  }
}
module.exports = NewsWebSocket;
