import { Injectable } from '@nestjs/common';

@Injectable()
export class PokedexService {
  getPokemon() {
    return [];
  }

  getPokemonById(id) {
    return [id];
  }
}
