import Image from "next/image";
import { EventDataTypes } from "../../../../../typings";
import { Details } from "./Details";
import { useSearchParams } from "next/navigation";

export function EventDetail(event: EventDataTypes) {
  return (
    <div className="grid lg:grid-cols-5">
      <div className="flex overflow-hidden sm:mx-0 h-96 sm:h-[624px] lg:col-span-2">
        <Image
          className="rounded-3xl h-full mx-auto mb-19 object-cover bg-cove w-full"
          height={1000}
          width={1210}
          alt={event.title}
          src={event.image}
          priority
        />
      </div>
      <Details {...event} />
    </div>
  );
}
