import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const POKEMON_LIST = gql`
  query {
    pokemons(first: 20) {
      id
      name
    }
  }
`;

const PokemonList: React.FC = () => {
  const { loading, error, data } = useQuery(POKEMON_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.pokemons.map((pokemon: { id: string; name: string }) => (
        <li key={pokemon.id}>{pokemon.name}</li>
      ))}
    </ul>
  );
};

export default PokemonList;
