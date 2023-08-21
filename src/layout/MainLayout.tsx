"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Navbar } from "./Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUserContext } from "@/hooks/useUser";
import { User } from "../../typings";
import { getUser } from "@/app/signin/utils/function";
import { Footer } from "./Footer";
import { CartProvider } from "@/context/CartContext";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  let { setUser } = useUserContext();
  const loadUser = useCallback(async () => {
    try {
      const data = await getUser();
      setUser(data.user);
    } catch (err) {
      // // console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId ? clientId : ""}>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
      </CartProvider>
    </GoogleOAuthProvider>
  );
};
