"use client";
import { Events } from "./components/Events";

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    search?: string;
  };
};

export default function EventsPage({ params, searchParams }: Props) {
  return <Events params={params} searchParams={searchParams} />;
}
