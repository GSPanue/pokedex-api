import { Expose } from 'class-transformer';

export class TypesDto {
  @Expose()
  type_1: string;

  @Expose()
  type_2: string;
}
