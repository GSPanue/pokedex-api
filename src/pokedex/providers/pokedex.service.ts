import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon } from '@src/entity';
import { IPokedexService, IPokemon } from '../interfaces';

import type { GetPokemonDto, GetPokemonByIdDto } from '../dto';

@Injectable()
export class PokedexService implements IPokedexService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  getPokemon(query: GetPokemonDto): IPokemon[] {
    return [];
  }

  getPokemonById(params: GetPokemonByIdDto): IPokemon[] {
    return [];
  }
}
