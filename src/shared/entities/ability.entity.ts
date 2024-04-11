import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Ability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
