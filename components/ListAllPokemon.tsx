"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface Pokemon {
  id: string;
  name: string;
}

interface QueryData {
  pokemons: Pokemon[];
}

const query = gql`
  query {
    pokemons(first: 20) {
      id
      name
    }
  }
`;

export default function ListAllPokemon() {
  const { data } = useSuspenseQuery<QueryData>(query);

  return (
    <main>
      {data && data.pokemons && (
        <ul>
          {data.pokemons.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}