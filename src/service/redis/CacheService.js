const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });
    this._client.on('error', (error) => {
      console.error(error);
    });
    this._client.on('connect', () => {
      console.log('[REDIS] Connected!');
    });
    this._client.connect();
  }

  async set(key, value, expirationInSecond = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result) return result;
    throw new Error('Cache tidak ditemukan');
  }

  async delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;