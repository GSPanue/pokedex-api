import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsIn,
  MinLength,
} from 'class-validator';

export class GetPokemonDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  public limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public offset?: number = 0;

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
  public sort?: string = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @MinLength(3)
  public order?: string = 'asc';
}

export class GetPokemonByIdDto {
  @IsNumber()
  @Min(1)
  public id: number;
}
