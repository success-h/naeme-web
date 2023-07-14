import { getEvents, getSearchedEvents } from "../functions/functions";
import { Events } from "./components/Events";

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    search?: string;
  };
};

export default async function EventsPage({ params, searchParams }: Props) {
  async function getMyEvents() {
    if (!searchParams?.search) {
      const data: any = await getEvents();
      console.log({ data });
      return data;
    }
    if (searchParams?.search) {
      const data = await getSearchedEvents(searchParams?.search);
      if (data) {
        console.log({ data });
        return data;
      }
    }
  }
  const data = await getMyEvents();
  console.log("page component", { data });
  return <Events params={params} searchParams={searchParams} data={data} />;
}
