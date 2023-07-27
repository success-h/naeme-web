import { getEvent } from "@/app/functions/functions";
import { EventDetail } from "./components/EventDetail";

export default async function page({ params }: { params: { id: string } }) {
  const data = await getEvent(params.id);
  return (
    <div className="mx-auto max-w-screen-xl min-h-screen pt-20">
      <EventDetail {...data} />
    </div>
  );
}
