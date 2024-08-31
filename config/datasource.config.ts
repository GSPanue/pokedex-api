import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

type CreateDefaultConfigReturnType = PostgresConnectionOptions;
interface CreateDefaultConfig {
  (): CreateDefaultConfigReturnType;
}

const createDefaultConfig: CreateDefaultConfig = () => {
  const {
    DB_USER: username,
    DB_PASSWORD: password,
    DB_HOST: host,
    DB_NAME: database,
    DB_PORT: port,
  } = process.env;

  return {
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database,
    migrations: [`${__dirname}/../src/migrations/*.{js,ts}`],
    entities: [`${__dirname}/../src/entity/*.entity.{js,ts}`],
    namingStrategy: new SnakeNamingStrategy(),
  };
};

type CreateAppDataSourceReturnType = DataSource;
interface CreateAppDataSource {
  (): CreateAppDataSourceReturnType;
}

const createAppDataSource: CreateAppDataSource = () =>
  new DataSource(createDefaultConfig());

const AppDataSource = createAppDataSource();

export { createDefaultConfig };
export default AppDataSource;
