const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  videos: {
    type: Array,
    required: true,
  },
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
