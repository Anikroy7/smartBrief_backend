import config from "../../config";

const Bull = require('bull');
export const summaryQueue = new Bull('summary-queue', {
  redis: {
    host: config.host,
    port: config.redisPort,
    username: config.username,
    password: config.password,
  }
});
