import { promises as fs } from 'fs';
import { Promise as QPromise } from 'q';
import { parse } from 'papaparse';
import { pick } from 'lodash';

import type { Config, PokemonData } from '@scripts/shared';

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

type GetDataReturnType = Promise<PokemonData[]>;
interface GetData {
  (file: string, keys: Config['keys']): GetDataReturnType;
}

const getData: GetData = async (file, { selectedKeys }) => {
  try {
    const results = [];

    const handleStep = ({ data }) => {
      const keys = selectedKeys;

      results.push(
        // Pick all keys in `keys` from data
        pick(data, keys),
      );
    };

    await QPromise((resolve, reject) => {
      // Parse file
      parse(file, {
        header: true,
        dynamicTyping: true,
        step: handleStep,
        complete: resolve,
        error: reject,
      });
    });

    return results;
  } catch (error) {
    throw new Error(`Error retrieving data: ${error}`);
  }
};

export { getFile, getData };
