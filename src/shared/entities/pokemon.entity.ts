import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokedex_id: number;

  @Column()
  english_name_id: number;

  @Column()
  german_name_id: number;

  @Column()
  japanese_name_id: number;

  @Column()
  generation_id: number;

  @Column()
  rarity_id: number;

  @Column()
  species_id: number;

  @Column()
  type_1_id: number;

  @Column()
  type_2_id: number;

  @Column()
  height_id: number;

  @Column()
  weight_id: number;

  @Column()
  ability_1_id: number;

  @Column()
  ability_2_id: number;

  @Column()
  ability_hidden_id: number;
}
