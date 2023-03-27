const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  tite: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
