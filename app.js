const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('err', error));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', routes());

// Start the server
app.listen(PORT, () => console.log('Server started'));
