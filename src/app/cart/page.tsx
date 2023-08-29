"use client";
import { MainLayout } from "@/layout/MainLayout";
import { CartItem } from "./components/CartItem";
import { CheckoutModal } from "./components/CheckoutModal";
import { useCartContext } from "@/hooks/useCart";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { usePaystackPayment } from "react-paystack";
import api from "../../../api";
import { useRouter, useSearchParams } from "next/navigation";

const Cart = () => {
  const { cartItems, cartTotal, setCartItems } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const searchParams = useSearchParams();
  const { user } = useUserContext();
  const [email, setInput] = useState("");
  const uuid = uuidv4();
  const router = useRouter();
  const amount = cartTotal();

  const encodedCart = searchParams?.get("id");
  // @ts-ignore
  useEffect(() => {
    if (encodedCart) {
      const decodedString = atob(encodedCart);
      const cart = JSON.parse(decodedString);
      setCartItems((initialItems) => [...initialItems, ...cart]);
    }
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email ? user.email : email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYMENT_KEY
      ? process.env.NEXT_PUBLIC_PAYMENT_KEY
      : "",
  };

  const getFreeTickets = async () => {
    setLoading(true);
    try {
      const resData = await Promise.all(
        cartItems?.map(async (item) => {
          const response = await api.post(
            "/my-tickets/",
            {
              event: item.event,
              title: item.title,
              ticket: item.id,
              user: user?.id,
              booking_id: uuid,
              email: user?.email ? user.email : email,
              quantity: item.quantity,
              transactionId: "",
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.data;
          if (response.status === 201) {
            return data;
          } else {
            return null;
          }
        })
      );

      if (resData?.length) {
        if (user?.email) {
          emailjs
            .send(
              // @ts-ignore
              process?.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              process?.env.NEXT_PUBLIC_EMAILJS_TEMP_ID,
              {
                email_to: user?.email,
                message: `https://www.naeme.app/tickets?bookingsId=${resData[0].booking_id}`,
              },
              process?.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then((response) => {
              // //console.log("Email sent successfully:", response);
            })
            .catch((error) => {
              // console.error("Error sending email:", error);
            });
          setToast(true);
          setTimeout(() => {
            setToast(false);
            router.push(`/tickets?bookingsId=${resData[0].booking_id}`);
          }, 2000);
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
              // //console.log("Email sent successfully:", response);
            })
            .catch((error) => {
              console.error("Error sending email:", error);
            });
          setLoading(false);
          setToast(true);
          setTimeout(() => {
            setToast(false);
            router.push(`/tickets?bookingsId=${resData[0].booking_id}`);
          }, 2000);
        }
      }
    } catch (error) {
      // //console.log(error);
    }
  };

  const onSuccess = (reference: any) => {
    //console.log(cartItems);
    if (reference.status === "success") {
      try {
        (async () => {
          const resData = await Promise.all(
            cartItems?.map(async (item) => {
              const response = await api.post(
                "/my-tickets/",
                {
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
              if (response.status === 201) {
                return data;
              } else {
                return null;
              }
            })
          );

          if (resData?.length) {
            if (user?.email) {
              emailjs
                .send(
                  // @ts-ignore
                  process?.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                  process?.env.NEXT_PUBLIC_EMAILJS_TEMP_ID,
                  {
                    email_to: user?.email,
                    message: `https://www.naeme.app/tickets?bookingsId=${resData[0].booking_id}`,
                  },
                  process?.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
                )
                .then((response) => {
                  // //console.log("Email sent successfully:", response);
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
                  //console.log("Email sent successfully:", response);
                })
                .catch((error) => {
                  console.error("Error sending email:", error);
                });
              router.push(`/tickets?bookingsId=${resData[0].booking_id}`);
            }
          }
        })();
      } catch (error) {
        //console.log(error);
      }
    }
  };
  const onClose = () => {
    //console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <main className="min-h-screen max-w-screen-xl overflow-x-hidden mx-auto my-20 max-lg:px-4 lg:px-10 mt-20">
      <div className="mt-10">
        {toast && (
          <div className="toast toast-bottom toast-center">
            <div className="alert alert-success bg-primary border-none outline-none">
              <span>Ticket added successfully.</span>
            </div>
          </div>
        )}
        <CheckoutModal
          getFreeTickets={getFreeTickets}
          initializePayment={initializePayment}
          onClose={onClose}
          onSuccess={onSuccess}
          setInput={setInput}
          loading={loading}
          setLoading={setLoading}
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
          <>
            {amount > 0 ? (
              <button
                className="btn bg-black mt-4  max-w-xs w-full text-white hover:bg-gray-600"
                onClick={() => {
                  if (!user?.email) {
                    //@ts-ignore
                    window?.modal_2.showModal();
                    return;
                  }
                  setLoading(true);
                  //@ts-ignore
                  initializePayment(onSuccess, onClose);
                }}
              >
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Continue to Checkout"
                )}
              </button>
            ) : (
              <button
                className="btn bg-black mt-4  max-w-xs w-full text-white hover:bg-gray-600"
                onClick={() => {
                  if (!user?.email) {
                    //@ts-ignore
                    window?.modal_2.showModal();
                    return;
                  }
                  //@ts-ignore
                  getFreeTickets();
                }}
              >
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Continue to Checkout"
                )}
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
