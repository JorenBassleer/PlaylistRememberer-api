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
  const url = require('url');

  // Receive the callback from Google's OAuth 2.0 server.
  app.get('/oauth2callback', async (req, res) => {
    coonsole.log('autgh callback');
    const q = url.parse(req.url, true).query;

    if (q.error) { // An error response e.g. error=access_denied
      // eslint-disable-next-line no-console
      console.log(`Error:${q.error}`);
    } else if (q.state !== req.session.state) { // check state value
      res.end('State mismatch. Possible CSRF attack');
    } else {
      const { tokens } = await oauth2Client.getToken(q.code);
      oauth2Client.setCredentials(tokens);
    }
  });
};
