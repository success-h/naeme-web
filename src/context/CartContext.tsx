"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { CartContextTypes, CartItems, EventDataTypes } from "../../typings";

export const CartContext = createContext({} as CartContextTypes);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [qrState, setQrState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [toggleMobile, setToggleMobile] = useState(false);
  const [checkoutToggle, setChectoutToggle] = useState(false);
  const [eventId, setEventId] = useState("");

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  const getItemQuantity = (id: string) => {
    const qty = cartItems.find((item) => item.id === id)?.quantity || 0;
    // // console.log(qty);
    return qty;
  };

  function increaseCartQuantity(
    id: string,
    price: number,
    title: string,
    eventId: string,
    eventItem: EventDataTypes
  ) {
    const AvailableTicket =
      eventItem?.total_ticket_count - eventItem?.total_sold_tickets;
    setCartItems((currItems) => {
      if (!currItems.find((item) => item.id === id)) {
        return [
          ...currItems,
          {
            id,
            title,
            event: eventId,
            price,
            quantity: 1,
            eventTitle: eventItem.title,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.id === id && cartQuantity < AvailableTicket) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        toggleCart,
        cartItems,
        setCartItems,
        cartQuantity,
        getItemQuantity,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        loading,
        setLoading,
        toggleMobile,
        setToggleMobile,
        toggle,
        setToggle,
        checkoutToggle,
        setChectoutToggle,
        cartTotal,
        eventId,
        setEventId,
        qrState,
        setQrState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
