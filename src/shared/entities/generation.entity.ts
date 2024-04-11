import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['number'])
export class Generation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;
}
