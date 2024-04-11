import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { JapaneseName } from './japanese_name.entity';
import { GermanName } from './german_name.entity';

@Entity()
export class Name {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => JapaneseName)
  japaneseName: JapaneseName;

  @ManyToOne(() => GermanName)
  germanName: GermanName;
}
