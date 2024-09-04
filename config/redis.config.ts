import redisStore from 'cache-manager-redis-store';
import 'dotenv/config';

type CreateDefaultRedisConfigReturnType = {
  store: any;
  host: string;
  port: number;
};
interface CreateDefaultRedisConfig {
  (): CreateDefaultRedisConfigReturnType;
}

const createDefaultRedisConfig: CreateDefaultRedisConfig = () => {
  const { REDIS_HOST: host, REDIS_PORT: port } = process.env;

  return {
    store: redisStore,
    host,
    port: Number(port),
    ttl: 0,
  };
};

export { createDefaultRedisConfig };
