const { Router } = require('express');

const video = require('./video');
const playlist = require('./playlist');

module.exports = () => {
  const app = Router();
  video(app);
  playlist(app);
  return app;
};
