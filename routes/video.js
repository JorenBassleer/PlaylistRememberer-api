const express = require('express');

const router = express.router();
const videoController = require('../controllers/video');

module.exports = (app) => {
  app.use('/video', router);
  router.get('/', async (req, res) => {
    try {
      const videoRecords = await videoController.getAllVideos();
      return res.status(200).json(videoRecords);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.post('/', async (req, res) => {
    try {
      const createdVideo = await videoController.createVideo(req.body);
      return res.status(200).json(createdVideo);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const foundVideo = await videoController.findVideoById(req.params.id);
      return res.status(200).json(foundVideo);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const updatedVideo = await videoController.updateVideoById(req.params.id, req.body);
      return res.status(200).json(updatedVideo);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const deletedVideo = await videoController.deleteVideoById(req.params.id);
      return res.status(200).json(deletedVideo);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
