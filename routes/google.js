const express = require('express');

const router = express.Router();
const passport = require('passport');

module.exports = (app) => {
  app.use('/google', router);
  router.get('/', async (req, res) => {
    try {
      passport.authenticate('google', { scope: 'profile' });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  router.get('/callback', async (req, res) => {
    try {
      passport.authenticate('google', (_req, _res) => _res.status(200));
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
