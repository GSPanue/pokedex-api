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
  constructor(
    pokedexId: number,
    name: Name,
    generation: Generation,
    rarity: Rarity,
    species: Species,
    type1: Type,
    type2: Type,
    height: Height,
    weight: Weight,
    ability1: Ability,
    ability2: Ability,
    abilityHidden: Ability,
  ) {
    this.pokedex_id = pokedexId;
    this.name = name;
    this.generation = generation;
    this.rarity = rarity;
    this.species = species;
    this.type_1 = type1;
    this.type_2 = type2;
    this.height = height;
    this.weight = weight;
    this.ability_1 = ability1;
    this.ability_2 = ability2;
    this.ability_hidden = abilityHidden;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  pokedex_id: number;

  @Column({ nullable: false })
  name_id: number;

  @OneToOne(() => Name, { nullable: false })
  @JoinColumn({ name: 'name_id' })
  name: Name;

  @ManyToOne(() => Generation, { nullable: false })
  generation: Generation;

  @ManyToOne(() => Rarity, { nullable: false })
  rarity: Rarity;

  @ManyToOne(() => Species, { nullable: false })
  species: Species;

  @ManyToOne(() => Type, { nullable: false })
  type_1: Type;

  @ManyToOne(() => Type, { nullable: true })
  type_2: Type;

  @ManyToOne(() => Height, { nullable: false })
  height: Height;

  @ManyToOne(() => Weight, { nullable: false })
  weight: Weight;

  @ManyToOne(() => Ability, { nullable: true })
  ability_1: Ability;

  @ManyToOne(() => Ability, { nullable: true })
  ability_2: Ability;

  @ManyToOne(() => Ability, { nullable: true })
  ability_hidden: Ability;
}
