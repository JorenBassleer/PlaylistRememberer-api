const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  youtubeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videos: {
    type: Array,
  },
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
