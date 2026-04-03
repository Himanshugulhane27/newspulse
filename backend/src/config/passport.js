const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email (link accounts)
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.authProvider = user.authProvider === 'local' ? 'local' : 'google';
            await user.save();
            return done(null, user);
          }
        }

        // Create a new user
        const username = profile.displayName?.replace(/\s+/g, '_').toLowerCase() ||
          `user_${profile.id.slice(-8)}`;

        // Ensure unique username
        let uniqueUsername = username;
        let counter = 1;
        while (await User.findOne({ username: uniqueUsername })) {
          uniqueUsername = `${username}_${counter}`;
          counter++;
        }

        user = new User({
          googleId: profile.id,
          username: uniqueUsername,
          email: email,
          authProvider: 'google',
          preferences: {
            categories: [],
            darkMode: false,
          },
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
