import React, { Dispatch, SetStateAction } from "react";

type Ticket = {
  id: string;
  price: number;
  lowest_price: number;
  highest_price: number;
  title: string;
  quantity: number;
  event: string;
  owner: string;
};
interface EventDataTypes {
  id: string;
  qr_code: "string";
  tickets: Ticket[];
  paid_tickets: {
    price: number;
    owner: string;
    event_name: string;
    title: string;
    ticket: string;
    user: string;
    event_admin: string;
    used: boolean;
    quantity: number;
    date: string;
    start_time: string;
    end_time: string;
    facebook: string;
    id: string;
    qr_code: string;
  }[];
  lowest_price: number;
  highest_price: number;
  title: string;
  description: string;
  image: string;
  country: string;
  state: string;
  city: string;
  venue: string;
  start_date: string;
  end_date: string;
  participants: number;
  start_time: string;
  end_time: string;
  terms: string;
  featured: boolean;
  website: string;
  owner: string;
  organizer: string;
  total_ticket_count: number;
  total_sold_tickets: number;
}

type PaidTicketDataTypes = {
  price: number;
  event: string;
  event_name: string;
  title: string;
  ticket: string;
  user: string;
  ticket_admin: string;
  used: boolean;
  quantity: number;
  date: string;
  start_time: string;
  end_time: string;
  id: string;
  qr_code: string;
} | null;

type User = {
  name: string;
  email: string;
  image: string;
  tokens: {
    refresh: string;
    access: string;
  };
  id: string;
} | null;

interface CartItems {
  id: string;
  price: number;
  //   lowest_price: number;
  title: string;
  quantity: number;
  event: string;
  eventTitle: string;
}
interface AddToCart {
  id: string;
  price: number;
  title: string;
  eventItem: EventDataTypes;
}

interface CartContextTypes {
  incrementCartItem: (id: string) => void;
  toggleCart: () => void;
  toggleMobile: boolean;
  setToggleMobile: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  checkoutToggle: boolean;
  setChechoutToggle: Dispatch<SetStateAction<boolean>>;
  eventId: string;
  setEventId: Dispatch<SetStateAction<string>>;
  qrState: boolean;
  setQrState: Dispatch<SetStateAction<boolean>>;
  addToCart(ticket: AddToCart): void;
  decreaseCartQuantity(id: string): void;
  removeFromCart(id: any): void;
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cartQuantity: number;
  cartTotal: () => number;
  getItemQuantity: (id: string) => number;
}

interface TicketDataTypes {
  id: number;
  price: number;
  lowest_price: number;
  highest_price: number;
  title: string;
  quantity: number;
  event: string;
  owner: string;
}

interface NextApiReq {
  method: string;
  headers: { cookie: any };
}
interface NextApiRes {
  status: (arg0: number) => {
    (): any;
    new (): any;
    json: { (arg0: { error?: any; user?: any }): any; new (): any };
  };
  setHeader: (arg0: string, arg1: string[]) => void;
}
