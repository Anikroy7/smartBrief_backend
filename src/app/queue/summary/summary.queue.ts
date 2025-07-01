const Bull = require('bull');
export const summaryQueue = new Bull('summary-queue', {
  redis: { host: '127.0.0.1', port: 6379 }
});
