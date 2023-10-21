import Image from "next/image";

interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    image: string;
    maxHP: number;
    maxCP: number;
    types: string[];
    classification: string;
  };
}

const getPokemonTypeStyles = (type: string) => {
  switch (type) {
    case "Normal":
    case "Fighting":
    case "Flying":
    case "Steel":
    case "Fairy":
      return "bg-gray-500";
    case "Fire":
      return "bg-red-500";
    case "Ice":
    case "Water":
      return "bg-blue-500";
    case "Grass":
    case "Bug":
    case "Rock":
      return "bg-green-500";
    case "Dark":
    case "Poison":
    case "Psychic":
      return "bg-violet-500";
    case "Electric":
      return "bg-amber-500";
    default:
      return "bg-gray-400";
  }
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg w-[351px] h-36 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 z-0 w-2/5 h-full ${getPokemonTypeStyles(pokemon.types[0])}`}
      />
      <div className="relative flex gap-2 w-full h-full">
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
        <div className="relative w-1/2 h-full">
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
