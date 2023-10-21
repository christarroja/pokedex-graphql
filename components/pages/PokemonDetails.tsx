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
        
        <div className={`md:w-1/2 w-full grid grid-cols-3 grid-rows-5 p-8 gap-4 ${getPokemonTypeStyles(selectedPokemonData.pokemon.types[0])}`}>
          <div className="col-span-2 row-span-1">
            <p className="text-4xl font-extrabold text-white">
              {selectedPokemonData.pokemon.name}
            </p>
          </div>
          <div className="col-span-1 row-span-1 flex items-start justify-end">
            <div className="w-14 h-14 rounded-full bg-third flex items-center justify-center">
              #{selectedPokemonData.pokemon.number}
            </div>
          </div>
          <div className="col-span-3 row-span-2 bg-white rounded-xl p-4 shadow-md flex flex-col gap-3 justify-center">
            <p><span className="font-bold mr-1">Classification:</span> {selectedPokemonData.pokemon.classification}</p>
            <p><span className="font-bold mr-1">Resistant to:</span> {selectedPokemonData.pokemon.resistant.join(', ')}</p>
            <p><span className="font-bold mr-1">Weaknesses:</span> {selectedPokemonData.pokemon.weaknesses.join(', ')}</p>
            <p><span className="font-bold mr-1">Flee Rate:</span> {`${(selectedPokemonData.pokemon.fleeRate * 100).toFixed(1)}%`}</p>
          </div>
          <div className="col-span-1 row-span-2 bg-white rounded-xl p-4 shadow-md">
            <span className="font-bold mr-1">Weight:</span>
            <br />
            min: {selectedPokemonData.pokemon.weight.minimum}
            <br />
            max: {selectedPokemonData.pokemon.weight.maximum}
          </div>
          <div className="col-span-1 row-span-2 bg-white rounded-xl p-4 shadow-md">
            <span className="font-bold mr-1">Height:</span>
            <br />
            min: {selectedPokemonData.pokemon.height.minimum}
            <br />
            max: {selectedPokemonData.pokemon.height.maximum}
          </div>
          <div className="col-span-1 row-span-2 bg-white rounded-xl p-4 shadow-md">
            <span className="font-bold mr-1">Max HP:</span>
            {selectedPokemonData.pokemon.maxHP}
            <br />
            <span className="font-bold mr-1">Max CP:</span>
            {selectedPokemonData.pokemon.maxCP}
          </div>
        </div>
      </div>
    );
  }
  return <p>Loading...</p>
}
