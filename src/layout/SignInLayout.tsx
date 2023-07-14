import { UserProvider } from "@/context/UserContext";
import { FC, PropsWithChildren } from "react";

export const SignInLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <UserProvider>{children}</UserProvider>
    </>
  );
};
