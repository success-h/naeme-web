"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { usePathname } from "next/navigation";
import { PaidTicketDataTypes } from "../../../../typings";
import { formatter, getSingleTicket } from "@/app/functions/functions";
import { IoTicketOutline } from "react-icons/io5";

import Image from "next/image";
import { useUserContext } from "@/hooks/useUser";
import VerifyEvent from "../components/VerifyTicket";
import { Countdown } from "@/app/event/[id]/components/Countdown";

const Tickets = ({ params }: { params: { id: string } }) => {
  const [ticket, setTicket] = useState<PaidTicketDataTypes>(null);
  const [loading, setLoading] = useState(true);
  const [isVerify, setIsVerify] = useState<boolean | undefined>(ticket?.used);
  const pathname = usePathname();
  const { user } = useUserContext();
  const datetime = moment(ticket?.end_date + " " + ticket?.end_time).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  useEffect(() => {
    (async () => {
      const ticket = await getSingleTicket(params.id);
      if (ticket) {
        setTicket(ticket);
        setIsVerify(ticket.used);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-screen-lg min-h-screen max-lg:px-4 mx-auto">
      <div className="w-full px-4 sm:px-0 py-40 m-auto sm:h-screen">
        <p className="text-lg font-bold mb-4 ml-7">My tickets</p>

        <div className="max-w-xs text-gray-700 my-7 mx-auto rounded-3xl flex flex-col">
          {ticket?.qr_code && (
            <div className="mx-auto relative flex w-full h-80">
              <Image
                src={ticket?.qr_code}
                alt="ticket owner"
                height={320}
                width={320}
              />
              {isVerify && (
                <MdVerified className="h-40 mt-20 ml-20 w-40 rounded-9xl text-emerald-700 bg-white p-2 absolute" />
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
          <div className="flex justify-between items-center mx-4 my-3">
            <div className="px-3 flex  items-center rounded-2xl">
              <IoTicketOutline size={25} className="px-1" />
              <p className="text-sm px-1">{ticket?.title}</p>
            </div>
            {isVerify && (
              <div
                className={`${
                  isVerify ? "bg-emerald-600" : "bg-sky-700"
                } items-center justify-center px-3 flex rounded-full text-white`}
              >
                <MdVerified size={25} className="px-1" />
                <p className="text-sm px-1">verified</p>
              </div>
            )}
            {!isVerify &&
              user?.id === ticket?.ticket_admin &&
              pathname === `/tickets/${ticket?.id}` && (
                <div
                  className={`${
                    isVerify ? "bg-emerald-600" : "bg-sky-700"
                  } items-center justify-center p-3 flex rounded-full text-white`}
                >
                  {!isVerify ? (
                    <GoUnverified size={25} className="px-1" />
                  ) : (
                    <MdVerified size={25} className="px-1" />
                  )}
                  <VerifyEvent
                    isVerify={isVerify}
                    setIsVerify={setIsVerify}
                    ticket_owner={ticket?.ticket_admin}
                    ticket_id={ticket?.id}
                  />
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
            <Countdown className="text-gray-500 text-lg" date={datetime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
