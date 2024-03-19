import { open } from 'data.js';

import type { Config, File, RowStream } from '@scripts/shared/types';

type GetFileReturnType = File;
interface GetFile {
  (config: Config): GetFileReturnType;
}

const getFile: GetFile = (config) => {
  const { path } = config;

  try {
    const file = open(path);

    return file;
  } catch (error) {
    console.log(`Error opening file: ${error}`);
    process.exit(1);
  }
};

type GetRowsReturnType = Promise<RowStream>;
interface GetRows {
  (file: File): GetRowsReturnType;
}

const getRows: GetRows = async (file) => {
  try {
    const rows: RowStream = file.rows();

    return rows;
  } catch (error) {
    console.error(`Error getting rows: ${error}`);
    process.exit(1);
  }
};

export type { RowStream, GetRowsReturnType };
export { getFile, getRows };
