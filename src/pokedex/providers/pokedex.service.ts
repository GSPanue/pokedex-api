import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon } from '@entities';
import { calculateSkip } from '@common';
import { transformToPokemonArray, createOrderObject } from '../utils';

import type {
  IPokedexResponse,
  IPokedexService,
  IPokemon,
} from '../interfaces';
import type { GetPokemonDto, GetPokemonByIdDto } from '../dto';

@Injectable()
export class PokedexService implements IPokedexService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async getPokemon(query: GetPokemonDto): Promise<IPokedexResponse> {
    const { limit, offset, sort, order } = query;

    const skip = calculateSkip(limit, offset);

    const [results, count] = await this.pokemonRepository.findAndCount({
      skip,
      take: limit,
      order: createOrderObject(sort, order),
    });

    const transformedResults: IPokemon[] = transformToPokemonArray(results);

    return {
      results: transformedResults,
      count,
    };
  }

  async getPokemonById(params: GetPokemonByIdDto): Promise<IPokedexResponse> {
    return {
      results: [],
      count: 0,
    };
  }
}
