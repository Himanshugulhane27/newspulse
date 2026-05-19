/**
 * News API & Health Check Tests
 *
 * These tests exercise the public-facing news endpoints.  Since NewsAPI
 * requires a paid key and rate-limits aggressively, the controller falls
 * back to built-in sample data — which is exactly what we assert against.
 */

const request = require('supertest');
const { connect, disconnect } = require('./setup');

process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';
process.env.NODE_ENV = 'test';
// Use a dummy key so the controller attempts the API, fails, and falls back
process.env.NEWS_API_KEY = 'test-invalid-key';

const app = require('../app');

beforeAll(connect);
afterAll(disconnect);

// ── Health Check ───────────────────────────────────────────────────────
describe('GET /api/health', () => {
  it('should return OK status', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body).toHaveProperty('timestamp');
  });
});

// ── Root Endpoint ──────────────────────────────────────────────────────
describe('GET /', () => {
  it('should return API information', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/NewsPulse API/i);
    expect(res.body).toHaveProperty('endpoints');
  });
});

// ── Get News ───────────────────────────────────────────────────────────
describe('GET /api/news', () => {
  it('should return articles (falls back to sample data in tests)', async () => {
    const res = await request(app).get('/api/news');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('articles');
    expect(res.body).toHaveProperty('totalResults');
    expect(Array.isArray(res.body.articles)).toBe(true);
    expect(res.body.articles.length).toBeGreaterThan(0);
  });

  it('should accept a valid category parameter', async () => {
    const res = await request(app).get('/api/news?category=technology');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('articles');
  });

  it('should respect pageSize parameter', async () => {
    const res = await request(app).get('/api/news?pageSize=3');

    expect(res.status).toBe(200);
    expect(res.body.articles.length).toBeLessThanOrEqual(3);
  });
});

// ── Search News ────────────────────────────────────────────────────────
describe('GET /api/news/search', () => {
  it('should return results for a search query', async () => {
    const res = await request(app).get('/api/news/search?q=technology');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('articles');
    expect(res.body).toHaveProperty('totalResults');
  });

  it('should reject missing search query', async () => {
    const res = await request(app).get('/api/news/search');

    expect(res.status).toBe(400);
  });
});

// ── Get Categories ─────────────────────────────────────────────────────
describe('GET /api/news/categories', () => {
  it('should return a list of categories', async () => {
    const res = await request(app).get('/api/news/categories');

    expect(res.status).toBe(200);
    expect(res.body.categories).toBeDefined();
    expect(res.body.categories.length).toBeGreaterThan(0);
    expect(res.body.categories[0]).toHaveProperty('id');
    expect(res.body.categories[0]).toHaveProperty('name');
  });
});

// ── 404 ────────────────────────────────────────────────────────────────
describe('Unknown routes', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
