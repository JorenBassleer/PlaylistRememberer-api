const Playlist = require('../../models/playlist');

const getAllPlaylists = async () => {
  const allPlalist = await Playlist.find({});
  return allPlalist;
};

const findPlaylistById = async (id) => {
  const foundPlaylist = await Playlist.findById({ _id: id });
  if (!foundPlaylist) throw new Error('No playlist with that id');
  return foundPlaylist;
};

const createPlaylist = async (playlist) => {
  const newPlaylist = await (await Playlist.create(playlist)).save();
  return newPlaylist;
};

const updatePlaylistById = async (id, playlist) => {
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    id,
    { $set: playlist },
    // eslint-disable-next-line comma-dangle
    {
      lean: true,
      new: true,
    },
  );

  return updatedPlaylist;
};

const deletePlaylistById = async (id) => {
  const deletedPlaylist = await Playlist.deleteOne({ _id: id });
  return deletedPlaylist;
};
module.exports = {
  getAllPlaylists,
  findPlaylistById,
  createPlaylist,
  updatePlaylistById,
  deletePlaylistById,
};
