"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  AddToCart,
  CartContextTypes,
  CartItems,
  EventDataTypes,
} from "../../typings";

export const CartContext = createContext({} as CartContextTypes);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [qrState, setQrState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [toggleMobile, setToggleMobile] = useState(false);
  const [checkoutToggle, setChechoutToggle] = useState(false);
  const [eventId, setEventId] = useState("");

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartTotal = (): number => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const toggleCart = () => setIsOpen(!isOpen);

  const getItemQuantity = (id: string) => {
    const qty = cartItems.find((item) => item.id === id)?.quantity || 0;
    // // //console.log(qty);
    return qty;
  };

  function addToCart(ticket: AddToCart) {
    const AvailableTicket =
      ticket.eventItem?.total_ticket_count -
      ticket.eventItem?.total_sold_tickets;

    setCartItems((currItems) => {
      if (!currItems.find((item) => item.id === ticket.id)) {
        return [
          ...currItems,
          {
            id: ticket.id,
            title: ticket.title,
            event: ticket.eventItem.id,
            price: ticket.price,
            quantity: 1,
            ticket_qty: ticket.quantity,
            eventTitle: ticket.eventItem.title,
            available_tickets: ticket.available_tickets,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (
            item.id === ticket.id &&
            item.quantity < ticket.available_tickets
          ) {
            return {
              ...item,
              quantity: item.quantity + 1,
              ticket_qty: ticket.quantity,
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  const incrementCartItem = (id: string) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        return item.id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.available_tickets
                  ? item.quantity + 1
                  : item.quantity + 0,
            }
          : item;
      })
    );
  };

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
        incrementCartItem,
        toggleCart,
        cartItems,
        setCartItems,
        cartQuantity,
        getItemQuantity,
        removeFromCart,
        addToCart,
        decreaseCartQuantity,
        loading,
        setLoading,
        toggleMobile,
        setToggleMobile,
        toggle,
        setToggle,
        checkoutToggle,
        setChechoutToggle,
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
