import { UserProvider } from "@/context/UserContext";
import Hero from "./components/Hero";
import { CartProvider } from "@/context/CartContext";
import { MainLayout } from "@/layout/MainLayout";

export default async function Home() {
  return (
    <main className="bg-gray-100">
      <Hero />
    </main>
  );
}
