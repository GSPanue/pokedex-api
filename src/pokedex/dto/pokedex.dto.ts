import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';

export class GetPokemonDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  public limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public offset?: number;

  @IsOptional()
  @IsString()
  public sort?: string;

  @IsOptional()
  @IsString()
  public order?: string;
}

export class GetPokemonByIdDto {
  @IsNumber()
  public id: number;
}
