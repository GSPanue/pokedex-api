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

type GetFileReturnType = Promise<string>;
interface GetFile {
  (path: string): GetFileReturnType;
}

const getFile: GetFile = async (path) => {
  try {
    const file = await fs.readFile(path, 'utf8');

    return file;
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
};

type PokemonData = {
  pokedex_number: number | null;
  name: string | null;
  german_name: string | null;
  japanese_name: string | null;
  generation: number | null;
  status: string | null;
  species: string | null;
  type_1: string | null;
  type_2: string | null;
  height_m: number | null;
  weight_kg: number | null;
  ability_1: string | null;
  ability_2: string | null;
  ability_hidden: string | null;
};
type GetDataReturnType = Promise<PokemonData[]>;
interface GetData {
  (file: string): GetDataReturnType;
}

const getData: GetData = async (file) => {
  try {
    const results = [];

    const handleStep = ({ data }) => {
      const keys = [
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
      ];

      results.push(
        // Pick keys in `keys` from data
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
  (data: PokemonData): FindMissingDataReturnType;
}

const findMissingData: FindMissingData = (data) => {
  const requiredDataKeys: string[] = [
    'pokedex_number',
    'name',
    'generation',
    'species',
    'type_1',
    'height_m',
    'weight_kg',
  ];

  const missingDataKeys = [];

  // Get keys of missing data
  forOwn(data, (value, key) => {
    if (isNull(value) && includes(requiredDataKeys, key)) {
      missingDataKeys.push(key);
    }
  });

  return missingDataKeys;
};

type ProcessDataReturnType = PokemonData[];
interface ProcessData {
  (data: PokemonData[]): ProcessDataReturnType;
}

const processData: ProcessData = (data) => {
  const missingData = [];

  // Trim all data and find any missing data
  data.forEach((obj, index) => {
    const trimmedData = trimStringValues(obj);

    const missingDataKeys = findMissingData(trimmedData);
    const hasMissingData = !isEmpty(missingDataKeys);

    if (hasMissingData) {
      missingData.push({
        row: index + 2,
        pokedex_number: trimmedData.pokedex_number,
        keys: missingDataKeys,
      });
    }
  });

  const hasMissingData = !isEmpty(missingData);

  if (hasMissingData) {
    throw new Error(
      `Found ${size(missingData)} row(s) with missing data:\n${JSON.stringify(missingData, null, 2)}`,
    );
  }

  return data;
};

export { getFile, getData, processData };
