export interface Pokemon {
  id: string;
  name: string;
  image: string;
  maxHP: number;
  maxCP: number;
  types: string[];
  classification: string;
}

export interface QueryData {
  pokemons: Pokemon[];
  pokemon: {
    id: string;
    name: string;
    weight: {
      minimum: string;
      maximum: string;
    };
    types: string[];
    classification: string;
    image: string;
  };
}