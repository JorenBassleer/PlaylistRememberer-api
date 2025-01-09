const express = require('express');
const { google } = require('googleapis');

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
      // eslint-disable-next-line no-console
      console.log('req session:', req.session.state);
      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        state,
      });
      req.session.save();
      return res.status(200).json(authorizationUrl);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  // Receive the callback from Google's OAuth 2.0 server.
  router.post('/oauth2callback', async (req, res) => {
    try {
      const { code, state } = req.body;

      if (!code || !state) {
        return res.status(400).json('Missing code or state in the request body');
      }
      // eslint-disable-next-line no-console
      console.log('state', req.session.state);
      if (state !== req.session.state) {
        return res.status(403).json('State mismatch. Possible CSRF attack');
      }

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      return res.status(200).json({ tokens });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
