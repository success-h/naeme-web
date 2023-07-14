import { Metadata } from "next";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: "Naeme Events - BOOK YOUR TICKETS SEAMLESSLY",
  description: "Discover amazing events happening around you.",
};
export default async function Home() {
  return (
    <main className="bg-gray-100">
      <Hero />
    </main>
  );
}
