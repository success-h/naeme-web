"use client";
import { useUserContext } from "@/hooks/useUser";
import { EventDataTypes, PaidTicketDataTypes } from "../../../typings";
import { getEventAndTicketData } from "../functions/functions";
import { useEffect, useState } from "react";
import TicketCard from "../tickets/components/TicketCard";
import { Card } from "../events/components/Card";
import Slider from "react-slick";

function Dashboard() {
  const { user } = useUserContext();
  const [events, setEvents] = useState<EventDataTypes[] | null>(null);
  const [tickets, setTickets] = useState<PaidTicketDataTypes[] | null>(null);
  const [state, setState] = useState("ticket");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      //@ts-ignore
      const data: {
        eventData: EventDataTypes[];
        ticketData: PaidTicketDataTypes[];
      } = await getEventAndTicketData(user?.id);
      setEvents(data?.eventData);
      setTickets(data?.ticketData);
      setLoading(false);
    })();
  }, [user]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <div className="max-lg:px-5 max-w-screen-xl mx-auto min-h-screen pb-10">
      <div className="max-w-screen-xl mt-20 md:sm-0 mx-auto max-lg:px-5 flex gap-x-4 py-4">
        <button
          className={`btn text-xs ${state !== "ticket" && "border-none"}`}
          onClick={() => setState("ticket")}
        >
          See my tickets
        </button>
        <button
          onClick={() => setState("event")}
          className={`btn text-xs ${state !== "event" && "border-none"}`}
        >
          See my events
        </button>
      </div>
      <div className="mt-20 text-gray-600">
        {!loading && !tickets?.length && (
          <>
            {state == "ticket" && (
              <p className="my-3 mt-20 text-xl flex justify-center w-full">
                {user?.name} you have not purchased tickets yet.
              </p>
            )}
          </>
        )}
        {!loading && !events?.length && (
          <>
            {state == "event" && (
              <p className="my-3 mt-20 text-xl flex justify-center w-full">
                {user?.name} you have not created any event yet.
              </p>
            )}
          </>
        )}
      </div>
      <div className="hidden sm:block -mt-20">
        {state == "ticket" ? (
          <div className="flex flex-col sm:flex-row justify-center sm:justify-center sm:flex-wrap gap-10">
            {tickets?.map((ticket) => (
              <TicketCard key={ticket?.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center md:justify-start sm:flex-wrap gap-10 place-items-center">
            {events?.map((event) => (
              <Card event={event} key={event.id} />
            ))}
          </div>
        )}
      </div>
      <div className=" sm:hidden-mt-20">
        {state == "ticket" ? (
          <Slider
            {...settings}
            autoplay
            // fade
            vertical={false}
            arrows={false}
            verticalSwiping
            dots
          >
            {tickets?.map((ticket) => (
              <TicketCard key={ticket?.id} ticket={ticket} />
            ))}
          </Slider>
        ) : (
          <Slider
            {...settings}
            autoplay
            // fade
            vertical={false}
            arrows={false}
            verticalSwiping
            dots
          >
            {events?.map((event) => (
              <Card event={event} key={event.id} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
