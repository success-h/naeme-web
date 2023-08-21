import { MainLayout } from "@/layout/MainLayout";
import { Suspense } from "react";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import Loading from "./loading";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naeme Events - BOOK YOUR TICKETS SEAMLESSLY",
  description: "Discover amazing events happening around you.",
  keywords: ["Naeme Events", "Tickets", "Ticketing", "Booking"],
  authors: [{ name: "Success Hycenth", url: "https://success-hy.vercel.app" }],
  creator: "Success Hycenth",
};

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
        <Suspense fallback={<Loading />}>
          <UserProvider>
            <MainLayout> {children}</MainLayout>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
