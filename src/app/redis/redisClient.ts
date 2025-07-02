import Redis from 'ioredis';
import config from '../config';

const redis = new Redis({
  host: config.host,
  port: config.redisPort,
  username: config.username,
  password: config.password,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redis.on('connect', () => {
  console.log('Redis connected using ioredis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;
