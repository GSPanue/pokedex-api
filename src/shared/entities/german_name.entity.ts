import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GermanName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
