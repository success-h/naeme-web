import { ImageResponse } from "next/server";
import { EventDataTypes } from "../../../../typings";
import { getEvent } from "@/app/functions/functions";
import Image from "next/image";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Expolorer | Blog";
export const contentType = "image/png";

export default async function og({ params }: { params: { id: string } }) {
  const event: EventDataTypes = await getEvent(params.id);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 h-full w-full"
            src={event?.image}
            alt={event?.title!!}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50 p-4">
          {/* Title */}
          <div tw="text-7xl font-bold">{event?.title}</div>
          {/* Tags */}
          <div tw="flex mt-6 flex-wrap items-center text-4xl text-neutral-200">
            <div>{event?.organizer}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
          </div>
        </div>
      </div>
    ),
    size
  );
}
