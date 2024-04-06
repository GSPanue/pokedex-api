import { promises as fs } from 'fs';
import { Promise as QPromise } from 'q';
import { parse } from 'papaparse';
import {
  pick,
  forOwn,
  isEmpty,
  size,
  isString,
  isNull,
  includes,
} from 'lodash';

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

type TrimStringValuesReturnType = PokemonData;
interface TrimStringValues {
  (data: PokemonData): TrimStringValuesReturnType;
}

const trimStringValues: TrimStringValues = (data) => {
  const trimmedData = { ...data };

  // Trim all data of type string
  forOwn(trimmedData, (value, key) => {
    if (isString(value)) {
      data[key] = value.trim();
    }
  });

  return trimmedData;
};

type FindMissingDataReturnType = string[] | [];
interface FindMissingData {
  (
    data: PokemonData,
    keys: Config['keys']['requiredKeys'],
  ): FindMissingDataReturnType;
}

const findMissingData: FindMissingData = (data, keys) => {
  const missingKeys = [];

  // Get keys of missing data
  forOwn(data, (value, key) => {
    if (isNull(value) && includes(keys, key)) {
      missingKeys.push(key);
    }
  });

  return missingKeys;
};

type ProcessDataReturnType = PokemonData[];
interface ProcessData {
  (data: PokemonData[], keys: Config['keys']): ProcessDataReturnType;
}

const processData: ProcessData = (data, { requiredKeys }) => {
  const missingData = [];

  // Trim all data and find any missing data
  data.forEach((obj, index) => {
    const trimmedData = trimStringValues(obj);

    const missingDataKeys = findMissingData(trimmedData, requiredKeys);
    const hasMissingData = !isEmpty(missingDataKeys);

    if (hasMissingData) {
      // Push row with missing data
      missingData.push({
        row: index + 2,
        pokedex_number: trimmedData.pokedex_number,
        keys: missingDataKeys,
      });
    }
  });

  const hasMissingData = !isEmpty(missingData);

  if (hasMissingData) {
    const missingDataLength = size(missingData);
    const errorMessage = JSON.stringify(missingData, null, 2);

    throw new Error(
      `Found ${missingDataLength} row(s) with missing data:\n\n${errorMessage}`,
    );
  }

  return data;
};

export { getFile, getData, processData };
