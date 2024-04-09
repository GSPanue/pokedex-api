import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Height {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  metres: number;
}
