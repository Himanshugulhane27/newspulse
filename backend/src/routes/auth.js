const express = require('express');
const { body } = require('express-validator');
const passport = require('../config/passport');
const { register, login, getProfile, googleCallback } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], register);

// Login
router.post('/login', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], login);

// Get profile (protected)
router.get('/profile', auth, getProfile);

// Google OAuth routes
router.get('/google', (req, res, next) => {
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
  
  // Check if Google strategy is configured
  if (!passport._strategy('google')) {
    console.error('Google OAuth strategy not configured');
    return res.redirect(`${frontendURL}/login?error=oauth_not_configured`);
  }
  
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })(req, res, (err) => {
    if (err) {
      console.error('Google OAuth init error:', err);
      return res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
  });
});

router.get('/google/callback', (req, res, next) => {
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
  
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Google OAuth callback error:', err);
      return res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
    if (!user) {
      console.error('Google OAuth callback: no user returned', info);
      return res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
    req.user = user;
    googleCallback(req, res);
  })(req, res, next);
});

module.exports = router;