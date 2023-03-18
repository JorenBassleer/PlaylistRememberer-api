const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('err', error));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', routes());

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.client_id,
  clientSecret: process.env.client_secret,
  callbackURL: process.env.redirect_uris,
// eslint-disable-next-line no-unused-vars
}, (accessToken, refreshToken, profile, done) => {
  // Find or create user in the database
  // Call the done function with the user object
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  // Find user by id in the database
  // Call the done function with the user object
});

// Start the server
app.listen(PORT, () => console.log('Server started'));