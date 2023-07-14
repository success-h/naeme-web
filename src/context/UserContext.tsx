"use client";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../typings";

export const defaultUser = {
  name: null,
  email: null,
  image: undefined,
  id: null,
  tokens: {
    access: null,
    refresh: null,
  },
};
interface UserProviderProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  loading: boolean;
  setLoading(loading: boolean): void;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  accessToken: string;
}
interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserProviderProps);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        logout: () => {
          setUser(null);
        },
        loading,
        setLoading,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
