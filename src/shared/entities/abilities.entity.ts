import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Abilities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
