"use client";
import { MainLayout } from "@/layout/MainLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { Head } from "next/document";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="tiYKhZrgpRhZsF1Ly0VMZ1JeTOxaSIl0pICVYQ0FfGI"
        />
      </head>
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
