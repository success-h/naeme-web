"use client";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export function useCartContext() {
  return useContext(CartContext);
}
