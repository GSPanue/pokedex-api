import { join } from 'path';

import { getFile, getData } from '@scripts/utils';

const filename: string = 'pokedex_data_04_2021';
const ext: string = '.csv';

const config = {
  filename,
  path: join(__dirname, '../dataset/raw', `${filename}${ext}`),
};

const start = async () => {
  const { path, filename } = config;

  try {
    const file = await getFile(path);
    const data = await getData(file);

    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

start();
