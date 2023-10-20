import { gql } from "@apollo/client";

export const FIRST_20_POKEMON = gql`
  query First20Pokemon {
    pokemons(first: 20) {
      id
      name
      image
      maxHP
      maxCP
      types
      classification
    }
  }
`;

export const SELECTED_POKEMON = gql`
  query SelectedPokemon($id: String!, $name: String!) {
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