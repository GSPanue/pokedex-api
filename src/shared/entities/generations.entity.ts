import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Generations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number;
}
