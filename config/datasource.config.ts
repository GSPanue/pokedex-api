import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

type CreateAppDataSourceReturnType = DataSource;
interface CreateAppDataSource {
  (): CreateAppDataSourceReturnType;
}

const createAppDataSource: CreateAppDataSource = () => {
  const {
    DB_USER: username,
    DB_PASSWORD: password,
    DB_HOST: host,
    DB_NAME: database,
    DB_PORT: port,
  } = process.env;

  return new DataSource({
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database,
    logging: false,
    migrations: ['**/migrations/*{.ts}'],
    synchronize: false,
    migrationsRun: true,
    entities: ['src/entity/*.entity.ts'],
    namingStrategy: new SnakeNamingStrategy(),
  });
};

const AppDataSource = createAppDataSource();

export default AppDataSource;
