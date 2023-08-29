"use client";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";
import api from "../../../../api";
import { useUserContext } from "@/hooks/useUser";

export const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const router = useRouter();

  const signIn = async (token: string | undefined) => {
    setLoading(true);
    try {
      const response = await api.post(`/account/google/`, {
        auth_token: token,
      });
      const data = await response.data;
      if (response.status === 200) {
        setCookie("access", data.tokens.access, { maxAge: 60 * 60 * 24 * 7 });
        setCookie("refresh", data.tokens.refresh, {
          maxAge: 60 * 60 * 24 * 30,
        });
        setUser(data);
        setLoading(false);
        router.back();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // //console.log(err);
    }
  };

  return (
    <div className="h-screen px-10 flex-col m-auto flex items-center justify-center">
      <div className="mx-auto text-center text-xl my-7 font-bold">
        Lets get you started with your account
      </div>

      <div className="sm:w-[400px] w-full">
        <div className="mt-4 flex flex-col content-center gap-4">
          <div
            className={`${
              loading ? "rounded-xs  w-full my-3" : ""
            } rounded-xs w-full my-3 cursor-pointer flex flex-col gap-y-4 justify-center items-center py-3`}
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <button className="">
                <GoogleLogin
                  size="large"
                  theme="filled_blue"
                  auto_select={true}
                  onSuccess={(credentialResponse) => {
                    setLoading(true);
                    signIn(credentialResponse.credential);
                  }}
                  onError={() => {
                    // //console.log('Login Failed');
                  }}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
