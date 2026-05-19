/**
 * Bookmark API Integration Tests
 *
 * Covers: CRUD operations, authentication enforcement, duplicate prevention,
 * pagination, category filtering, validation errors, and ownership checks.
 */

const request = require('supertest');
const { connect, disconnect, clearDatabase } = require('./setup');

process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';
process.env.NODE_ENV = 'test';

const app = require('../app');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearDatabase);

// ── Helpers ────────────────────────────────────────────────────────────
const sampleArticle = {
  title: 'Test Article Title',
  description: 'A description of the test article',
  url: 'https://example.com/test-article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: new Date().toISOString(),
  source: { name: 'Test Source', id: 'test' },
  category: 'technology',
  content: 'Full article content here.',
};

const getAuthToken = async (overrides = {}) => {
  const user = {
    username: overrides.username || 'bookmarkuser',
    email: overrides.email || 'bookmark@example.com',
    password: 'password123',
    ...overrides,
  };
  const res = await request(app).post('/api/auth/register').send(user);
  return res.body.token;
};

// ── Create Bookmark ────────────────────────────────────────────────────
describe('POST /api/bookmarks', () => {
  it('should create a bookmark for authenticated user', async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    expect(res.status).toBe(201);
    expect(res.body.bookmark.article.title).toBe(sampleArticle.title);
    expect(res.body.bookmark).toHaveProperty('userId');
  });

  it('should prevent duplicate bookmarks for the same URL', async () => {
    const token = await getAuthToken();

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    const res = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already bookmarked/i);
  });

  it('should reject bookmark without article title', async () => {
    const token = await getAuthToken();
    const { title, ...noTitle } = sampleArticle;

    const res = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: noTitle });

    expect(res.status).toBe(400);
  });

  it('should reject bookmark with invalid URL', async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: { ...sampleArticle, url: 'not-a-url' } });

    expect(res.status).toBe(400);
  });

  it('should reject unauthenticated request', async () => {
    const res = await request(app)
      .post('/api/bookmarks')
      .send({ article: sampleArticle });

    expect(res.status).toBe(401);
  });
});

// ── Get Bookmarks ──────────────────────────────────────────────────────
describe('GET /api/bookmarks', () => {
  it('should return bookmarks for authenticated user', async () => {
    const token = await getAuthToken();

    // Create two bookmarks
    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: { ...sampleArticle, url: 'https://example.com/second' } });

    const res = await request(app)
      .get('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.bookmarks).toHaveLength(2);
    expect(res.body.totalResults).toBe(2);
  });

  it('should paginate results', async () => {
    const token = await getAuthToken();

    // Create 3 bookmarks
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/api/bookmarks')
        .set('Authorization', `Bearer ${token}`)
        .send({ article: { ...sampleArticle, url: `https://example.com/article-${i}` } });
    }

    const res = await request(app)
      .get('/api/bookmarks?page=1&pageSize=2')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.bookmarks).toHaveLength(2);
    expect(res.body.totalResults).toBe(3);
  });

  it('should filter by category', async () => {
    const token = await getAuthToken();

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: { ...sampleArticle, category: 'technology' } });

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        article: { ...sampleArticle, url: 'https://example.com/sports', category: 'sports' },
      });

    const res = await request(app)
      .get('/api/bookmarks?category=technology')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.bookmarks).toHaveLength(1);
  });

  it('should not return bookmarks from other users', async () => {
    const tokenA = await getAuthToken({ username: 'userA', email: 'a@test.com' });
    const tokenB = await getAuthToken({ username: 'userB', email: 'b@test.com' });

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ article: sampleArticle });

    const res = await request(app)
      .get('/api/bookmarks')
      .set('Authorization', `Bearer ${tokenB}`);

    expect(res.status).toBe(200);
    expect(res.body.bookmarks).toHaveLength(0);
  });

  it('should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/bookmarks');
    expect(res.status).toBe(401);
  });
});

// ── Delete Bookmark ────────────────────────────────────────────────────
describe('DELETE /api/bookmarks/:id', () => {
  it('should delete a bookmark owned by the user', async () => {
    const token = await getAuthToken();

    const createRes = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    const bookmarkId = createRes.body.bookmark._id;

    const res = await request(app)
      .delete(`/api/bookmarks/${bookmarkId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/removed/i);
  });

  it('should not delete a bookmark owned by another user', async () => {
    const tokenA = await getAuthToken({ username: 'ownerA', email: 'ownerA@test.com' });
    const tokenB = await getAuthToken({ username: 'otherB', email: 'otherB@test.com' });

    const createRes = await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ article: sampleArticle });

    const bookmarkId = createRes.body.bookmark._id;

    const res = await request(app)
      .delete(`/api/bookmarks/${bookmarkId}`)
      .set('Authorization', `Bearer ${tokenB}`);

    expect(res.status).toBe(404);
  });

  it('should return 404 for non-existent bookmark', async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .delete('/api/bookmarks/aaaaaaaaaaaaaaaaaaaaaaaa')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});

// ── Check Bookmark ─────────────────────────────────────────────────────
describe('GET /api/bookmarks/check', () => {
  it('should return isBookmarked: true for a bookmarked URL', async () => {
    const token = await getAuthToken();

    await request(app)
      .post('/api/bookmarks')
      .set('Authorization', `Bearer ${token}`)
      .send({ article: sampleArticle });

    const res = await request(app)
      .get(`/api/bookmarks/check?url=${encodeURIComponent(sampleArticle.url)}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.isBookmarked).toBe(true);
    expect(res.body.bookmarkId).toBeDefined();
  });

  it('should return isBookmarked: false for a non-bookmarked URL', async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .get('/api/bookmarks/check?url=https://example.com/not-bookmarked')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.isBookmarked).toBe(false);
  });

  it('should reject missing url parameter', async () => {
    const token = await getAuthToken();

    const res = await request(app)
      .get('/api/bookmarks/check')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
  });
});
