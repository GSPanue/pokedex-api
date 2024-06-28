import { plainToClass } from 'class-transformer';

import { PokemonDto } from '../dto';

import type { Pokemon } from '@src/entity';
import type { IPokemon } from '../interfaces';

export const transformToPokemonArray = (results: Pokemon[]): IPokemon[] =>
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
