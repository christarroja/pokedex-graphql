'use client'

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Fragment, useEffect, useState } from "react";
import { QueryData, Pokemon } from "../graphql/types";
import { ALL_POKEMON } from "../graphql/query";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const pokeTypes = [ 
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel", "Fairy", 
]

export default function ListAllPokemon() {
  const { data: allPokemonData } = useSuspenseQuery<QueryData>(ALL_POKEMON);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [visiblePokemon, setVisiblePokemon] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-20">
      {/* Add the filter UI, you can use buttons or a dropdown to select types */}
      <div className="my-4 flex flex-wrap gap-4">
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
        <Transition show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-screen-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-end py-6 px-6">
                    <button
                      type="button"
                      className="text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6 text-2xl text-center flex flex-col">
                        <div className="px-3 py-2 group" onClick={() => setIsOpen(false)}>
                          <div>
                            <h2>{selectedPokemon.name}</h2>
                            {/* Fetch selected Pokemon data when it's not null */}
                            <PokemonDetails selectedPokemon={selectedPokemon} />
                          </div>
                        </div>
                        <div className="px-3 py-2 group" onClick={() => setIsOpen(false)}>
                          ccc
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </main>
  );
}