import type { IPokemon } from './';
import type { GetPokemonDto, GetPokemonByIdDto } from '../dto';

export interface IPokedexController {
  getPokemon(query: GetPokemonDto): Promise<IPokedexResponse>;

  getPokemonById(params: GetPokemonByIdDto): Promise<IPokedexResponse>;
}

export interface IPokedexService {
  getPokemon(query: GetPokemonDto): Promise<IPokedexResponse>;

  getPokemonById(params: GetPokemonByIdDto): Promise<IPokedexResponse>;
}

export interface IPokedexResponse {
  query?: GetPokemonDto;
  results: IPokemon[];
  count: number;
}
