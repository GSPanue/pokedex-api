import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['level'])
export class Rarity {
  constructor(level: string) {
    this.level = level;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;
}
