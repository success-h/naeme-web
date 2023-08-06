import { Metadata } from "next";
import Hero from "./components/Hero";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Naeme Events - BOOK YOUR TICKETS SEAMLESSLY",
  description: "Discover amazing events happening around you.",
};
export default async function Home() {
  return (
    <main className="bg-gray-100">
      <Head>
        <meta
          name="google-site-verification"
          content="tiYKhZrgpRhZsF1Ly0VMZ1JeTOxaSIl0pICVYQ0FfGI"
        />
      </Head>
      <Hero />
    </main>
  );
}
