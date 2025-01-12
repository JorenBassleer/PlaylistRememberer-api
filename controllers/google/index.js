const { google } = require('googleapis');

const crypto = require('crypto');
const secrets = require('../../client_secret.json');

const oauth2Client = new google.auth.OAuth2(
  secrets.web.client_id,
  secrets.web.client_secret,
  secrets.web.redirect_uris[0],
);

const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

const state = crypto.randomBytes(32).toString('hex');

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
};
