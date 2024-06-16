import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsString,
  IsIn,
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
  @IsString()
  public sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  public order?: string;
}

export class GetPokemonByIdDto {
  @IsNumber()
  @Min(1)
  public id: number;
}
