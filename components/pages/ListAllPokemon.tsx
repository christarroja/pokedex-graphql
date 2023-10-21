'use client'

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect, useState } from "react";
import { QueryData, Pokemon } from "../graphql/types";
import { ALL_POKEMON } from "../graphql/query";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const pokeTypes = [ 
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel", "Fairy", 
]

export default function ListAllPokemon() {
  const { data: allPokemonData } = useSuspenseQuery<QueryData>(ALL_POKEMON);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [visiblePokemon, setVisiblePokemon] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (allPokemonData && allPokemonData.pokemons) {
      if (selectedTypes.length > 0) {
        const filteredPokemon = allPokemonData.pokemons.filter((pokemon) =>
          selectedTypes.every((type) => pokemon.types.includes(type))
        );
        setVisiblePokemon(filteredPokemon);
      } else {
        setVisiblePokemon(allPokemonData.pokemons.slice(0, 20));
      }
    }
  }, [allPokemonData, selectedTypes]);

  const handleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Function to handle user input in the search field
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter Pokémon based on the search query (for example, based on name)
    const filtered = allPokemonData.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setVisiblePokemon(filtered);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-6 pt-6 pb-20">
      {/* search input field */}
      <div className="my-4">

        <input 
          type="text" 
          id="search-pokemon" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* filter UI */}
      <div className="my-6 flex flex-wrap justify-center gap-4">
        {pokeTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeFilter(type)}
            className={`px-3 py-1 rounded-full text-xs ${
              selectedTypes.includes(type) ? "bg-gray-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Display cards */}
      <div className="flex flex-wrap gap-8 items-center justify-evenly">
        {visiblePokemon.map((pokemon) => (
          <div 
            key={pokemon.id} 
            className="cursor-pointer"
            onClick={() => {
              setSelectedPokemon(pokemon); 
              setIsOpen(true);
              console.log(pokemon)
            }} 
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="relative w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">

                {/* Close button */}
                <div className="fixed top-4 right-4 z-50 text-gray-500 hover:text-gray-600">
                  <button
                    type="button"
                    className="text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                {/* <h2>{selectedPokemon.name}</h2> */}
                {/* Fetch selected Pokemon data when it's not null */}
                <PokemonDetails selectedPokemon={selectedPokemon} />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>

      )}
    </main>
  );
}