require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./service/postgres/playlist');
const MailSender = require('./service/mailSender/MailSender');
const Listener = require('./service/listener/Listener');
const CacheService = require('./service/redis/CacheService');

const initConsumer = async () => {
  const cacheService = new CacheService();
  const playlistService = new PlaylistService(cacheService);
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, {
    noAck: true,
  });

  console.log(`Consumer berjalan pada ${process.env.RABBITMQ_SERVER}`);
};

initConsumer();
