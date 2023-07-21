import { cookies } from "next/headers";
import CreateEventComponent from "./components/CreateEvent";
import { MainLayout } from "@/layout/MainLayout";

export default async function CreateEvent() {
  const cookieStore = cookies();
  const access = cookieStore.get("access");
  return (
    <>
      <CreateEventComponent access={access?.value} />
    </>
  );
}
