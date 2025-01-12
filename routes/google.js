const express = require('express');
const googleController = require('../controllers/google');

const router = express.Router();

module.exports = (app) => {
  app.use('/google', router);
  // https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#node.js
  router.get('/', async (req, res) => {
    try {
      req.session.state = googleController.state;

      return res.status(200).json(googleController.createAuthURL());
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

      if (state !== req.session.state) {
        return res.status(403).json('State mismatch. Possible CSRF attack');
      }

      const { tokens } = await googleController.oauth2Client.getToken(code);
      googleController.oauth2Client.setCredentials(tokens);
      return res.status(200).json({ tokens });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
