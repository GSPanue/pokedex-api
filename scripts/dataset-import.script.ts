import { join } from 'path';

import { createDatabaseConnection } from '@scripts/utils';
import { getFile, getData } from '@scripts/shared';
import type { Config } from '@scripts/shared';

const filename: string = 'pokedex_data_04_2021.csv';

const config: Partial<Config> = {
  keys: {
    selectedKeys: [
      'pokedex_number',
      'name',
      'german_name',
      'japanese_name',
      'generation',
      'status',
      'species',
      'type_1',
      'type_2',
      'height_m',
      'weight_kg',
      'ability_1',
      'ability_2',
      'ability_hidden',
    ],
  },
  inputPath: join(__dirname, '../dataset/processed', filename),
};

const start = async () => {
  const { inputPath, keys } = config;

  try {
    console.log('Reading file...\n');
    const file = await getFile(inputPath);

    console.log('Retrieving data from file...\n');
    const data = await getData(file, keys);

    console.log('Connecting to database...\n');
    const client = createDatabaseConnection();
    await client.connect();

    await client.end();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();
