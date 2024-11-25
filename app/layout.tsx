import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apolloProvider";
import StickyHeader from "@/components/layout/StickyHeader";
import { Karla } from "next/font/google";
import Footer from "@/components/layout/Footer";

const karla = Karla({ 
  subsets: ["latin"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "PokeDex",
  description: "A simple app that consumes Pokemon data from a GraphQL API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={karla.className}>
      <ApolloWrapper>
        <body className="flex flex-col h-screen">
          <StickyHeader />
          {children}
          <Footer />
        </body>
      </ApolloWrapper>
    </html>
  );
}
