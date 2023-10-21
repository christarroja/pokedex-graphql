import { useSuspenseQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { QueryData } from "../graphql/types";
import { SELECTED_POKEMON } from "../graphql/query";
import Image from "next/image";
import { getPokemonTypeStyles } from "./PokemonTypeStyles";

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
      <div className="flex flex-wrap w-full">
        <div className="md:w-1/2 w-full relative p-6">
          <div className="relative w-full h-96">
            <Image 
              src={selectedPokemonData.pokemon.image} 
              alt={selectedPokemonData.pokemon.name} 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute bottom-6 right-6 flex">
            {selectedPokemonData.pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`rounded-full h-min px-3 py-1 ml-2 flex border border-black items-center ${getPokemonTypeStyles(type)}`}
              >
                <span className="text-xs text-white">{type}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`md:w-1/2 w-full grid grid-cols-4 p-6 ${getPokemonTypeStyles(selectedPokemonData.pokemon.types[0])}`}>
          <p>Classification: {selectedPokemonData.pokemon.classification}</p>

        </div>
        
        {/* Display other details as needed */}
      </div>
    );
  }
  return <p>Loading...</p>;
}
