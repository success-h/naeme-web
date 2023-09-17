import { getEvent } from "@/app/functions/functions";
import { EventDetail } from "./components/EventDetail";
import { EventDataTypes } from "../../../../typings";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {
  try {
    const event: EventDataTypes = await getEvent(params.id);
    if (!event)
      return {
        title: "Not Found",
        description: "The event you are looking for does not exist.",
      };
    return {
      title: event.title,
      description: event.description,
      alternates: {
        canonical: `/event/${event.id}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The event you are looking for does not exist.",
    };
  }
}
export default async function page({ params }: { params: { id: string } }) {
  const data = await getEvent(params.id);
  return (
    <div className="mx-auto max-w-screen-xl min-h-screen pt-20">
      <EventDetail {...data} />
    </div>
  );
}
