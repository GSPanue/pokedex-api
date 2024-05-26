import { Module } from '@nestjs/common';

import { PokedexController } from './controllers';
import { PokedexService } from './providers';
import { POKEDEX_SERVICE } from './constants';

@Module({
  controllers: [PokedexController],
  providers: [
    {
      useClass: PokedexService,
      provide: POKEDEX_SERVICE,
    },
  ],
})
export class PokedexModule {}
