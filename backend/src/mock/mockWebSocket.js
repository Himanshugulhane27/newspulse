// mock websocket server for testing real-time features
// doesn't actually open a WS server - just simulates the behavior
const EventEmitter = require('events');
class MockWSServer extends EventEmitter {
  constructor() {
    super();
    this.clients = [];
    this.running = false;
  }
  start(intervalMs = 5000) {
    this.running = true;
    console.log('[MockWS] Starting mock websocket server...');
    this._interval = setInterval(() => {
      if (!this.running) return;
      const mockUpdate = {
        type: 'breaking_news',
        article: {
          title: `Breaking: Event at ${new Date().toLocaleTimeString()}`,
          source: 'Mock News',
          category: ['technology', 'business', 'science'][Math.floor(Math.random() * 3)]
        },
        timestamp: Date.now()
      };
      this.emit('message', mockUpdate);
    }, intervalMs);
  }
  stop() {
    this.running = false;
    clearInterval(this._interval);
    console.log('[MockWS] Stopped');
  }
}
// quick test
if (require.main === module) {
  const server = new MockWSServer();
  server.on('message', (data) => console.log('Update:', data));
  server.start(2000);
  setTimeout(() => server.stop(), 10000);
}
module.exports = MockWSServer;
