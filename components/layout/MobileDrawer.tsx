'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileDrawer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentRoute = usePathname()

  return (
    <header className="lg:hidden flex ">
      <div className="flex ">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 bg-black bg-opacity-40" />

        <Dialog.Panel className="fixed top-0 right-0 z-10 w-full sm:h-screen h-auto pb-20 sm:rounded-none rounded-b-3xl bg-gradient-to-b from-third to-primary sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-lg">
          <div className="flex items-center justify-between h-20 px-6">
            <a href="/" >
              <span className="sr-only">Your Company</span>
              <Image
                src={"/pokeball.png"} 
                alt={'icon'}
                width={45}
                height={45}
              />
            </a>
            <button
              type="button"
              className="text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 text-2xl text-center flex flex-col">
                <div className="px-3 py-2 group" onClick={() => setMobileMenuOpen(false)}>
                  <Link 
                    href="/" 
                    title="Home" 
                    className={`block
                      ${currentRoute === "/"
                      ? "underline underline-offset-8"
                      : "group-hover:underline group-hover:underline-offset-8"}`}
                  >
                    Home
                  </Link>
                </div>
                <div className="px-3 py-2 group" onClick={() => setMobileMenuOpen(false)}>
                  <Link 
                    href="/pokedex" 
                    title="PokéDex" 
                    className={`block
                      ${currentRoute === "/pokedex"
                      ? "underline underline-offset-8"
                      : "group-hover:underline group-hover:underline-offset-8"}`}
                  >
                    PokéDex
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
