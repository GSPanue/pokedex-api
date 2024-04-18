import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['metres'])
export class Height {
  constructor(metres: number) {
    this.metres = metres;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 8, scale: 2 })
  metres: number;
}
