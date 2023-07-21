"use client";
import { useUserContext } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import api from "../../../../../api";
import Link from "next/link";

type InputData = {
  title: string;
  price: string;
  qty: string;
  placeholder: string;
  errorMessage: string;
  id: number;
};
const InputData = [
  {
    inputName: "title",
    label: "Ticket Type",
    type: "text",
    placeholder: "Regular Ticket",
    errorMessage: "Ticket type must not be empty",
    id: 1,
  },
  {
    inputName: "qty",
    label: "Ticket Quantity",
    type: "number",
    placeholder: "Quantity",
    errorMessage: "Ticket Quantity must not be empty",
    id: 3,
  },
  {
    inputName: "price",
    label: "Ticket Price",
    type: "number",
    placeholder: "0.0",
    errorMessage: "Price must not be empty",
    id: 2,
  },
];
export function CreateTicket({ id, access }: { id: string; access?: string }) {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [toste, setToste] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!user?.email) {
    router.push("/signin");
  }

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const { title, price, qty } = data;
    // console.log({ data });
    const formData = new FormData();
    formData.append("price", price);
    formData.append("title", title);
    formData.append("quantity", qty);
    // @ts-ignore
    formData.append("event", id);
    // @ts-ignore
    formData.append("owner", user?.id);
    // @ts-ignore
    formData.append("is_paid", Number(price) > 0 ? true : false);

    try {
      (async () => {
        const response = await api.post("/tickets/", formData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.status === 201) {
          setToste(true);
          setLoading(false);
          reset();
          setTimeout(() => {
            setToste(false);
          }, 2000);
        } else {
          setLoading(false);
          return response.status;
        }
      })();
    } catch (errors) {
      setLoading(false);
    }
  };
  return (
    <>
      {toste && (
        <div className="toast toast-end toast-middle mr-10">
          <div className="alert border-none bg-blue-500">
            <span>Ticket created successfully</span>
          </div>
        </div>
      )}
      <div className="max-w-screen-lg mx-auto mt-20 px-7 min-h-screen pt-20">
        <div className="text-2xl sm:text-3xl lg:text-4xl">Create Tickets</div>
        <div className="w-full mb-10 flex items-center justify-start my-5 p-4 rounded-lg bg-orange-100 text-gray-800">
          <IoWarning size={20} className="text-amber-500 mr-3 w-10" />
          <p className="text-sm">
            Please Leave the ticket price blank for a free event, and create
            only one ticket if you are hosting a free event
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-7 w-full py-7">
              {InputData.map(
                ({ inputName, label, placeholder, type, errorMessage, id }) => (
                  <div key={id} className="flex flex-col ">
                    {errors[inputName] && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                    <label className="text-lg font-semibold text-gray-700">
                      {label}
                    </label>
                    <input
                      className="outline-none rounded-3xl px-5 py-3 bg-[#f4f4f4] bg-none my-2"
                      type={type}
                      placeholder={placeholder}
                      {...register(
                        inputName,
                        inputName != "price"
                          ? { required: true }
                          : { required: false }
                      )}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-y-4 sm:flex-row items-center justify-between">
              {user && (
                <button
                  type="submit"
                  className="btn bg-black text-white w-full sm:max-w-xs hover:bg-gray-600"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    <p className="flex items-center justify-center">
                      Add ticket
                    </p>
                  )}
                </button>
              )}
              <Link
                href={`/event/${id}`}
                className="btn bg-black text-white w-full  sm:w-32 hover:bg-gray-600"
              >
                <button type="submit">
                  {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    <p className="flex items-center justify-center">Done</p>
                  )}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
