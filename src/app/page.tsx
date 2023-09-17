import { UserProvider } from "@/context/UserContext";
import Hero from "./components/Hero";
import { CartProvider } from "@/context/CartContext";
import { MainLayout } from "@/layout/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naeme Events - BOOK YOUR TICKETS SEAMLESSLY",
  description: "Discover amazing events happening around you.",
  keywords: [
    "Naeme Events",
    "Tickets",
    "Ticketing",
    "Booking",
    "Event Ticketing",
    "Ticket Master",
  ],
  authors: [
    { name: "Success Hycenth", url: "https://success-hy.vercel.app" },
    { name: "Divine Hycenth", url: "https://divinehycenth.com/" },
  ],
  alternates: {
    canonical: `/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Naeme Events",
    description: "All-in-one solution for event management and ticket booking",
    creator: "@_successhy",
  },
};

export default async function Home() {
  return (
    <main className="bg-gray-100">
      <Hero />
    </main>
  );
}
