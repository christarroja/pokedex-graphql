import Image from "next/image";
import { PokemonCardProps } from "../graphql/types";
import { getPokemonTypeStyles } from "./PokemonTypeStyles";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg w-[351px] h-36 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 z-0 w-2/5 h-full ${getPokemonTypeStyles(pokemon.types[0])}`}
      />
      <div className="relative flex w-full h-full">
        <div className="grid grid-cols-4 grid-rows-4 w-1/2 py-2 px-6 text-white">
          <div className="col-span-4 text-xl font-semibold">{pokemon.name}</div>
          <div className="col-span-2 row-span-2 text-xs">
            <div className="border-2 border-black rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-extrabold">{pokemon.maxHP}</span>
            </div>
            <p className="text-gray-700">Max HP</p>
          </div>
          <div className="col-span-2 row-span-2 text-xs">
            <div className="border-2 border-black rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-extrabold">{pokemon.maxCP}</span>
            </div>
            <p className="text-gray-700">Max CP</p>
          </div>
          <div className="col-span-4 flex">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`rounded-full h-min px-3 py-1 mr-2 flex border border-black items-center ${getPokemonTypeStyles(type)}`}
              >
                <span className="text-xs text-white">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-3/5 h-full">
          <Image 
            src={pokemon.image} 
            alt={pokemon.name} 
            fill
            className="object-cover mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
