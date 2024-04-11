import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class GermanName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
