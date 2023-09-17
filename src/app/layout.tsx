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
  metadataBase: new URL("https://www.naeme.app"),
  title: "Naeme Events - BOOK YOUR TICKETS SEAMLESSLY",
  description: "Discover amazing events happening around you.",
  keywords: ["Naeme Events", "Tickets", "Ticketing", "Booking"],
  verification: {
    google:
      "google-site-verification=tiYKhZrgpRhZsF1Ly0VMZ1JeTOxaSIl0pICVYQ0FfGI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
