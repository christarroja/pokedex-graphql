import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="max-w-screen-2xl w-full mx-auto flex items-center">
      <div className="flex md:flex-row flex-col gap-12 items-center">
        <div className="flex flex-col justify-between">
          <h1 className="text-7xl">Find all your favorite Pokemon</h1>
          <h2 className="text-3xl">You can know the type of Pokemon, its strengths, disadvantages and abilities</h2>
          <Link href={'/pokedex'} className="max-w-fit">
            <button className="bg-[#73D677] rounded-xl px-8 pb-6 pt-4 shadow-[inset_0_-9px_0_0_rgba(0,0,0,0.2)]">
              <span className="text-2xl font-bold">See Pokemon</span>
            </button>
          </Link>
        </div>
        <div className="md:order-last order-first w-full flex items-end relative h-96">
          <Image 
            src={'/hero-banner-min.png'}
            alt={'Hero Banner Pikachu'}
            fill
            style={{ objectFit: "cover"}}
          />

        </div>
      </div>
    </section>
  )
}

export default Hero