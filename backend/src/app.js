const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('./config/passport');
const { logger, httpLogger } = require('./utils/logger');

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// ── Security middleware ────────────────────────────────────────────────
app.use(helmet());

// ── HTTP request logging ───────────────────────────────────────────────
app.use(httpLogger);

// ── CORS configuration ────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes('vercel.app') ||
        origin.includes('onrender.com')
      ) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// ── Rate limiting ──────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Body parsing ───────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Passport initialization ───────────────────────────────────────────
app.use(passport.initialize());

// ── Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// ── Root / health endpoints ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'NewsPulse API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      news: '/api/news',
      auth: '/api/auth',
      bookmarks: '/api/bookmarks',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── Global error handler ───────────────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// ── 404 handler ────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
