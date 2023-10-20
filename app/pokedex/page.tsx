import ListAllPokemon from "@/components/graphql/ListAllPokemon";

export default async function Page() {
  return (
    <main className="flex-1 bg-white">
      <ListAllPokemon />
    </main>
  )
}