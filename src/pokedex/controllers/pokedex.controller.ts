import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class PokedexController {
  constructor(private readonly pokemonService) {}

  @Get()
  getPokemon() {
    /**
     * @todo Find all Pokémon
     */

    return this.pokemonService.getPokemon();
  }

  @Get(':id')
  getPokemonById(@Param('id') id: number) {
    /**
     * @todo Find Pokémon by ID
     */

    return this.pokemonService.getPokemonById(id);
  }
}
