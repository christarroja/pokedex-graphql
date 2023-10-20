"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { QueryData } from "./types";
import { ALL_POKEMON } from "./query";
import SelectedPokemonData from "./PokemonDetails";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

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

