import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';

import { JapaneseName } from './japanese_name.entity';
import { GermanName } from './german_name.entity';

@Entity()
@Unique(['name'])
export class Name {
  constructor(
    name: string,
    japaneseName: JapaneseName,
    germanName: GermanName,
  ) {
    this.name = name;
    this.japanese_name = japaneseName;
    this.german_name = germanName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => JapaneseName, { nullable: false })
  japanese_name: JapaneseName;

  @ManyToOne(() => GermanName, { nullable: false })
  german_name: GermanName;
}
