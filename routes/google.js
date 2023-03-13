const express = require('express');

const router = express.Router();
const googleController = require('../controllers/google');

module.exports = (app) => {
  app.use('/google', router);
  router.get('/auth', async (req, res) => {
    try {
      
    }
  });
};
