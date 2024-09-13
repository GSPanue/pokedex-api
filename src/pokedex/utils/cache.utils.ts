import { ICreateCacheKey } from '../interfaces';

export const createCacheKey: ICreateCacheKey = (value) => {
  return `pokedex:${value}`;
};
