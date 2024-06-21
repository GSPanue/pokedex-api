import { Expose } from 'class-transformer';

export class AbilityDto {
  @Expose()
  ability_1: string;

  @Expose()
  ability_2: string;

  @Expose()
  ability_hidden: string;
}
