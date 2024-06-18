import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Pokemon,
  Name,
  GermanName,
  JapaneseName,
  Generation,
  Rarity,
  Species,
  Type,
  Height,
  Weight,
  Ability,
} from '@src/entity';

import { PokedexController } from './controllers';
import { PokedexService } from './providers';
import { POKEDEX_SERVICE } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pokemon,
      Name,
      JapaneseName,
      GermanName,
      Generation,
      Rarity,
      Species,
      Type,
      Height,
      Weight,
      Ability,
    ]),
  ],
  controllers: [PokedexController],
  providers: [
    {
      useClass: PokedexService,
      provide: POKEDEX_SERVICE,
    },
  ],
})
export class PokedexModule {}
