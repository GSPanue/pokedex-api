import { replace } from 'lodash';

type RemovePokemonFromSpeciesReturnType = string;
interface RemovePokemonFromSpecies {
  (species: string): RemovePokemonFromSpeciesReturnType;
}

const removePokemonFromSpecies: RemovePokemonFromSpecies = (species) =>
  replace(species, /Pok(é|e)mon/i, '');

export { removePokemonFromSpecies };
