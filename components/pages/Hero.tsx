import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="max-w-screen-xl w-full h-full mx-auto flex items-center px-6 z-10 relative md:pt-0 pt-80">
      <div className="flex md:flex-row flex-col gap-12  w-full">
        <div className="flex flex-col md:gap-12 gap-6 lg:w-1/2 w-full">
          <h1 className="md:text-7xl text-4xl md:text-left text-center">Find all your favorite Pokemon</h1>
          <h2 className="md:text-3xl text-xl md:text-left text-center">You can know the type of Pokemon, its strengths, disadvantages and abilities</h2>
          <Link href={'/pokedex'} className="md:max-w-fit w-full z-0">
            <button className="bg-[#73D677] active:bg-[#90d891] rounded-xl px-8 pb-6 pt-4 shadow-[inset_0_-9px_0_0_rgba(0,0,0,0.2)] w-full">
              <span className="text-2xl font-bold">See Pokemon</span>
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  )
}

export default Hero