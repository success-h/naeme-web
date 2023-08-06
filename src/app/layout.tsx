import { MainLayout } from "@/layout/MainLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
