const { Router } = require('express');

const video = require('./video');
const playlist = require('./playlist');
const google = require('./google');

module.exports = () => {
  const app = Router();
  video(app);
  playlist(app);
  google(app);
  return app;
};
