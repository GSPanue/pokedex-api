import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

const {
  DB_USER: username,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_NAME: database,
  DB_PORT: port,
} = process.env;

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host,
  port: Number(port),
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: ['src/shared/entities/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});

export type { DataSource };
