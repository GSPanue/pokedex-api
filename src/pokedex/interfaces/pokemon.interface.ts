export interface IPokemon {
  id: number;
  name: string;
  german_name: string;
  japanese_name: string;
  generation: number;
  rarity: string;
  species: string;
  abilities: {
    ability_1: string | null;
    ability_2: string | null;
    ability_hidden: string | null;
  };
  types: {
    type_1: string;
    type_2: string | null;
  };
  height: {
    value: number;
    unit: string;
  };
  weight: {
    value: number;
    unit: string;
  };
}

export interface IPokedexService {
  getPokemon(
    limit: number,
    offset: number,
    sort: string,
    order: string,
  ): IPokemon[];

  getPokemonById(id: number): IPokemon[];
}
