import { promises as fs } from 'fs';
import { Promise as QPromise } from 'q';
import { parse } from 'papaparse';
import { pick } from 'lodash';

type GetFileReturnType = Promise<string>;
interface GetFile {
  (path: string): GetFileReturnType;
}

const getFile: GetFile = async (path) => {
  try {
    const file = await fs.readFile(path, 'utf8');

    return file;
  } catch (error) {
    throw new Error(`Error retrieving file: ${error}`);
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

      results.push(pick(data, keys));
    };

    await QPromise((resolve, reject) => {
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
    throw new Error(`Error processing data: ${error}`);
  }
};

export { getFile, getData };
