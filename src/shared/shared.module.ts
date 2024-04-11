import { Module } from '@nestjs/common';

import {
  Pokemon,
  Name,
  Type,
  Generation,
  Height,
  Rarity,
  Weight,
  Species,
  Ability,
} from '@shared/entities';

@Module({
  providers: [
    Pokemon,
    Name,
    Type,
    Generation,
    Height,
    Rarity,
    Weight,
    Species,
    Ability,
  ],
  exports: [
    Pokemon,
    Name,
    Type,
    Generation,
    Height,
    Rarity,
    Weight,
    Species,
    Ability,
  ],
})
export class SharedModule {}
