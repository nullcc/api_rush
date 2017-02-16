import wrapper from 'co-redis';
import Redis from 'redis';

module.exports = function redis(options) {
  const cacheOptions = options || {};
  const prefix = cacheOptions.prefix || 'api_rush_session:';
  const expire = cacheOptions.expire || 1800;

  let redisAvailable = false;
  const redisOptions = cacheOptions.redis || {};

  const redisClient = wrapper(
      Redis.createClient(redisOptions.url, redisOptions.options)
  );

  redisClient.on('error', (error) => {
    console.error('redis error: ', error);
    redisAvailable = false;
  });

  redisClient.on('end', () => {
    console.log('redis disconnected');
    redisAvailable = false;
  });

  redisClient.on('connect', () => {
    console.log(`redis connected to ${redisOptions.url}`);
    redisAvailable = true;
  });

  const set = async (key, value, options) => {
    if (!redisAvailable) {
      return;
    }
    if (value == null) {
      return;
    }
    const setOptions = options || {};
    const setKey = prefix + key;
    const tty = setOptions.expire || expire;
    const setValue = JSON.stringify(value);
    await redisClient.setex(setKey, tty, setValue);
  };

  const get = async (key) => {
    if (!redisAvailable) {
      return null;
    }
    const getKey = prefix + key;
    const rawData = await redisClient.get(getKey);
    let data = null;
    try {
      if (rawData) {
        data = JSON.parse(rawData);
      }
    } catch (err) {
      data = rawData;
    }
    return data;
  };

  const del = async (key) => {
    if (!redisAvailable) {
      return;
    }
    const delKey = prefix + key;
    await redisClient.del(delKey);
  };

  return {
    get,
    set,
    del
  };
};
