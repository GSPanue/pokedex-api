import { join } from 'path';

import { getFile, getData, processData } from '@scripts/utils';

const filename: string = 'pokedex_data_04_2021.csv';

const config = {
  filename,
  inputPath: join(__dirname, '../dataset/raw', filename),
  outputPath: join(__dirname, '../dataset/processed', filename),
};

const start = async () => {
  const { inputPath } = config;

  try {
    console.log('Reading file...\n');
    const file = await getFile(inputPath);

    console.log('Retrieving data from file...\n');
    const data = await getData(file);

    console.log('Processing data from file...\n');
    const processedData = processData(data);

    const summary = {
      rows: processedData.length,
      output: config.outputPath,
    };

    console.log('Exporting processed data...\n');

    console.log(
      `Successfully processed ${summary.rows} row(s).\n\nExported data can be located in: ${summary.output}\n`,
    );
  } catch (error) {
    console.error(error.message);
  }
};

start();
