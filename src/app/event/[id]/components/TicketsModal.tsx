import { formatter } from "@/app/functions/functions";
import { EventDataTypes, Ticket } from "../../../../../typings";
import { useCartContext } from "@/hooks/useCart";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
type Props = {
  tickets: Ticket[];
  event: EventDataTypes;
};
export function TicketModal({ event, tickets }: Props) {
  const { addToCart, cartQuantity } = useCartContext();

  return (
    <dialog id="modal_1" className="modal modal-middle">
      <form method="dialog" className="modal-box bg-gray-50 max-w-lg pt-5">
        <label
          tabIndex={0}
          className="btn hover:border-none btn-ghost btn-circle hover:bg-white"
        >
          <div className="indicator">
            <Image priority height={20} width={20} src="/Buy.svg" alt="buy" />

            <span className="badge badge-md indicator-item bg-blue-400 border-none text-lg">
              {cartQuantity}
            </span>
          </div>
        </label>
        <button className="absolute top-5 right-7 text-lg">
          <IoIosCloseCircle size={25} />
        </button>
        {tickets.map(({ id, price, title }) => {
          return (
            <div
              key={id}
              className="flex flex-col flex-1 justify-center py-3 border-b font-medium"
            >
              <div className="flex items-center justify-between">
                {price ? (
                  <div className="">{formatter.format(price)}</div>
                ) : (
                  <p>Free</p>
                )}
                <div className="flex-1 text-xs text-center">{title}</div>
                <p
                  onClick={() =>
                    addToCart({
                      eventItem: event,
                      id: id,
                      price: price,
                      title: title,
                    })
                  }
                  className="btn text-xs"
                >
                  Add
                </p>
              </div>
            </div>
          );
        })}
        <Link href="/cart">
          <button className="w-full btn bg-black hover:bg-gray-700 mt-10 self-end">
            <p className="text-xs text-white">checkout</p>
          </button>
        </Link>
      </form>
    </dialog>
  );
}
