"use client";
import moment from "moment";
import Image from "next/image";
import { EventDataTypes } from "../../../../typings";
import { useRouter } from "next/navigation";

type Props = {
  event: EventDataTypes;
};

export const Card = ({ event }: Props) => {
  const month = moment(event.start_date).format("MMM");
  const day = moment(event.start_date).format("DD");
  const router = useRouter();
  function showDetailsHandler() {
    router.push(`event/${event.id}`);
  }

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div
      data-aos="fade-up"
      className="card card-compact w-80 h-96 bg-gray-50 border-none"
    >
      <figure>
        <Image
          className="hover:scale-105 bg-cover object-cover w-full transition-all overflow-hidden duration-500"
          height={200}
          width={200}
          objectPosition="center"
          objectFit="cover"
          src={event?.image}
          alt={event?.title}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {event.title}</h2>
        <p className="text-xs">
          {moment(event.start_date).format("MMMM Do YYYY.")}
        </p>
        <div className="font-medium text-secondary text-xs">
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
        <div className="card-actions justify-end">
          <button className="btn rounded-full" onClick={showDetailsHandler}>
            View event
          </button>
        </div>
      </div>
    </div>
  );
};
