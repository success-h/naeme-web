"use client";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function useUserContext() {
  return useContext(UserContext);
}
