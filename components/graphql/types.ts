export interface Pokemon {
  id: string;
  name: string;
  image: string;
  maxHP: number;
  maxCP: number;
  types: string[];
}

export interface QueryData {
  pokemons: Pokemon[];
  pokemon: {
    id: string;
    name: string;
    image: string;
    maxHP: number;
    maxCP: number;
    types: string[];
    number: string;
    resistant: string[];
    weaknesses: string[];
    fleeRate: number;
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
    classification: string;
  };
}

export interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    image: string;
    maxHP: number;
    maxCP: number;
    types: string[];
    // classification: string;
  };
}