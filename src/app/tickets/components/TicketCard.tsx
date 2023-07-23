"use client";
import { useState, useEffect } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import moment from "moment";
import Image from "next/image";

import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import VerifyEvent from "./VerifyTicket";
import { PaidTicketDataTypes } from "../../../../typings";
import { useUserContext } from "@/hooks/useUser";
import { Countdown } from "@/app/event/[id]/components/Countdown";
import { usePathname } from "next/navigation";

const TicketCard = ({ ticket }: { ticket: PaidTicketDataTypes }) => {
  const pathname = usePathname();

  const datetime = moment(ticket?.end_date + " " + ticket?.end_time).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const router = useRouter();
  const [isVerify, setIsVerify] = useState<boolean | undefined>(ticket?.used);

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  function showDetailsHandler() {
    router.push(`/tickets/${ticket?.id}`);
  }

  return (
    <div
      onClick={showDetailsHandler}
      className="py-7 bg-[#fbfbfb] w-72 text-gray-700 my-7 border mx-auto rounded-3xl flex flex-col"
    >
      {ticket?.qr_code && (
        <div className="mx-auto relative flex h-56 w-56">
          <Image
            src={ticket?.qr_code}
            alt="ticket owner"
            height={224}
            width={224}
          />
          {isVerify && (
            <MdVerified className="h-32 mt-12 ml-[45px] w-32 rounded-9xl text-emerald-700 bg-white p-2 absolute" />
          )}
        </div>
      )}
      <div
        style={{
          fontFamily: "Montserrat Condensed",
        }}
        className="font-semibold px-4 text-lg"
      >
        {ticket?.event_name}
      </div>
      <div className="flex justify-between mx-4">
        <div className="bg-secondary text-white px-3 flex  items-center rounded-2xl mb-2">
          <IoTicketOutline size={25} className="px-1" />
          <p className="text-sm px-1">{ticket?.title}</p>
        </div>
        {isVerify && (
          <div
            className={`${
              isVerify ? "bg-emerald-600" : "bg-sky-700"
            } items-center justify-center px-3 flex rounded-4xl text-white`}
          >
            <MdVerified size={25} className="px-1" />
            <p className="text-sm px-1">verified</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        <div className="flex flex-col pl-4 place-content-center">
          <div className="text-gray-500 text-xs">Date</div>
          <div className="font-semibold text-sm">
            {moment(ticket?.start_date).format("MMMM Do YYYY.")}
          </div>
        </div>
        <div className="flex flex-col pl-4 place-content-center">
          <div className="text-gray-500 text-xs">Time</div>
          <div className="font-semibold text-sm">
            {moment(ticket?.start_time, "HH:mm").format("h:mm A")}
          </div>
        </div>
        <div className="flex flex-col pl-4 place-content-center">
          <div className="text-gray-500 text-xs">QTY</div>
          <div className="font-semibold text-sm">{ticket?.quantity}</div>
        </div>
        <div className="flex flex-col pl-4 place-content-center">
          <div className="text-gray-500 text-xs">Cost</div>
          {ticket?.price ? (
            <div className="font-semibold text-sm">
              {formatter?.format(ticket.price)}
            </div>
          ) : (
            <div className="font-semibold text-sm">Free</div>
          )}
        </div>
      </div>
      <div className="grid px-4 mt-3">
        <Countdown className="text-primary" date={datetime} />
      </div>
    </div>
  );
};

export default TicketCard;
