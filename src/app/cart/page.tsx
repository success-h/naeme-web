"use client";
import { MainLayout } from "@/layout/MainLayout";
import { CartItem } from "./components/CartItem";
import { CheckoutModal } from "./components/CheckoutModal";
import { useCartContext } from "@/hooks/useCart";

const Cart = () => {
  const { cartItems, cartTotal } = useCartContext();
  return (
    <main className="min-h-screen max-w-screen-xl overflow-x-hidden mx-auto my-20 max-lg:px-4 lg:px-10 mt-20">
      <div className="mt-10">
        <CheckoutModal
          tourProps={"data that could be passed to the modal component"}
        />
        <p className="font-bold text-lg mb-7">Tickets Cart</p>
        {cartItems.length === 0 ? (
          <p>Cart empty</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}

        <p className="my-4">Total: ${cartTotal()}</p>
        <button
          className="btn bg-black mt-4 text-white hover:bg-gray-600"
          onClick={() => {
            //@ts-ignore
            window?.my_modal_5.showModal();
          }}
        >
          Continue to Checkout
        </button>
      </div>
    </main>
  );
};

export default Cart;
