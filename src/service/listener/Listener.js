class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;
  }

  listen = async (message) => {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlistName =
        await this._playlistService.getPlaylistNameService(playlistId);

      const songs =
        await this._playlistService.getSongFromPlaylistIdService(playlistId);

      const playlist = {
        id: playlistId,
        name: playlistName,
        songs
      }

      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlistId,
        playlistName,
        JSON.stringify({playlist})
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Listener;
