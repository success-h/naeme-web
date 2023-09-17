import { EventDataTypes } from "../../typings";
import { getEvents } from "./functions/functions";

export default async function sitemap() {
  const baseUrl = "https://www.naeme.app";
  const events = await getEvents();

  const eventUrls =
    events?.results?.map((event: EventDataTypes) => {
      return {
        url: `${baseUrl}/event/${event.id}`,
        lastModified: new Date(),
      };
    }) ?? [];
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/events`, lastModified: new Date() },
    ...eventUrls,
  ];
}
