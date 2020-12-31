import Redis from 'ioredis';

import settings from 'settings';

const redis = new Redis(settings.REDIS_URI);

export {
  redis,
};
