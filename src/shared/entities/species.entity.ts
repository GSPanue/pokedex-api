import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
