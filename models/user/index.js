const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const Playlist = model('Playlist', userSchema);

module.exports = Playlist;
