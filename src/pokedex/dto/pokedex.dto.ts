import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsIn,
  MinLength,
} from 'class-validator';

import { defaultQuery } from '@common';

export class GetPokemonDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  public limit?: number = defaultQuery.limit;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public offset?: number = defaultQuery.offset;

  @IsOptional()
  @IsIn([
    'id',
    'name',
    'german_name',
    'japanese_name',
    'generation',
    'rarity',
    'species',
    'ability_1',
    'ability_2',
    'ability_hidden',
    'type_1',
    'type_2',
    'height',
    'weight',
  ])
  public sort?: string = defaultQuery.sort;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @MinLength(3)
  public order?: string = defaultQuery.order;
}

export class GetPokemonByIdDto {
  @IsNumber()
  @Min(1)
  public id: number;
}
