import { join } from 'path';

import { getFile, getData, processData } from '@scripts/utils';

const filename: string = 'pokedex_data_04_2021';
const ext: string = '.csv';

const config = {
  filename,
  path: join(__dirname, '../dataset/raw', `${filename}${ext}`),
};

const start = async () => {
  const { path, filename } = config;

  try {
    console.log('Reading file...\n');
    const file = await getFile(path);

    console.log('Retrieving data from file...\n');
    const data = await getData(file);

    console.log('Processing data from file...\n');
    const processedData = processData(data);

    // console.log(processedData);
  } catch (error) {
    console.error(error.message);
  }
};

start();
