import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['kg'])
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 8, scale: 2 })
  kg: number;
}
