import { gql } from "@apollo/client";

export const ALL_POKEMON = gql`
  query AllPokemon {
    pokemons(first: 151) {
      id
      name
      image
      maxHP
      maxCP
      types
    }
  }
`;

export const SELECTED_POKEMON = gql`
  query SelectedPokemon($id: String!, $name: String!) {
    pokemon(id: $id, name: $name) {
      id
      name
      number
      types
      resistant
      weaknesses
      fleeRate
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      image
      maxHP
      maxCP
    }
  }
`;