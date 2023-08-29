"use client";

import moment from "moment";
import { EventDataTypes } from "../../../../../typings";
import { useEffect, useState } from "react";
import { Countdown } from "./Countdown";
import Calendar from "./svg/Calendar";
import Location from "./svg/Location";
import { BiTime } from "react-icons/bi";
import { BiLinkAlt } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { formatter } from "@/app/functions/functions";
import Image from "next/image";
import { useCartContext } from "@/hooks/useCart";
import { TicketModal } from "./TicketsModal";
import { useSearchParams } from "next/navigation";

export function Details(event: EventDataTypes) {
  const searchParams = useSearchParams();
  const params = searchParams?.get("params");

  useEffect(() => {
    if (params) {
      // @ts-ignore
      window?.modal_1.showModal();
    }
  }, []);

  //console.log(params);
  const end_date = moment(event.end_date + " " + event.start_time).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const targetTime = moment(end_date);
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  return (
    <>
      <div className="lg:ml-10 lg:col-span-3 lg:col-start-4 lg:col-end-7 max-lg:mt-10 max-lg:px-6 lg:px-2">
        <h1 className="text-4xl font-black">{event.title}</h1>
        {timeBetween.asSeconds() < 0 ? null : (
          <div data-aos="zoom-in-up" className="mb-4">
            <Countdown date={end_date} className="text-xl" />
          </div>
        )}
        <>
          <div
            data-aos="zoom-in-up"
            className="my-3 w-full flex  text-[14px] justify-between items-center"
          >
            <Calendar className="mr-5" />
            <p className="flex-1 text-lg">
              {moment(event.start_date).format("MMMM Do YYYY.")}
            </p>
          </div>
          <div
            data-aos="zoom-in-up"
            className="w-full flex justify-between items-center"
          >
            <Location className="mr-5" />
            <p className="flex-1 text-[16px]">
              {event.venue} - {event.state}
            </p>
          </div>
          <div
            data-aos="zoom-in-up"
            className="flex items-center max-lg:justify-between gap-x-10"
          >
            <div className="flex">
              <BiTime className="mr-4 text-gray-400 h-6 w-6" />
              <p>{moment(event.start_time, "HH:mm").format("h:mm A")}</p>
            </div>
            <div className="flex items-center gap-x-4 py-2">
              {event.website && (
                <a href={event.website} className="inline-flex items-center">
                  <BiLinkAlt
                    size={30}
                    className="text-xl mx-2 hover:text-rose-300 text-secondary"
                  />

                  <p>Website</p>
                </a>
              )}
            </div>
          </div>
        </>
        <div
          data-aos="zoom-in-up"
          className="flex items-center max-lg:justify-between gap-x-10 my-5"
        >
          <div className="hidden lg:block text-wine-700 font-medium text-[24px]">
            {event.lowest_price === event.highest_price ? (
              <p className="">
                {event.lowest_price == 0
                  ? "Free"
                  : formatter.format(event.lowest_price)}
              </p>
            ) : (
              <div>
                {event.lowest_price == 0
                  ? "Free"
                  : `${formatter.format(event.lowest_price)}`}{" "}
                {event.highest_price > 0
                  ? `- ${formatter.format(event.highest_price)}`
                  : ""}
              </div>
            )}
          </div>
          {timeBetween.asSeconds() > 0 && (
            <div className="">
              <p className="text-sm font-bold text-primary">{`${
                event?.total_ticket_count - event?.total_sold_tickets >= 1
                  ? `${
                      event?.total_ticket_count - event?.total_sold_tickets
                    } AVAILABLE TICKETS`
                  : `${
                      event?.total_ticket_count === event?.total_sold_tickets &&
                      "TICKETS SOLD OUT"
                    }`
              } `}</p>
            </div>
          )}
        </div>
        <div className="">
          <h2 data-aos="zoom-in-up">About</h2>
          <article data-aos="zoom-in-up" className="text-sm mt-2">
            {event.description.slice(0, 490)}
          </article>
        </div>
        {event.terms && (
          <div className="collapse bg-base-200 px-0">
            <input type="checkbox" />
            <div
              data-aos="zoom-in-up"
              className="collapse-title text-xl font-medium px-0 inline-flex justify-between items-center"
            >
              <p>Terms and Conditions for this event</p>
              <BsChevronDown />
            </div>
            <div className="collapse-content text-xs text-gray-500">
              <p>{event.terms}</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-36">
          <Image
            data-aos="zoom-in-up"
            alt="qrcode"
            src={event.qr_code}
            height={250}
            width={250}
            priority
          />
          <div className="hidden lg:block">
            {timeBetween.asSeconds() < 0 ? (
              <div className="sm:text-xl text-center justify-center">
                Event Expired
              </div>
            ) : event.total_sold_tickets < event.total_ticket_count ? (
              <button
                onClick={() => {
                  //@ts-ignore
                  window?.modal_1.showModal();
                }}
                className="btn border-none bg-black text-white hover:bg-secondary my-2 px-10"
              >
                Get ticket+
              </button>
            ) : (
              <button
                disabled
                color="rose-500"
                className="btn btn-gray-200 my-2"
              >
                Tickets sold out
              </button>
            )}
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="lg:hidden p-5 flex flex-col left-0 right-0 w-full rounded-t-2xl rounded-tl-xl bottom-0 z-20 mb-24"
        >
          <>
            <div className="text-wine-700 mx-auto font-sans text-[14px] font-medium">
              {event.lowest_price === event.highest_price ? (
                <p className="">{formatter.format(event.lowest_price)}</p>
              ) : (
                <div>
                  {event.lowest_price == 0
                    ? "Free"
                    : `${formatter.format(event.lowest_price)}`}{" "}
                  {event.highest_price > 0
                    ? `- ${formatter.format(event.highest_price)}`
                    : ""}
                </div>
              )}
            </div>
            {timeBetween.asSeconds() < 0 ? (
              <div className="sm:text-xl text-center justify-center">
                Event Expired
              </div>
            ) : event.total_sold_tickets < event.total_ticket_count ? (
              <button
                onClick={() => {
                  //@ts-ignore
                  window?.modal_1.showModal();
                }}
                className="btn border-none bg-black text-white hover:bg-secondary my-2"
              >
                Get tickets+
              </button>
            ) : (
              <button
                disabled
                color="rose-500"
                className="btn btn-gray-200 my-2"
              >
                Tickets sold out
              </button>
            )}
          </>
        </div>
      </div>
      <TicketModal event={event} tickets={event.tickets} />
    </>
  );
}
