import Hero from "@/components/pages/Hero";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-third to-primary">
      <Hero />
      <div className="fixed z-0 md:top-0 top-10 right-0 md:w-1/2 w-full md:h-full h-[600px] pointer-events-none select-none">
        <Image 
          src={'/hero-banner-min.png'}
          alt={'Hero Banner Pikachu'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
    </main>
  )
}
