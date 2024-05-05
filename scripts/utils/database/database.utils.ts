import { AppDataSource as DataSource } from '@shared/db';
import { all as QAll } from 'q';
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
import { filter, isNull, merge } from 'lodash';

import type { DataSource as DataSourceType } from '@shared/db';
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

type Entities = {
  name: Name;
  generation: Generation;
  rarity: Rarity;
  species: Species;
  ability1: Ability;
  ability2: Ability;
  abilityHidden: Ability;
  type1: Type;
  type2: Type;
  height: Height;
  weight: Weight;
  pokemon: Pokemon;
};

type ImportNamesReturnType = Promise<Partial<Entities>>;
interface ImportNames {
  (db: DataSourceType, datum: PokemonData): ImportNamesReturnType;
}

const importNames: ImportNames = async (db, datum) => {
  const japaneseName = new JapaneseName(datum['japanese_name']);
  const germanName = new GermanName(datum['german_name']);

  const japaneseNameRepository = db.getRepository(JapaneseName);
  const germanNameRepository = db.getRepository(GermanName);

  await QAll([
    japaneseNameRepository.upsert(japaneseName, ['name']),
    germanNameRepository.upsert(germanName, ['name']),
  ]);

  const name = new Name(datum['name'], japaneseName, germanName);

  const nameRepository = db.getRepository(Name);

  await nameRepository.upsert(name, ['name']);

  return {
    name,
  };
};

type ImportAttributesReturnType = Promise<Partial<Entities>>;
interface ImportAttributes {
  (db: DataSourceType, datum: PokemonData): ImportAttributesReturnType;
}

const importAttributes: ImportAttributes = async (db, datum) => {
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

  await QAll([
    generationRepository.upsert(generation, ['number']),
    rarityRepository.upsert(rarity, ['level']),
    speciesRepository.upsert(species, ['name']),
    abilityRepository.upsert(
      filter([ability1, ability2, abilityHidden], ({ name }) => !isNull(name)),
      ['name'],
    ),
    typeRepository.upsert(
      filter([type1, type2], ({ element }) => !isNull(element)),
      ['element'],
    ),
    heightRepository.upsert(height, ['metres']),
    weightRepository.upsert(weight, ['kg']),
  ]);

  return {
    generation,
    rarity,
    species,
    ability1,
    ability2,
    abilityHidden,
    type1,
    type2,
    height,
    weight,
  };
};

type ImportPokemonReturnType = Promise<void>;
interface ImportPokemon {
  (
    db: DataSourceType,
    entities: Partial<Entities>,
    datum: PokemonData,
  ): ImportPokemonReturnType;
}

const importPokemon: ImportPokemon = async (db, entities, datum) => {
  const pokemon = new Pokemon(
    datum['pokedex_number'],
    entities['name'],
    entities['generation'],
    entities['rarity'],
    entities['species'],
    entities['type1'],
    entities['type2'],
    entities['height'],
    entities['weight'],
    entities['ability1'],
    entities['ability2'],
    entities['abilityHidden'],
  );

  const pokemonRepository = db.getRepository(Pokemon);

  await pokemonRepository.upsert(pokemon, ['name']);
};

type ImportDataReturnType = Promise<void>;
interface ImportData {
  (db: DataSourceType, data: PokemonData[]): ImportDataReturnType;
}

const importData: ImportData = async (db, data) => {
  try {
    for (const datum of data) {
      const nameEntity = await importNames(db, datum);
      const attributeEntities = await importAttributes(db, datum);

      await importPokemon(db, merge(nameEntity, attributeEntities), datum);
    }
  } catch (error) {
    throw new Error(`Error importing data: ${error}`);
  }
};

export { createDatabaseConnection, importData };
