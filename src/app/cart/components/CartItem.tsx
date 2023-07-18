import { useCartContext } from "@/hooks/useCart";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

type CartItemProps = {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    eventTitle: string;
  };
};

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, incrementCartItem, decreaseCartQuantity } =
    useCartContext();

  return (
    <div className="border-b border-gray-300 pb-6 mt-10">
      <div className="flex items-center gap-x-5">
        <h3 className="text-lg">{item.eventTitle}</h3>
        <h3 className="text-sm badge bg-secondary">{item.title}</h3>
      </div>
      <p className="my-2 text-xl">${item.price}</p>
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          <button
            className="text-3xl"
            onClick={() => decreaseCartQuantity(item.id)}
          >
            <AiOutlineDoubleLeft />
          </button>
          <span className="text-3xl font-bold mx-3 text-gray-400">
            {item.quantity}
          </span>
          <button
            className="text-3xl"
            onClick={() => incrementCartItem(item.id)}
          >
            <AiOutlineDoubleRight />
          </button>
        </div>
        <button
          className="self-center text-3xl"
          onClick={() => removeFromCart(item.id)}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}
