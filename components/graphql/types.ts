export interface Pokemon {
  id: string;
  name: string;
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