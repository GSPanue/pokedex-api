import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  element: string;
}
