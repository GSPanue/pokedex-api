import { Module } from '@nestjs/common';

import { PokedexModule } from './pokedex';

@Module({
  imports: [PokedexModule],
})
export class AppModule {}
