const morgan = require('morgan');

// ── Structured logger ──────────────────────────────────────────────────
// Provides timestamped, leveled logging instead of raw console calls.
// In production a transport-based logger (Winston/Pino) would replace this,
// but for this project a lightweight wrapper gives the right signal.

const logger = {
  info: (...args) =>
    console.log(`[${new Date().toISOString()}] [INFO]`, ...args),
  warn: (...args) =>
    console.warn(`[${new Date().toISOString()}] [WARN]`, ...args),
  error: (...args) =>
    console.error(`[${new Date().toISOString()}] [ERROR]`, ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${new Date().toISOString()}] [DEBUG]`, ...args);
    }
  },
};

// ── Morgan HTTP request logger ─────────────────────────────────────────
// Production: concise one-liner per request.
// Development: colour-coded status + response time.
// Skips health-check spam to keep logs readable.

const httpLogger = morgan(
  process.env.NODE_ENV === 'production'
    ? ':method :url :status :response-time ms - :remote-addr'
    : 'dev',
  {
    skip: (req) => req.url === '/api/health',
    stream: { write: (message) => logger.info(message.trim()) },
  }
);

module.exports = { logger, httpLogger };
