import { Controller, Inject, Get, Query, Param } from '@nestjs/common';

import { POKEDEX_SERVICE } from '../constants';
import { GetPokemonDto, GetPokemonByIdDto } from '../dto';

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
  async getPokemon(@Query() query: GetPokemonDto): Promise<IPokedexResponse> {
    /**
     * @todo Find all Pokémon
     */

    const { results, count } = await this.pokedex.getPokemon(query);

    return {
      query,
      results,
      count,
    };
  }

  @Get(':id')
  async getPokemonById(
    @Param() params: GetPokemonByIdDto,
  ): Promise<IPokedexResponse> {
    /**
     * @todo Find Pokémon by ID
     */

    const { results, count } = await this.pokedex.getPokemonById(params);

    return {
      results,
      count,
    };
  }
}
