"use client";
import { MainLayout } from "@/layout/MainLayout";
import { CartItem } from "./components/CartItem";
import { CheckoutModal } from "./components/CheckoutModal";
import { useCartContext } from "@/hooks/useCart";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { usePaystackPayment } from "react-paystack";
import api from "../../../api";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cartItems, cartTotal } = useCartContext();
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const { user } = useUserContext();
  const [email, setInput] = useState("");
  const uuid = uuidv4();
  const router = useRouter();
  const amount = 100 * cartTotal();

  console.log({ email });

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email ? user.email : email,
    amount,
    publicKey: process.env.NEXT_PUBLIC_PAYMENT_KEY
      ? process.env.NEXT_PUBLIC_PAYMENT_KEY
      : "",
  };

  const onSuccess = (reference: any) => {
    console.log(cartItems);
    if (reference.status === "success") {
      try {
        console.log("calll0p");
        (async () => {
          const resData = await Promise.all(
            cartItems?.map(async (item) => {
              const response = await api.post(
                "/my-tickets/",
                {
                  price: item.price,
                  event: item.event,
                  title: item.title,
                  ticket: item.id,
                  user: user?.id,
                  booking_id: uuid,
                  email: user?.email ? user.email : email,
                  quantity: item.quantity,
                  transactionId: reference.transaction,
                },
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.data;
              console.log({ data });
              if (response.status === 201) {
                return data;
              } else {
                return null;
              }
            })
          );

          console.log(resData);

          if (resData?.length) {
            if (user?.email) {
              emailjs
                .send(
                  // @ts-ignore
                  process?.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                  process?.env.NEXT_PUBLIC_EMAILJS_TEMP_ID,
                  {
                    email_to: user?.email,
                    message: `https://www.naeme.app/dashboard`,
                  },
                  process?.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
                )
                .then((response) => {
                  // console.log("Email sent successfully:", response);
                })
                .catch((error) => {
                  // console.error("Error sending email:", error);
                });
              router.push(`/tickets?bookingsId=${resData[0].booking_id}`);
            } else {
              emailjs
                .send(
                  // @ts-ignore
                  process?.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                  process?.env.NEXT_PUBLIC_EMAILJS_TEMP_ID,
                  {
                    email_to: email,
                    message: `https://www.naeme.app/tickets?bookingsId=${resData[0].booking_id}`,
                  },
                  process?.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
                )
                .then((response) => {
                  console.log("Email sent successfully:", response);
                })
                .catch((error) => {
                  console.error("Error sending email:", error);
                });
              router.push(`/tickets?bookingsId=${resData[0].booking_id}`);
            }
          }
        })();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <main className="min-h-screen max-w-screen-xl overflow-x-hidden mx-auto my-20 max-lg:px-4 lg:px-10 mt-20">
      <div className="mt-10">
        <CheckoutModal
          initializePayment={initializePayment}
          onClose={onClose}
          onSuccess={onSuccess}
          setInput={setInput}
          email={email}
        />
        <p className="font-bold text-lg mb-7">Tickets Cart</p>
        {cartItems.length === 0 ? (
          <p>Cart empty</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}

        <p className="my-4">Total: ${cartTotal()}</p>

        {!user?.email && (
          <button
            className="btn bg-black mt-4 text-white hover:bg-gray-600"
            onClick={() => {
              // @ts-ignore
              window?.modal_2.showModal();
            }}
          >
            Continue to Checkout
          </button>
        )}
        {user?.email && (
          <button
            className="btn bg-black mt-4 text-white hover:bg-gray-600"
            onClick={() => {
              if (!user?.email) {
                //@ts-ignore
                window?.modal_2.showModal();
                return;
              }
              //@ts-ignore
              initializePayment(onSuccess, onClose);
            }}
          >
            Continue to Checkout
          </button>
        )}
      </div>
    </main>
  );
};

export default Cart;
