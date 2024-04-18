import { AppDataSource as DataSource } from '@shared/db/data-source';
import {
  Pokemon,
  Name,
  JapaneseName,
  GermanName,
  Generation,
  Rarity,
  Species,
  Ability,
  Type,
  Height,
  Weight,
} from '@shared/entities';
import { filter, isNull } from 'lodash';

import type { DataSource as DataSourceType } from '@shared/db/data-source';
import type { PokemonData } from '@scripts/shared';

type CreateDatabaseConnectionReturnType = Promise<DataSourceType>;
interface CreateDatabaseConnection {
  (): CreateDatabaseConnectionReturnType;
}

const createDatabaseConnection: CreateDatabaseConnection = async () => {
  try {
    const client = await DataSource.initialize();

    return client;
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
};

type ImportDataReturnType = Promise<void>;
interface ImportData {
  (db: DataSourceType, data: PokemonData[]): ImportDataReturnType;
}

const importData: ImportData = async (db, data) => {
  try {
    for (const datum of data) {
      // Import Japanese & German names
      const japaneseName = new JapaneseName(datum['japanese_name']);
      const germanName = new GermanName(datum['german_name']);

      const japaneseNameRepository = db.getRepository(JapaneseName);
      const germanNameRepository = db.getRepository(GermanName);

      await japaneseNameRepository.upsert(japaneseName, ['name']);
      await germanNameRepository.upsert(germanName, ['name']);

      // Import English names
      const name = new Name(datum['name'], japaneseName, germanName);

      const nameRepository = db.getRepository(Name);

      await nameRepository.upsert(name, ['name']);

      // Import Generation, Rarity, Species, Ability, Type, Height & Weight
      const generation = new Generation(datum['generation']);
      const rarity = new Rarity(datum['status']);
      const species = new Species(datum['species']);
      const ability1 = new Ability(datum['ability_1']);
      const ability2 = new Ability(datum['ability_2']);
      const abilityHidden = new Ability(datum['ability_hidden']);
      const type1 = new Type(datum['type_1']);
      const type2 = new Type(datum['type_2']);
      const height = new Height(datum['height_m']);
      const weight = new Weight(datum['weight_kg']);

      const generationRepository = db.getRepository(Generation);
      const rarityRepository = db.getRepository(Rarity);
      const speciesRepository = db.getRepository(Species);
      const abilityRepository = db.getRepository(Ability);
      const typeRepository = db.getRepository(Type);
      const heightRepository = db.getRepository(Height);
      const weightRepository = db.getRepository(Weight);

      await generationRepository.upsert(generation, ['number']);
      await rarityRepository.upsert(rarity, ['level']);
      await speciesRepository.upsert(species, ['name']);
      await abilityRepository.upsert(
        filter(
          [ability1, ability2, abilityHidden],
          ({ name }) => !isNull(name),
        ),
        ['name'],
      );
      await typeRepository.upsert(
        filter([type1, type2], ({ element }) => !isNull(element)),
        ['element'],
      );
      await heightRepository.upsert(height, ['metres']);
      await weightRepository.upsert(weight, ['kg']);

      // Import Pokemon
      const pokemon = new Pokemon(
        datum['pokedex_number'],
        name,
        generation,
        rarity,
        species,
        type1,
        type2,
        height,
        weight,
        ability1,
        ability2,
        abilityHidden,
      );

      const pokemonRepository = db.getRepository(Pokemon);

      await pokemonRepository.upsert(pokemon, ['name']);
    }
  } catch (error) {
    throw new Error(`Error importing data: ${error}`);
  }
};

export { createDatabaseConnection, importData };
