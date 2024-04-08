import { Client } from 'pg';
import 'dotenv/config';

const createDatabaseConnection = () => {
  const {
    DB_USER: user,
    DB_PASSWORD: password,
    DB_HOST: host,
    DB_NAME: database,
    DB_PORT: port,
  } = process.env;

  const client = new Client({
    user,
    password,
    host,
    database,
    port,
  });

  return client;
};

export { createDatabaseConnection };
