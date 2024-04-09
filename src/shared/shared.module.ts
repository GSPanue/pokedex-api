import { Module } from '@nestjs/common';

import {
  Pokemon,
  EnglishName,
  JapaneseName,
  GermanName,
  Types,
  Generations,
  Height,
  Rarity,
  Weight,
  Species,
  Abilities,
} from '@shared/entities';

@Module({
  providers: [],
  exports: [
    Pokemon,
    EnglishName,
    JapaneseName,
    GermanName,
    Types,
    Generations,
    Height,
    Rarity,
    Weight,
    Species,
    Abilities,
  ],
})
export class SharedModule {}
