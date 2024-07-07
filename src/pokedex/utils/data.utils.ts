import { plainToClass } from 'class-transformer';
import { set } from 'lodash';

import { PokemonDto } from '../dto';

import type {
  ITransformToPokemonArray,
  ICreateOrderObject,
} from '../interfaces';

export const transformToPokemonArray: ITransformToPokemonArray = (results) =>
  plainToClass(PokemonDto, results).map(
    ({
      id,
      name,
      german_name,
      japanese_name,
      generation,
      rarity,
      species,
      abilities,
      types,
      height,
      weight,
    }) => ({
      id,
      name,
      german_name,
      japanese_name,
      generation,
      rarity,
      species,
      abilities,
      types,
      height,
      weight,
    }),
  );

export const createOrderObject: ICreateOrderObject = (sort, order) => {
  const mapping = {
    id: 'pokedex_id',
    name: 'name.name',
    german_name: 'name.german_name.name',
    japanese_name: 'name.japanese_name.name',
    generation: 'generation.number',
    rarity: 'rarity.level',
    species: 'species.name',
    ability_1: 'ability_1.name',
    ability_2: 'ability_2.name',
    ability_hidden: 'ability_hidden.name',
    type_1: 'type_1.element',
    type_2: 'type_2.element',
    height: 'height.metres',
    weight: 'weight.kg',
  };

  return set({}, mapping[sort], order);
};
