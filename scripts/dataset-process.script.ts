import { join } from 'path';

import { processData, exportData } from '@scripts/utils';
import { getFile, getData } from '@scripts/shared';

import type { Config } from '@scripts/shared';

const filename: string = 'pokedex_data_04_2021.csv';

const config: Config = {
  keys: {
    requiredKeys: [
      'pokedex_number',
      'name',
      'generation',
      'species',
      'type_1',
      'height_m',
      'weight_kg',
    ],
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
  inputPath: join(__dirname, '../dataset/raw', filename),
  outputPath: join(__dirname, '../dataset/processed', filename),
};

const start = async () => {
  const { inputPath, keys, outputPath } = config;

  try {
    console.log('Reading file...\n');
    const file = await getFile(inputPath);

    console.log('Retrieving data from file...\n');
    const data = await getData(file, keys);

    console.log('Processing data from file...\n');
    const processedData = processData(data, keys);

    console.log('Exporting data...\n');
    await exportData(outputPath, data);

    const summary = {
      rows: processedData.length,
      output: config.outputPath,
    };

    console.log(
      `Successfully processed ${summary.rows} row(s).\n\nExported data can be located in: ${summary.output}\n`,
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();
