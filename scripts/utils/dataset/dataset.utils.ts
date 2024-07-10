import { promises as fs } from 'fs';
import { unparse } from 'papaparse';
import { forOwn, isEmpty, size, isString, isNull, includes } from 'lodash';

import { removePokemonFromSpecies } from '@scripts/shared';

import type { Config, PokemonData } from '@scripts/shared';

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

  data = data.map((obj, index) => {
    // Remove 'Pokémon' from species string
    const species = removePokemonFromSpecies(obj.species);

    // Trim data
    const trimmedData = trimStringValues({
      ...obj,
      species,
    });

    // Find any missing data
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

    return trimmedData;
  });

  const hasMissingData = !isEmpty(missingData);

  // Throw error when data is missing
  if (hasMissingData) {
    const missingDataLength = size(missingData);
    const errorMessage = JSON.stringify(missingData, null, 2);

    throw new Error(
      `Found ${missingDataLength} row(s) with missing data:\n\n${errorMessage}`,
    );
  }

  return data;
};

type ExportDataReturnType = Promise<void>;
interface ExportData {
  (path: Config['outputPath'], data: PokemonData[]): ExportDataReturnType;
}

const exportData: ExportData = async (path, data) => {
  try {
    const unparsedData = unparse(data);

    await fs.writeFile(path, unparsedData, 'utf8');

    return;
  } catch (error) {
    throw new Error(`Error exporting data: ${error}`);
  }
};

export { processData, exportData };
