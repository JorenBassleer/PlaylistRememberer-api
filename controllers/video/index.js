const Video = require('../../models/video');

const getAllVideos = async () => {
  const allVideos = await Video.find({});
  return allVideos;
};

const findVideoById = async (id) => {
  const foundVideo = await Video.findById({ _id: id });
  if (!foundVideo) throw new Error('No video with that id');
  return foundVideo;
};

const createVideo = async (video) => {
  const newVideo = await (await Video.create(video)).save();
  return newVideo;
};

const updateVideoById = async (id, video) => {
  const updatedVideo = await Video.findByIdAndUpdate(
    id,
    { $set: video },
    // eslint-disable-next-line comma-dangle
    {
      lean: true,
      new: true,
    },
  );

  return updatedVideo;
};

const deleteVideoById = async (id) => {
  const deletedVideo = await Video.deleteOne({ _id: id });
  return deletedVideo;
};

module.exports = {
  getAllVideos,
  findVideoById,
  createVideo,
  updateVideoById,
  deleteVideoById,
};
