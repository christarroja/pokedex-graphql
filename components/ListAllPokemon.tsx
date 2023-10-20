"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

interface Pokemon {
  id: string;
  name: string;
}

interface QueryData {
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

const ALL_POKEMON = gql`
  query AllPokemon {
    pokemons(first: 20) {
      id
      name
    }
  }
`;

const SELECTED_POKEMON = gql`
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

export default function ListAllPokemon() {
  const { data: allPokemonData } = useSuspenseQuery<QueryData>(ALL_POKEMON);
  const [selectedPokemon, setSelectedPokemon] = useState<{ id: string; name: string } | null>(null);

  return (
    <main>
      {allPokemonData && allPokemonData.pokemons && (
        <ul>
          {allPokemonData.pokemons.map((pokemon) => (
            <li
              key={pokemon.id}
              onClick={() => setSelectedPokemon({ id: pokemon.id, name: pokemon.name })}
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}

      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          {/* Fetch selected Pokemon data when it's not null */}
          <SelectedPokemonData selectedPokemon={selectedPokemon} />
        </div>
      )}
    </main>
  );
}

function SelectedPokemonData({ selectedPokemon }: { selectedPokemon: { id: string; name: string } }) {
  const { data: selectedPokemonData } = useSuspenseQuery<QueryData>(SELECTED_POKEMON, {
    variables: selectedPokemon,
  });

  if (selectedPokemonData && selectedPokemonData.pokemon) {
    return (
      <div>
        <img src={selectedPokemonData.pokemon.image} alt={selectedPokemonData.pokemon.name} />
        <p>Classification: {selectedPokemonData.pokemon.classification}</p>
        {/* Display other details as needed */}
      </div>
    );
  }
  return <p>Loading...</p>;
}
