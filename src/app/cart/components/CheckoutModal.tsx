import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
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
};

export function CheckoutModal({
  initializePayment,
  onClose,
  onSuccess,
  setInput,
}: Props) {
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
          className="bg-gray-100 w-full h-12 px-4 rounded-lg mt-4 outline-gray-200"
          placeholder="Enter email address"
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="btn bg-black mt-4 text-white hover:bg-gray-600"
          onClick={() => {
            //@ts-ignore
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay Now
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
