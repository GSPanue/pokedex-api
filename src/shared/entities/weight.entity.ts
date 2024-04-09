import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  kg: number;
}
