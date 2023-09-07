const InvariantError = require('../../../exception/InvariantError');

const getSongFromPlaylistId = async (_this, playlistId) => {
  try {
    const resultCache = await _this._cacheService.get(
      `playlistSong-consumer:${playlistId}`
    );
    return resultCache;
  } catch (error) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
      FROM playlist_song ps
      LEFT JOIN song s ON s.id = ps.song_id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };
  
    const result = await _this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Gagal mengambil lagu-lagu dari playlist');
    }
  
    await _this._cacheService.set(
      `playlistSong-consumer:${playlistId}`,
      JSON.stringify(result)
    );
  
    return result.rows;
  }
};

module.exports = getSongFromPlaylistId;
