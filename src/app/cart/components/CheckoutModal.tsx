"use client";
import { useCartContext } from "@/hooks/useCart";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

type Props = {
  initializePayment: (
    callback?: (() => void) | undefined,
    onClose?: (() => void) | undefined
  ) => void;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  setInput: Dispatch<SetStateAction<string>>;
  email: string;
  setLoading: (value: SetStateAction<boolean>) => void;
  loading: boolean;
  getFreeTickets: () => Promise<void>;
};

export function CheckoutModal({
  initializePayment,
  onClose,
  onSuccess,
  setInput,
  email,
  getFreeTickets,
  loading,
  setLoading,
}: Props) {
  const { cartTotal } = useCartContext();
  const amount = cartTotal();
  const [error, setError] = useState("");

  return (
    <dialog id="modal_2" className="modal modal-middle">
      <form method="dialog" className="modal-box bg-white max-w-sm">
        <p className="font-bold text-lg mb-7">Get ticket as a guest</p>
        <p className="text-xs text-gray-500">
          Your email address is required for ticket purchase as a none user of
          this platform. your tickets will be sent to you after purchase via
          email
        </p>
        <input
          type="text"
          className={`bg-gray-100 w-full h-12 px-4 rounded-lg mt-4 outline-gray-200 ${
            !email && "border border-red-400"
          }`}
          placeholder="Enter email address"
          required
          onChange={(e) => setInput(e.target.value)}
        />

        {email && amount > 0 ? (
          <p
            className="btn bg-black mt-4 text-white w-full hover:bg-gray-600"
            onClick={() => {
              if (!email) {
                setError("please enter a valid email to continue");
                return;
              }
              //@ts-ignore
              initializePayment(onSuccess, onClose);
            }}
          >
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Continue to Checkout"
            )}
          </p>
        ) : (
          email && (
            <span
              typeof="button"
              className="btn bg-black mt-4 text-white w-full hover:bg-gray-600"
              onClick={() => {
                if (!email) {
                  setError("please enter a valid email to continue");
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
            </span>
          )
        )}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
