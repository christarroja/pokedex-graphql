export const getPokemonTypeStyles = (type: string) => {
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