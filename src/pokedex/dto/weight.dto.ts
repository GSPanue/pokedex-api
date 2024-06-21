import { Expose } from 'class-transformer';

export class WeightDto {
  @Expose()
  value: number;

  @Expose()
  unit: string = 'kilograms';
}
