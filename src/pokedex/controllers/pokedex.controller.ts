import {
  Controller,
  Inject,
  Get,
  Query,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { HttpHeaderInterceptor } from '@src/common';
import { IPokedexController, IPokedexService, IPokemon } from '../interfaces';
import { POKEDEX_SERVICE } from '../constants';

@Controller('pokedex')
@UseInterceptors(HttpHeaderInterceptor)
export class PokedexController implements IPokedexController {
  constructor(
    @Inject(POKEDEX_SERVICE)
    private pokedex: IPokedexService,
  ) {}

  @Get()
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

  @Get(':id')
  async getPokemonById(@Param('id') id: number): Promise<IPokemon[]> {
    /**
     * @todo Find Pokémon by ID
     */

    return this.pokedex.getPokemonById(id);
  }
}
