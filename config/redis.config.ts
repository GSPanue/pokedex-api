import redisStore from 'cache-manager-redis-store';
import 'dotenv/config';

type CreateDefaultConfigReturnType = {
  store: any;
  host: string;
  port: number;
};
interface CreateDefaultConfig {
  (): CreateDefaultConfigReturnType;
}

const createDefaultRedisConfig: CreateDefaultConfig = () => {
  const { REDIS_HOST: host, REDIS_PORT: port } = process.env;

  return {
    store: redisStore,
    host,
    port: Number(port),
  };
};

export { createDefaultRedisConfig };
