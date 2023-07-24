import { formatter } from "@/app/functions/functions";
import { EventDataTypes, Ticket } from "../../../../../typings";
import { useCartContext } from "@/hooks/useCart";
import Link from "next/link";
type Props = {
  tickets: Ticket[];
  event: EventDataTypes;
};
export function TicketModal({ event, tickets }: Props) {
  const { addToCart } = useCartContext();

  return (
    <dialog id="modal_1" className="modal modal-middle">
      <form method="dialog" className="modal-box bg-gray-50 max-w-lg">
        <p className="font-bold text-lg mb-7 outline-none border-none">
          Add tickets to cart
        </p>
        <button className="absolute top-5 right-7 text-lg">x</button>
        {tickets
          .filter((ticket) => ticket.price > 0)
          .map(({ id, price, title }) => {
            return (
              <div
                key={id}
                className="flex flex-col flex-1 justify-center py-3 border-b font-medium"
              >
                <div className="flex items-center justify-between">
                  {price && <div className="">{formatter.format(price)}</div>}
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
                    Add to Cart
                  </p>
                </div>
              </div>
            );
          })}
        <Link href="/cart">
          <button className="w-full btn bg-secondary mt-10 self-end">
            Go to checkout
          </button>
        </Link>
      </form>
    </dialog>
  );
}
