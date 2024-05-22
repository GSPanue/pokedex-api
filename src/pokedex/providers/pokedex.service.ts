import { Injectable } from '@nestjs/common';

@Injectable()
export class PokedexService {
  getPokemon({ limit, offset, sort, order }) {
    return [];
  }

  getPokemonById(id) {
    return [id];
  }
}
