import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['level'])
export class Rarity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;
}
