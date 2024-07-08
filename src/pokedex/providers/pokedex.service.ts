import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

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

    // Get the number of items to skip
    const skip = calculateSkip(limit, offset);

    // Fetch results
    const [results, count] = await this.pokemonRepository.findAndCount({
      skip,
      take: limit,
      order: createOrderObject(sort, order),
    });

    // Transform results
    const transformedResults: IPokemon[] = transformToPokemonArray(results);

    return {
      results: transformedResults,
      count,
    };
  }

  async getPokemonById(params: GetPokemonByIdDto): Promise<IPokedexResponse> {
    const { id } = params;

    // Fetch results
    const [results, count] = await this.pokemonRepository.findAndCount({
      where: {
        pokedex_id: id,
      },
      order: {
        id: 'asc',
      },
    });

    // Transform results
    const transformedResults: IPokemon[] = transformToPokemonArray(results);

    // Check if results are empty, throw an error if so
    const hasNoResults = isEmpty(results);

    if (hasNoResults) throw new NotFoundException(`Not Found`);

    return {
      results: transformedResults,
      count,
    };
  }
}
