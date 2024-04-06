import { promises as fs } from 'fs';
import type { Config } from '@scripts/shared';

type GetFileReturnType = Promise<string>;
interface GetFile {
  (path: Config['inputPath']): GetFileReturnType;
}

const getFile: GetFile = async (path) => {
  try {
    const file = await fs.readFile(path, 'utf8');

    return file;
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
};

export { getFile };
