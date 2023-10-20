import { useSuspenseQuery } from "@apollo/client";
import { QueryData } from "./types";
import { SELECTED_POKEMON } from "./query";

export default function SelectedPokemonData({ selectedPokemon }: { selectedPokemon: { id: string; name: string } }) {
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
