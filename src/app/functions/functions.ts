import api from "../../../api";

export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const getEvents = async () => {
  try {
    const response = await api.get("/events");
    const data = await response.data;
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
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

export const getEventAndTicketData = async (user_id: string | undefined) => {
  if (user_id) {
    if (user_id) {
      try {
        const res = await api.get(`/my-tickets/?user=${user_id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        const resp = await api.get(`/events/?owner=${user_id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        const eventData = await resp.data.results;
        const ticketData = await res.data.results;

        return { eventData, ticketData };
      } catch (error) {
        // console.log(error);
      }
    }
  }
};
