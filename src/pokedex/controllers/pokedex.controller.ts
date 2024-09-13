import {
  Controller,
  Inject,
  Get,
  Query,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { CacheInterceptor } from '../interceptors';
import { POKEDEX_SERVICE } from '../constants';
import { GetPokemonDto, GetPokemonByIdDto } from '../dto';

import type {
  IPokedexController,
  IPokedexService,
  IPokedexResponse,
} from '../interfaces';

@Controller('pokedex')
@UseInterceptors(CacheInterceptor)
export class PokedexController implements IPokedexController {
  constructor(
    @Inject(POKEDEX_SERVICE)
    private pokedex: IPokedexService,
  ) {}

  @Get()
  async getPokemon(@Query() query: GetPokemonDto): Promise<IPokedexResponse> {
    const response = await this.pokedex.getPokemon(query);

    return {
      query,
      ...response,
    };
  }

  @Get(':id')
  async getPokemonById(
    @Param() params: GetPokemonByIdDto,
  ): Promise<IPokedexResponse> {
    const response = await this.pokedex.getPokemonById(params);

    return {
      ...response,
    };
  }
}
