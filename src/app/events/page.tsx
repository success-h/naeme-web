import { Metadata } from "next";
import { Events } from "./components/Events";

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    search?: string;
  };
};

export const metadata: Metadata = {
  title: "Naeme Events - Search events",
  description: "Discover amazing events happening around you.",
  keywords: [
    "Naeme Events",
    "Tickets",
    "Ticketing",
    "Booking",
    "Event Ticketing",
    "Ticket Master",
  ],
  authors: [{ name: "Success Hycenth", url: "https://success-hy.vercel.app" }],
  alternates: {
    canonical: `/events/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Naeme Events",
    description: "All-in-one solution for event management and ticket booking",
    creator: "@_successhy",
  },
};

export default function EventsPage({ params, searchParams }: Props) {
  return <Events params={params} searchParams={searchParams} />;
}
