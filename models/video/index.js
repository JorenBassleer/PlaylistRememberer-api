const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  duration: {
    type: Array,
    required: true,
  },
});

const Video = model('Video', videoSchema);

module.exports = Video;
