"use client";
import { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRouter } from "next/router";
import TicketCard from "../components/TicketCard";
import { usePathname, useSearchParams } from "next/navigation";
import { PaidTicketDataTypes } from "../../../../typings";
import { getSingleTicket, getUserTicket } from "@/app/functions/functions";

const Tickets = ({ params }: { params: { id: string } }) => {
  const [ticket, setTicket] = useState<PaidTicketDataTypes>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ticket = await getSingleTicket(params.id);
      console.log(ticket);
      if (ticket) {
        setTicket(ticket);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-screen-lg min-h-screen max-lg:px-4 mx-auto">
      <div className="w-full px-4 sm:px-0 py-40 m-auto sm:h-screen">
        <p className="text-lg font-bold mb-4 ml-7">My tickets</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-8">
          <TicketCard ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
