const express = require('express');

const router = express.router();
const videoController = require('../controllers/video');

module.exports = (app) => {
  app.use('/video', router);
  router.get('/', (req, res) => {

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
