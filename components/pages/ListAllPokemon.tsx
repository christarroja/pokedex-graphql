'use client'

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Fragment, useState } from "react";
import { QueryData, Pokemon } from "../graphql/types";
import { FIRST_20_POKEMON } from "../graphql/query";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ListAllPokemon() {
  const { data: allPokemonData } = useSuspenseQuery<QueryData>(FIRST_20_POKEMON);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-20">
      <div className="flex flex-wrap gap-8 items-center justify-evenly">
        {allPokemonData &&
          allPokemonData.pokemons &&
          allPokemonData.pokemons.map((pokemon) => (
            <div 
              key={pokemon.id} 
              onClick={() => {
                setSelectedPokemon(pokemon); 
                setIsOpen(true);
              }} 
              className="cursor-pointer"
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