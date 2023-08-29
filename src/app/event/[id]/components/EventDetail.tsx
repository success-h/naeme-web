import Image from "next/image";
import { EventDataTypes } from "../../../../../typings";
import { Details } from "./Details";
import { useSearchParams } from "next/navigation";

export function EventDetail(event: EventDataTypes) {
  return (
    <div className="grid lg:grid-cols-6 px-4">
      <div className="flex overflow-hidden sm:mx-0 sm:h-[624px] lg:col-span-3">
        <Image
          className="sm:rounded-3xl mx-auto mb-19 object-cover bg-cove w-full"
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
