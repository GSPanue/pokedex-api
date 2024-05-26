import { Controller, Get, Query, Param } from '@nestjs/common';
import { IPokedexService, IPokemon } from '../interfaces';

@Controller()
export class PokedexController {
  constructor(private pokedex: IPokedexService) {}

  @Get('pokedex')
  async getPokemon(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('sort') sort: string = '',
    @Query('order') order: string = 'asc',
  ): Promise<IPokemon[]> {
    /**
     * @todo Find all Pokémon
     */

    return this.pokedex.getPokemon(limit, offset, sort, order);
  }

  @Get('pokedex/:id')
  async getPokemonById(@Param('id') id: number): Promise<IPokemon[]> {
    /**
     * @todo Find Pokémon by ID
     */

    return this.pokedex.getPokemonById(id);
  }
}
