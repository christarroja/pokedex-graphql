'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import MobileDrawer from './MobileDrawer'

const StickyHeader = () => {
  const currentRoute = usePathname()

  return (
    <section className="sticky z-10 top-0 left-0 w-full py-4 bg-third shadow-lg flex items-center">
      <div className="max-w-screen-2xl w-full mx-auto px-6 flex items-center justify-between">
        <div className="relative w-40 py-8 flex items-center">
          <Image 
            src={'/pokemonLogo.svg'} 
            alt={'Pokémon Logo'} 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <nav className="lg:flex hidden gap-8 text-2xl">
          <button className="px-3 py-2 group">
            <Link 
              href="/" 
              title="Home" 
              className={currentRoute === "/"
              ? "underline underline-offset-8"
              : "group-hover:underline group-hover:underline-offset-8"}
            >
              Home
            </Link>
          </button>
          <button className="px-3 py-2 group">
            <Link 
              href="/pokedex" 
              title="PokéDex" 
              className={currentRoute === "/pokedex"
              ? "underline underline-offset-8"
              : "group-hover:underline group-hover:underline-offset-8"}
            >
              PokéDex
            </Link>
          </button>
        </nav>
        <MobileDrawer />
      </div>
      
    </section>
  )
}

export default StickyHeader