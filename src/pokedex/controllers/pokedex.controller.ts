import { Controller, Get, Param } from '@nestjs/common';
import { PokedexService } from '../providers';

@Controller()
export class PokedexController {
  constructor(private pokedexService: PokedexService) {}

  @Get('pokedex')
  getPokemon() {
    /**
     * @todo Find all Pokémon
     */

    return this.pokedexService.getPokemon();
  }

  @Get('pokedex/:id')
  getPokemonById(@Param('id') id: number) {
    /**
     * @todo Find Pokémon by ID
     */

    return this.pokedexService.getPokemonById(id);
  }
}
