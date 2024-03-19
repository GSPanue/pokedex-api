import * as path from 'path';

import { getRows } from '@scripts/utils';
import type { RowStream } from '@scripts/utils';
import type { Config } from '@scripts/shared/types';

const filename = 'pokedex_data_04_2021';
const ext = '.csv';

const config: Config = {
  filename,
  path: path.join(__dirname, '../dataset/raw', `${filename}${ext}`),
};

type ProcessDataReturnType = void;
interface ProcessData {
  (): ProcessDataReturnType;
}

const processData: ProcessData = async () => {
  const rows: RowStream = await getRows(config);
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

processData();
