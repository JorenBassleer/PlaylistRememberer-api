const express = require('express');

const router = express.Router();
const playlistController = require('../controllers/playlist');

module.exports = (app) => {
  app.use('/playlist', router);
  router.get('/', async (req, res) => {
    try {
      const playlsitRecords = await playlistController.getAllPlaylists();
      return res.status(200).json(playlsitRecords);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.post('/', async (req, res) => {
    try {
      const createdPlaylist = await playlistController.createPlaylist(req.body);
      return res.status(200).json(createdPlaylist);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const foundPlaylist = await playlistController.findPlaylistById(req.params.id);
      return res.status(200).json(foundPlaylist);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const updatedPlaylist = await playlistController.updatePlaylistById(req.params.id, req.body);
      return res.status(200).json(updatedPlaylist);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const deletedPlaylist = await playlistController.deletePlaylistById(req.params.id);
      return res.status(200).json(deletedPlaylist);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
