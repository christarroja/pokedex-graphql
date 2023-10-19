import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const StickyHeader = () => {
  const pathname = usePathname()

  return (
    <section className="sticky top-0 left-0 w-full h-20 bg-third shadow-lg flex items-center">
      <div className="max-w-screen-2xl w-full mx-auto px-6 flex items-center justify-between">
        <div className="relative w-40 h-16 flex items-center">
          <Image 
            src={'/pokemonLogo.svg'} 
            alt={'Pokémon Logo'} 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <nav className="flex gap-8 text-2xl">
          <button className="px-3 py-2 group">
            <Link href="/" title="Home" className="group-hover:underline group-hover:underline-offset-8">
              Home
            </Link>
          </button>
          <button className="px-3 py-2 group">
            <Link href="/pokedex" title="Home" className="group-hover:underline group-hover:underline-offset-8">
              PokéDex
            </Link>
          </button>
          
        </nav>
      </div>
      
    </section>
  )
}

export default StickyHeader