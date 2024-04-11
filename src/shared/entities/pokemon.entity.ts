import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Rarity } from './rarity.entity';
import { Species } from './species.entity';
import { Type } from './type.entity';
import { Height } from './height.entity';
import { Weight } from './weight.entity';
import { Ability } from './ability.entity';
import { Generation } from './generation.entity';
import { Name } from './name.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokedex_id: number;

  @OneToOne(() => Name)
  @JoinColumn()
  name: Name;

  @ManyToOne(() => Generation)
  generation: Generation;

  @ManyToOne(() => Rarity)
  rarity: Rarity;

  @ManyToOne(() => Species)
  species: Species;

  @ManyToOne(() => Type)
  type1: Type;

  @ManyToOne(() => Type)
  type2: Type;

  @ManyToOne(() => Height)
  height: Height;

  @ManyToOne(() => Weight)
  weight: Weight;

  @ManyToOne(() => Ability)
  ability1: Ability;

  @ManyToOne(() => Ability)
  ability2: Ability;

  @ManyToOne(() => Ability)
  ability_hidden: Ability;
}
