import api from "../../../api";

export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const getEvents = async () => {
  const response = await api.get("/events");
  const data = await response.data;
  if (!data) {
    return null;
  }
  return data;
};

export const getEvent = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  const data = await response.data;
  if (!data) {
    return null;
  }
  return data;
};

export async function getCategory() {
  try {
    const response = await api.get(`/event-category/`);
    const categrory = await response.data;
    return categrory.results;
  } catch (error) {
    throw error;
  }
}

export const getSearchedEvents = async (searchValue: string | undefined) => {
  const response = await api.get(
    `/events/?title=${searchValue?.toLowerCase()}`
  );
  const data = await response.data;
  if (!data) {
    return null;
  }
  return data;
};

export async function getUserTicket(id: string) {
  const response = await api.get(`/my-tickets/?booking_id=${id}`);
  const ticket = await response.data;
  // // console.log({ ticket });
  return ticket;
}
export async function getSingleTicket(id: string) {
  const response = await api.get(`/my-tickets/${id}`);
  const ticket = await response.data;
  // // console.log({ ticket });
  return ticket;
}
