import { Controller, Inject, Get, Query, Param } from '@nestjs/common';

import { POKEDEX_SERVICE } from '../constants';

import type { GetPokemonDto, GetPokemonByIdDto } from '../dto';
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

    return {
      query,
      results: this.pokedex.getPokemon(query),
    };
  }

  @Get(':id')
  async getPokemonById(
    @Param() params: GetPokemonByIdDto,
  ): Promise<IPokedexResponse> {
    /**
     * @todo Find Pokémon by ID
     */

    return {
      results: this.pokedex.getPokemonById(params),
    };
  }
}
