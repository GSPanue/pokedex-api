import { Injectable } from '@nestjs/common';

import { IPokedexService, IPokemon } from '../interfaces';

@Injectable()
export class PokedexService implements IPokedexService {
  getPokemon(
    limit: number,
    offset: number,
    sort: string,
    order: string,
  ): IPokemon[] {
    return [];
  }

  getPokemonById(id: number): IPokemon[] {
    return [];
  }
}
