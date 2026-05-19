/**
 * Auth API Integration Tests
 *
 * Covers: registration, login, JWT-protected profile, validation errors,
 * duplicate users, wrong credentials, and token edge cases.
 */

const request = require('supertest');
const { connect, disconnect, clearDatabase } = require('./setup');

// Set env vars BEFORE requiring app (passport reads them at module load)
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';
process.env.NODE_ENV = 'test';

const app = require('../app');
const User = require('../models/User');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearDatabase);

// ── Helper ─────────────────────────────────────────────────────────────
const validUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
};

const registerUser = () =>
  request(app).post('/api/auth/register').send(validUser);

// ── Registration ───────────────────────────────────────────────────────
describe('POST /api/auth/register', () => {
  it('should register a new user and return a JWT', async () => {
    const res = await registerUser();

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.username).toBe(validUser.username);
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject duplicate email', async () => {
    await registerUser();
    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('should reject duplicate username', async () => {
    await registerUser();
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, email: 'other@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('should reject invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should reject short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, password: '12345' });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should reject missing username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(400);
  });

  it('should hash the password before storing', async () => {
    await registerUser();
    const user = await User.findOne({ email: validUser.email });
    expect(user.password).not.toBe(validUser.password);
    expect(user.password.startsWith('$2')).toBe(true); // bcrypt hash
  });
});

// ── Login ──────────────────────────────────────────────────────────────
describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await registerUser();
  });

  it('should login with valid credentials and return a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(validUser.email);
  });

  it('should reject wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: 'wrongpassword' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it('should reject non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it('should reject missing password field', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email });

    expect(res.status).toBe(400);
  });
});

// ── Protected Profile ──────────────────────────────────────────────────
describe('GET /api/auth/profile', () => {
  it('should return user profile with valid token', async () => {
    const { body } = await registerUser();

    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject request without token', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('should reject request with invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer invalidtoken123');

    expect(res.status).toBe(401);
  });

  it('should reject request with malformed Authorization header', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', 'NotBearer abc');

    expect(res.status).toBe(401);
  });
});
