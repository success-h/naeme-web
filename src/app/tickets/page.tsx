"use client";
import { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRouter } from "next/router";
import TicketCard from "./components/TicketCard";
import { getUserTicket } from "../functions/functions";
import { usePathname, useSearchParams } from "next/navigation";
import { PaidTicketDataTypes } from "../../../typings";

const Tickets = () => {
  const [tickets, setTickets] = useState<PaidTicketDataTypes[]>([]);
  const searchParams = useSearchParams();
  const bookingsId = searchParams?.get("bookingsId");

  useEffect(() => {
    (async () => {
      //@ts-ignore
      const tickets = await getUserTicket(bookingsId);
      if (tickets) {
        setTickets(tickets.results);
      }
    })();
  }, []);

  return (
    <div className="max-w-screen-lg min-h-screen max-lg:px-4 mx-auto">
      <div className="w-full px-4 sm:px-0 py-40 m-auto sm:h-screen">
        <p className="text-lg font-bold mb-4 ml-7">My tickets</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-8">
          {tickets?.map((item) => (
            <TicketCard key={item?.id} ticket={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
