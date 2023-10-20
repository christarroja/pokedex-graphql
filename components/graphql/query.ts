import { gql } from "@apollo/client";

export const ALL_POKEMON = gql`
  query AllPokemon {
    pokemons(first: 20) {
      id
      name
    }
  }
`;

export const SELECTED_POKEMON = gql`
  query GetPokemon($id: String!, $name: String!) {
    pokemon(id: $id, name: $name) {
      id
      name
      weight {
        minimum
        maximum
      }
      types
      classification
      image
    }
  }
`;