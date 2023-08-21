import { getUser } from "@/app/signin/utils/function";
import { useCartContext } from "@/hooks/useCart";
import { useUserContext } from "@/hooks/useUser";
import { googleLogout } from "@react-oauth/google";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export function Navbar() {
  const { user, setUser } = useUserContext();
  const { cartQuantity, cartTotal, cartItems } = useCartContext();
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        googleLogout();
        setUser(null);
        router.push("/signin");
        return res;
      } else {
        return res;
      }
    } catch (err) {}
  };

  return (
    <nav className="backdrop-blur-md max-lg:fixed sticky top-0 z-30 right-0 left-0 text-gray-500">
      <div className="drawer max-w-screen-2xl mx-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar flex justify-between">
            <Link href="/" className="px-2 mx-2 cursor-pointer">
              <Image
                className="sm:h-[17px] justify-center self-center"
                src="/logo.svg"
                height={20}
                width={120}
                alt="logo"
                priority
              />
            </Link>
            <div className="flex gap-x-4">
              <div className="">
                <div className="flex-none gap-2 z-50">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label
                      tabIndex={0}
                      className="lg:hidden btn hover:border-none btn-ghost btn-circle hover:bg-white"
                    >
                      <div className="indicator">
                        <Image
                          priority
                          height={20}
                          width={20}
                          src="/Buy.svg"
                          alt="buy"
                        />

                        <span className="badge badge-md indicator-item bg-blue-400 border-none text-lg">
                          {cartQuantity}
                        </span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 z-[1] bg-gray-100 card card-compact dropdown-content w-52 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg">
                          {cartQuantity} Items
                        </span>
                        <span className="text-info">
                          Subtotal: ${cartTotal()}
                        </span>

                        <Link href="/cart" className="">
                          <button className="btn bg-blue-300 w-full">
                            View cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-left lg:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-9 h-9 stroke-current text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-16 -mr-10 z-[1] p-2 shadow bg-zinc-900 rounded-box"
                >
                  <div className="bg-zinc-900 z-30 menu p-4 w-64 h-full gap-y-4 text-gray-500">
                    <li>
                      <Link href="/events">Explore events</Link>
                    </li>
                    <li>
                      <Link href="/scan-ticket">Scan Ticket</Link>
                    </li>
                    <li>
                      <Link href={user ? "/create-event" : "/signin"}>
                        Create events
                      </Link>
                    </li>

                    <li>
                      {user ? (
                        <div className="dropdown dropdown-bottom text-gray-600">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                          >
                            <Link
                              href="/dashboard"
                              className="w-10 rounded-full"
                            >
                              <Image
                                width={40}
                                alt="image"
                                height={40}
                                src={user.image}
                                className="rounded-full"
                              />
                            </Link>
                            <p className="mb-3">
                              <button onClick={logout}>Logout</button>
                            </p>
                          </label>
                        </div>
                      ) : (
                        <p>
                          <Link href="/signin">Sign In</Link>
                        </p>
                      )}
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu items-center menu-horizontal">
                <li>
                  <Link href="/events">Explore events</Link>
                </li>
                <li>
                  <Link href="/scan-ticket">Scan Ticket</Link>
                </li>
                <li>
                  <Link href={user ? "/create-event" : "/signin"}>
                    Create events
                  </Link>
                </li>
                <li className="flex-none gap-2 z-50">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn hover:border-none btn-ghost btn-circle hover:bg-white bg-gray-100"
                    >
                      <div className="indicator">
                        <Image
                          height={20}
                          width={20}
                          src="/Buy.svg"
                          alt="buy"
                        />
                        <span className="badge badge-md indicator-item bg-blue-400 border-none text-lg">
                          {cartQuantity}
                        </span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 z-[1] bg-gray-100 card card-compact dropdown-content w-52 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg">
                          {cartQuantity} Items
                        </span>
                        <span className="text-info">
                          Subtotal: ${cartTotal()}
                        </span>

                        <Link href="/cart" className="">
                          <button className="btn bg-blue-300 w-full">
                            View cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <div>
                  {user ? (
                    <div className="dropdown dropdown-bottom dropdown-left text-gray-600">
                      <label
                        tabIndex={-1}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <Image
                            width={40}
                            alt="image"
                            height={40}
                            src={user.image}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52"
                      >
                        <li className="my-2 px-2">
                          <Link href="/dashboard" className="justify-between">
                            Profile
                          </Link>
                        </li>

                        <li className="my-2 px-2">
                          <button onClick={logout}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link href="/signin">Sign In</Link>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
