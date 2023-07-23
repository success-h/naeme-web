"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QrReader } from "react-qr-reader";

import { FaArrowLeft } from "react-icons/fa";
import { useUserContext } from "@/hooks/useUser";

function QRscanner() {
  const [qrState, setQrState] = useState(false);
  const router = useRouter();

  return (
    <div className="px-4 w-full max-w-screen-md mx-auto mt-20 overflow-hidden left-0 top-0 bottom-0">
      <div className="flex flex-col mt-10 items-center justify-center">
        <h1 className="text-2xl font-sans font-bold">SCAN YOUR TICKETS</h1>
        <strong className="text-sm">FOR EVENT OWNERS ONLY</strong>

        <div className="h-[300px] w-[300px] my-10">
          {qrState && (
            <QrReader
              scanDelay={1000}
              constraints={{
                facingMode: "environment",
              }}
              className="h-[300px]"
              containerStyle={{
                innerWidth: 300,
                innerHeight: 300,
              }}
              videoStyle={{
                innerWidth: 300,
                innerHeight: 300,
              }}
              onResult={(result: any, error: any) => {
                if (!!result) {
                  // @ts-ignore;
                  const text = result.getText();
                  router.push(`/tickets/${text}`);
                  setQrState(false);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />
          )}
        </div>
        <button
          onClick={() => setQrState(!qrState)}
          className="btn text-md px-4 py-2 mb-44  mt-10"
        >
          {!qrState ? "Click to scan" : "Stop scanner"}
        </button>
      </div>
    </div>
  );
}

export default QRscanner;
