import * as path from 'path';

import { getFile, getRows } from '@scripts/utils';
import type { Config, File, RowStream } from '@scripts/shared/types';

const filename = 'pokedex_data_04_2021';
const ext = '.csv';

const config: Config = {
  filename,
  path: path.join(__dirname, '../dataset/raw', `${filename}${ext}`),
};

type StartReturnType = void;
interface Start {
  (): StartReturnType;
}

const start: Start = async () => {
  const file: File = getFile(config);
  const rows: RowStream = await getRows(file);

  const processedRows = [];

  rows.on('data', (row) => {
    /**
     * @todo Trim string
     * @todo Ensure data is correct data type
     */
    processedRows.push(row);
  });

  rows.on('end', () => {
    const length = processedRows.length;

    console.log(`Processed ${length} rows successfully`);
    process.exit(0);
  });

  rows.on('error', (error) => {
    console.error(`Error reading rows: ${error}`);
    process.exit(1);
  });
};

start();
