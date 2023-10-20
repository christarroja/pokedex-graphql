import { useSuspenseQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { QueryData } from "./types";
import { SELECTED_POKEMON } from "./query";
import Image from "next/image";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

export default function PokemonDetails({ selectedPokemon }: { selectedPokemon: { id: string; name: string } }) {
  const { data: selectedPokemonData } = useSuspenseQuery<QueryData>(SELECTED_POKEMON, {
    variables: selectedPokemon,
  });

  if (selectedPokemonData && selectedPokemonData.pokemon) {
    return (
      <div>
        <div className="relative w-60 h-80">
          <Image 
            src={selectedPokemonData.pokemon.image} 
            alt={selectedPokemonData.pokemon.name} 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p>Classification: {selectedPokemonData.pokemon.classification}</p>
        {/* Display other details as needed */}
      </div>
    );
  }
  return <p>Loading...</p>;
}
