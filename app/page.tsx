// import PokemonList from '@/components/pokemonList';
import type { Metadata } from 'next'
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <div>
      <main>
        <Image 
          src={'/pokemonLogo.svg'} 
          alt={'Pokémon Logo'} 
          width={998}
          height={371}
        />
        <h1>Pokemon List</h1>
        {/* <PokemonList /> */}
      </main>
    </div>
  );
};

export default Home;
