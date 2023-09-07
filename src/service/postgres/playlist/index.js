const { Pool } = require('pg');
const getPlaylistName = require('./get-playlist-name');
const getSongFromPlaylistId = require('./get-song-from-playlist-id');

class PlaylistService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  getPlaylistNameService = async (playlistId) => {
    const result = await getPlaylistName(this, playlistId);
    return result;
  };

  getSongFromPlaylistIdService = async (playlistId) => {
    const result = await getSongFromPlaylistId(this, playlistId);
    return result;
  };
}

module.exports = PlaylistService;
