import type { Metadata } from 'next'
import './globals.css'
import { ApolloWrapper } from "@/lib/apolloProvider";

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
    <html lang="en">
      <ApolloWrapper>
        <body>{children}</body>
      </ApolloWrapper>
    </html>
  )
}
