import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class JapaneseName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
