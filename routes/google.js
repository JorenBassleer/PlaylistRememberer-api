const express = require('express');
const { google } = require('googleapis');
const passport = require('passport');

const crypto = require('crypto');
const secrets = require('../client_secret.json');

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  secrets.web.client_id,
  secrets.web.client_secret,
  secrets.web.redirect_uris[0],
);

const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

module.exports = (app) => {
  app.use('/google', router);
  // https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#node.js
  router.get('/', async (req, res) => {
    try {
      const state = crypto.randomBytes(32).toString('hex');

      req.session.state = state;

      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        state,
      });
      return res.status(200).json(authorizationUrl);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  router.get('/callback', async (req, res) => {
    try {
      passport.authenticate('google', (_req, _res) => _res.status(200));
      return res.status(200);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
