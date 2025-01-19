const { google } = require('googleapis');
require('dotenv').config();
const crypto = require('crypto');

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uris,
);

const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

const state = crypto.randomBytes(32).toString('hex');

const youbtubeService = google.youtube('v3');

const createAuthURL = () => oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
  state,
});

module.exports = {
  createAuthURL,
  state,
  oauth2Client,
  youbtubeService,
};
