import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokedexService } from '../providers';

@Controller()
export class PokedexController {
  constructor(private pokedex: PokedexService) {}

  @Get('pokedex')
  getPokemon(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('sort') sort: string = '',
    @Query('order') order: string = 'asc',
  ) {
    /**
     * @todo Find all Pokémon
     */

    return this.pokedex.getPokemon(limit, offset, sort, order);
  }

  @Get('pokedex/:id')
  getPokemonById(@Param('id') id: number) {
    /**
     * @todo Find Pokémon by ID
     */

    return this.pokedex.getPokemonById(id);
  }
}
