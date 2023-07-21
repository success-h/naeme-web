import { CreateTicket } from "./components/CreateTicket";
import { cookies } from "next/headers";

export default function CreateTicketPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const access = cookieStore.get("access");
  return (
    <>
      <CreateTicket access={access?.value} id={params.id} />
    </>
  );
}
