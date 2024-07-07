import type { Pokemon } from '@entities';
import type { IPokemon } from '../interfaces';

export interface ITransformToPokemonArray {
  (results: Pokemon[]): IPokemon[];
}

export interface ICreateOrderObject {
  (sort: string, order: string): object;
}
