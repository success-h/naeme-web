"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Card } from "./Card";
import { useRouter } from "next/navigation";
import { EventDataTypes } from "../../../../typings";
import { getEvents, getSearchedEvents } from "@/app/functions/functions";
import { Skeleton } from "./Skeleton";

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    search?: string;
  };
};

export function Events({ params, searchParams }: Props) {
  const [input, setInput] = useState("");
  const [events, setEvents] = useState<EventDataTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>("");
  const router = useRouter();

  async function fetchMoreData() {
    try {
      if (nextPage) {
        setLoading(true);
        // console.log({ nextPage });
        const response = await fetch(nextPage);
        const data = await response.json();
        console.log("inside:", { data });
        if (data) {
          setNextPage(data.next);
          setEvents([...events, ...data.results]);
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (input) {
      setSearch(true);
      setLoading(true);
      const data = await getSearchedEvents(input);
      if (data) {
        console.log(data);
        setLoading(false);
        setEvents(data.results);
      }
    }
  };

  const clearSearch = async () => {
    setSearch(false);
    setInput("");
    router.push("/events");
    const data = await getEvents();
    if (data) {
      setEvents(data.results);
    }
  };

  useEffect(() => {
    (async () => {
      if (!searchParams?.search) {
        setLoading(true);
        const data = await getEvents();
        if (data) {
          setLoading(false);
          setEvents(data.results);
        }
      }
      if (searchParams?.search) {
        setLoading(true);
        setInput(searchParams.search);
        const data = await getSearchedEvents(searchParams?.search);
        if (data) {
          setLoading(false);
          setEvents(data.results);
        }
      }
    })();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto py-10 min-h-screen max-xl:px-6 pt-28">
      <form
        // @ts-ignore
        onSubmit={handleSubmit}
        className="flex rounded-full border max-md:w-full max-w-lg z-20 rounded-4xl items-center px-4 py-1 bg-gray-100 h-14"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="h-full outline-none rounded-4xl text-lg w-full bg-gray-100 pr-4"
          placeholder="Quick search events"
        />
        {search ? (
          <button onClick={clearSearch}>
            <IoMdClose size={24} />
          </button>
        ) : (
          <button type="submit">
            <FiSearch size={24} />
          </button>
        )}
      </form>

      <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center sm:place-content-start gap-y-10">
        {events?.map((event) => (
          <Card event={event} key={event.id} />
        ))}
        {loading && [1, 2, 3]?.map((event) => <Skeleton />)}
      </div>

      <div className="mt-10 flex items-center justify center">
        {!loading && (
          <button
            onClick={fetchMoreData}
            className="btn mx-auto my-10 mb-20 rounded-full"
          >
            load more
          </button>
        )}
      </div>
    </main>
  );
}
