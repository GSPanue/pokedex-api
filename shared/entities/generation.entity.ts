import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['number'])
export class Generation {
  constructor(number: number) {
    this.number = number;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  number: number;
}
