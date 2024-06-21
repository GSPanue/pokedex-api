import { Expose } from 'class-transformer';

export class HeightDto {
  @Expose()
  value: number;

  @Expose()
  unit: string = 'metres';
}
