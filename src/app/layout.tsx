"use client";
import { MainLayout } from "@/layout/MainLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <UserProvider>
          <CartProvider>
            <MainLayout>{children}</MainLayout>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
