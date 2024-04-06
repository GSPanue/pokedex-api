type PokemonData = {
  pokedex_number: number | null;
  name: string | null;
  german_name: string | null;
  japanese_name: string | null;
  generation: number | null;
  status: string | null;
  species: string | null;
  type_1: string | null;
  type_2: string | null;
  height_m: number | null;
  weight_kg: number | null;
  ability_1: string | null;
  ability_2: string | null;
  ability_hidden: string | null;
};

type PokemonDataKeys = keyof PokemonData;

type Config = {
  filename: string;
  keys: {
    requiredKeys: Array<PokemonDataKeys>;
    selectedKeys: Array<PokemonDataKeys>;
  };
  inputPath: string;
  outputPath: string;
};

export { Config, PokemonData };
