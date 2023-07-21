import {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { Navbar } from "./Navbar";
import { UserProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUserContext } from "@/hooks/useUser";
import { User } from "../../typings";
import { getUser } from "@/app/signin/utils/function";
import { Footer } from "./Footer";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  let { setUser } = useUserContext();
  const loadUser = useCallback(async () => {
    try {
      const { user } = await getUser();
      setUser(user);
    } catch (err) {
      // // console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId ? clientId : ""}>
      <Navbar />
      {children}
      <Footer />
    </GoogleOAuthProvider>
  );
};
