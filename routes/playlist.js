const express = require('express');

const router = express.Router();
const googleController = require('../controllers/google');
const playlistController = require('../controllers/playlist');

module.exports = (app) => {
  app.use('/playlist', router);
  router.get('/', async (req, res) => {
    googleController.youtubeService.playlists.list({
      auth: googleController.oauth2Client,
      part: 'snippet,contentDetails',
      mine: true,
      maxResults: 50,
    }, (err, response) => {
      if (err) return res.status(500).json();
      return res.status(200).json(response.data);
    });
  });

  router.post('/', async (req, res) => {
    try {
      if (!req.body.length) return res.status(500).json({ error: 'No playlists provided' });

      await Promise.all(req.body.map((playlist) => new Promise((resolve, reject) => {
        googleController.youtubeService.playlistItems.list({
          playlistId: playlist,
          auth: googleController.oauth2Client,
          part: 'snippet,id',
          maxResults: 50,
        }, async (err, response) => {
          if (err) return reject(res.status(500).json({ error: 'Failed to fetch playlist' }));

          await playlistController.createPlaylist({
            youtubeId: playlist,
            videos: [...response.data.items],
          });

          return resolve();
        });
      })));

      const allPlaylists = await playlistController.getAllPlaylists();
      return res.status(200).json(allPlaylists);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.get('/saved', async (req, res) => {
    try {
      const savedPlaylists = await playlistController.getAllPlaylists();
      return res.status(200).json(savedPlaylists);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  // eslint-disable-next-line consistent-return
  router.get('/videos/:id', async (req, res) => {
    try {
      googleController.youtubeService.playlistItems.list({
        playlistId: req.params.id,
        auth: googleController.oauth2Client,
        part: 'snippet',
        maxResults: 50,
      }, async (err, response) => {
        if (err) return res.status(500).json();
        return res.status(200).json(response.data.items);
      });
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
