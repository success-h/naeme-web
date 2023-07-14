import axios from "axios";
const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
console.log({ NEXT_PUBLIC_SERVER_URL });
const api = axios.create({
  baseURL: `${NEXT_PUBLIC_SERVER_URL}`,
});

export default api;
