import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class JapaneseName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
