const passport = require('passport');
const User = require('./models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

passport.serializeUser = ((user, done) => {
  done(null, user._id);
});

passport.deserializeUser = ((user, done) => {
  done(null, user);
});

passport.use('provider', new GoogleStrategy(
  {
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: process.env.redirect_uris,

  },
  (token, tokenSecret, profile, done) => {
    // Register user in DB
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      done(err, user);
    });
  },
));
