import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  level: string;
}
