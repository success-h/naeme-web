import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";

type Props = {
  tourProps: string;
};

export function CheckoutModal({ tourProps }: Props) {
  return (
    <dialog id="my_modal_5" className="modal modal-middle">
      <form method="dialog" className="modal-box bg-white max-w-sm">
        <p className="font-bold text-lg mb-7">Payment Method</p>
        <div className="btn btn-lg justify-between mb-4 w-full border-2 border-white  bg-gray-100 hover:border-blue-400">
          <Image
            src="/flashpay.png"
            height={21}
            width={28}
            alt="button"
            className="mr-4"
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-blue-500">Recommended</p>
            <p className=" text-sm">Flash Pay</p>
          </div>

          <div className="inline-flex items-center justify-end text-gray-300 flex-1">
            <AiOutlineRight className="justify-end" />
          </div>
        </div>
        <div className="btn text-sm btn-lg justify-between mb-4 w-full border-2 border-white  bg-gray-100 hover:border-blue-400">
          <Image
            className="mr-4"
            src="/card.png"
            height={21}
            width={28}
            alt="button"
          />

          <p>Credit or Debit</p>

          <div className="inline-flex items-center justify-end text-gray-300 flex-1">
            <AiOutlineRight className="justify-end" />
          </div>
        </div>
        <div className="btn text-sm btn-lg justify-between mb-4 w-full border-2 border-white  bg-gray-100 hover:border-blue-400">
          <Image
            className="mr-4"
            src="/apple.png"
            height={21}
            width={28}
            alt="button"
          />
          <p>Apple Pay</p>

          <div className="inline-flex items-center justify-end text-gray-300 flex-1">
            <AiOutlineRight className="justify-end" />
          </div>
        </div>
        <div className="btn text-sm btn-lg justify-between mb-4 w-full border-2 border-white  bg-gray-100 hover:border-blue-400">
          <Image
            className="mr-4"
            src="/google.png"
            height={21}
            width={28}
            alt="button"
          />
          <p>Google Pay</p>

          <div className="inline-flex items-center justify-end text-gray-300 flex-1">
            <AiOutlineRight className="justify-end" />
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
