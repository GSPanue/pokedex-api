import {
  Controller,
  Inject,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { POKEDEX_SERVICE } from '../constants';

import type {
  IPokedexController,
  IPokedexService,
  IPokedexResponse,
} from '../interfaces';

@Controller('pokedex')
export class PokedexController implements IPokedexController {
  constructor(
    @Inject(POKEDEX_SERVICE)
    private pokedex: IPokedexService,
  ) {}

  @Get()
  async getPokemon(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('sort') sort: string = '',
    @Query('order') order: string = 'asc',
  ): Promise<IPokedexResponse> {
    /**
     * @todo Find all Pokémon
     */

    return {
      query: {
        limit,
        offset,
        sort,
        order,
      },
      results: this.pokedex.getPokemon(limit, offset, sort, order),
    };
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: number): Promise<IPokedexResponse> {
    /**
     * @todo Find Pokémon by ID
     */

    return {
      results: this.pokedex.getPokemonById(id),
    };
  }
}
