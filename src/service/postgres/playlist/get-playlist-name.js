const InvariantError = require('../../../exception/InvariantError');

const getPlaylistName = async (_this, playlistId) => {
  try {
    const resultCache = await _this._cacheService.get(
      `playlistName-consumer:${playlistId}`
    );
    return resultCache;
  } catch (error) {
    const query = {
      text: 'SELECT name FROM playlist WHERE id = $1',
      values: [playlistId],
    };
    const result = await _this._pool.query(query);
  
    if (!result.rowCount) {
      throw new InvariantError('Gagal mengambil nama playlist');
    }
  
    await _this._cacheService.set(
      `playlistName-consumer:${playlistId}`,
      JSON.stringify(result)
    );
    return result.rows[0].name;
  }
};

module.exports = getPlaylistName;
