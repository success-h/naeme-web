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
