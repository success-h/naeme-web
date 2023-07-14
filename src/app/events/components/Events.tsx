"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Card } from "./Card";
import { useRouter } from "next/navigation";
import { EventDataTypes } from "../../../../typings";
import { getEvents, getSearchedEvents } from "@/app/functions/functions";

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    search?: string;
  };
  data: any;
};

export function Events({ params, searchParams, data }: Props) {
  const [input, setInput] = useState("");
  const [events, setEvents] = useState<EventDataTypes[]>([]);
  const [loading, setLoading] = useState(false);
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
      const data = await getSearchedEvents(input);
      if (data) {
        console.log(data);
        setEvents(data.results);
      }
    }
  };

  const clearSearch = async () => {
    setInput("");
    router.push("/events");
    const data = await getEvents();
    console.log({ data });
    if (data) {
      setEvents(data.results);
    }
  };

  useEffect(() => {
    if (data) {
      setEvents(data.results);
    }
    if (searchParams?.search) {
      setInput(searchParams.search);
    }
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
        {input ? (
          <span onClick={clearSearch}>
            <IoMdClose size={24} />
          </span>
        ) : (
          <span>
            <FiSearch size={24} />
          </span>
        )}
      </form>

      <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center sm:place-content-start gap-y-10">
        {events?.map((event) => (
          <Card event={event} key={event.id} />
        ))}
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
