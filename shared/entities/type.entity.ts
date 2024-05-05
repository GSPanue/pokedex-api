import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['element'])
export class Type {
  constructor(element: string) {
    this.element = element;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  element: string;
}
