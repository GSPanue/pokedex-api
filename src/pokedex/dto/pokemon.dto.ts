import { Exclude, Expose, Transform } from 'class-transformer';

import { AbilityDto } from './ability.dto';
import { TypesDto } from './types.dto';
import { HeightDto } from './height.dto';
import { WeightDto } from './weight.dto';

export class PokemonDto {
  @Exclude()
  pokedex_id: number;

  @Exclude()
  type_1: object;

  @Exclude()
  type_2: object;

  @Exclude()
  ability_1: object;

  @Exclude()
  ability_2: object;

  @Exclude()
  ability_hidden: object;

  @Exclude()
  name_id: number;

  @Expose()
  @Transform(({ obj: { pokedex_id } }) => pokedex_id)
  id: number;

  @Expose()
  @Transform(
    ({
      obj: {
        name: { name },
      },
    }) => name,
  )
  name: string;

  @Expose()
  @Transform(
    ({
      obj: {
        name: {
          german_name: { name },
        },
      },
    }) => name,
  )
  german_name: string;

  @Expose()
  @Transform(
    ({
      obj: {
        name: {
          japanese_name: { name },
        },
      },
    }) => name,
  )
  japanese_name: string;

  @Expose()
  @Transform(
    ({
      obj: {
        generation: { number },
      },
    }) => number,
  )
  generation: number;

  @Expose()
  @Transform(
    ({
      obj: {
        rarity: { level },
      },
    }) => level,
  )
  rarity: string;

  @Expose()
  @Transform(
    ({
      obj: {
        species: { name },
      },
    }) => name,
  )
  species: string;

  @Expose()
  @Transform(({ obj: { ability_1, ability_2, ability_hidden } }) => ({
    ability_1: ability_1 ? ability_1.name : null,
    ability_2: ability_2 ? ability_2.name : null,
    ability_hidden: ability_hidden ? ability_hidden.name : null,
  }))
  abilities: AbilityDto;

  @Expose()
  @Transform(({ obj: { type_1, type_2 } }) => ({
    type_1: type_1.element,
    type_2: type_2 ? type_2.element : null,
  }))
  types: TypesDto;

  @Expose()
  @Transform(
    ({
      obj: {
        height: { metres },
      },
    }) => ({
      value: parseFloat(metres),
      unit: 'metres',
    }),
  )
  height: HeightDto;

  @Expose()
  @Transform(
    ({
      obj: {
        weight: { kg },
      },
    }) => ({
      value: parseFloat(kg),
      unit: 'kilograms',
    }),
  )
  weight: WeightDto;
}
