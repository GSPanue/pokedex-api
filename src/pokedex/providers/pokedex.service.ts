import { Injectable } from '@nestjs/common';

@Injectable()
export class PokedexService {
  getPokemon(limit: number, offset: number, sort: string, order: string) {
    return [];
  }

  getPokemonById(id) {
    return [id];
  }
}
