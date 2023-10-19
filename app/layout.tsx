import type { Metadata } from 'next'
import './globals.css'
import { ApolloWrapper } from "@/lib/apolloProvider";
import StickyHeader from '@/components/layout/StickyHeader';
import { Karla } from 'next/font/google'

const karla = Karla({ 
  subsets: ['latin'],
  display: 'swap', 
})

export const metadata: Metadata = {
  title: "PokeDex",
  description: "A simple app that consumes Pokemon data from a GraphQL API",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={karla.className}>
      <ApolloWrapper>
        <body className="bg-gradient-to-b from-third to-primary h-screen">
          <StickyHeader />
            {children}
        </body>
      </ApolloWrapper>
    </html>
  )
}
