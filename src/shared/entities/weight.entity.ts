import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['kg'])
export class Weight {
  constructor(kg: number) {
    this.kg = kg;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { nullable: false, precision: 8, scale: 2 })
  kg: number;
}
