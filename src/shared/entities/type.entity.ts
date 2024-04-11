import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['element'])
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  element: string;
}
