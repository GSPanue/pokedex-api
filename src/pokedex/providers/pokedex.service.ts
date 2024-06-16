import { Injectable } from '@nestjs/common';

import { IPokedexService, IPokemon } from '../interfaces';

import type { GetPokemonDto, GetPokemonByIdDto } from '../dto';

@Injectable()
export class PokedexService implements IPokedexService {
  getPokemon(query: GetPokemonDto): IPokemon[] {
    return [];
  }

  getPokemonById(params: GetPokemonByIdDto): IPokemon[] {
    return [];
  }
}
