import { open } from 'data.js';
import { EventEmitter } from 'events';

import type { Config } from '@scripts/shared/types';

interface RowStream extends EventEmitter {
  on(event: 'data', listener: (row: any[]) => void): this;
  on(event: 'end', listener: () => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
}

type GetRowsReturnType = Promise<RowStream>;
interface GetRows {
  (config: Config): GetRowsReturnType;
}

const getRows: GetRows = async (config) => {
  const { path } = config;

  try {
    const file = open(path);
    const rows: RowStream = await file.rows();

    return rows;
  } catch (error) {
    console.error(`Error opening file: ${error}`);
    process.exit(1);
  }
};

export type { RowStream, GetRowsReturnType, GetRows };
export { getRows };
