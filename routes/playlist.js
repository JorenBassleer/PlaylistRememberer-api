const express = require('express');

const router = express.router();
const playlistController = require('../controllers/playlist');

module.exports = (app) => {
  app.use('/playlist', router);
  router.get('/', (req, res) => {
    try {

    } catch (error) {

    }
  });
  router.post('/', (req, res) => {

  });
  router.get('/:id', (req, res) => {

  });
  router.put('/:id', (req, res) => {

  });
  router.delete('/:id', (req, res) => {

  });
};
