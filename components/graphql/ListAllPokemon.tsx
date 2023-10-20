"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";
import { QueryData, Pokemon } from "./types";
import { FIRST_20_POKEMON } from "./query";
import PokemonCard from "../pages/PokemonCard";
import PokemonDetails from "./PokemonDetails";

export default function ListAllPokemon() {
  const { data: allPokemonData } = useSuspenseQuery<QueryData>(FIRST_20_POKEMON);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-20">
      <div className="flex flex-wrap gap-8 items-center justify-evenly">
        {allPokemonData &&
          allPokemonData.pokemons &&
          allPokemonData.pokemons.map((pokemon) => (
            <div key={pokemon.id} onClick={() => setSelectedPokemon(pokemon)} className="cursor-pointer">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
      </div>
      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          {/* Fetch selected Pokemon data when it's not null */}
          <PokemonDetails selectedPokemon={selectedPokemon} />
        </div>
      )}
    </main>
  );
}