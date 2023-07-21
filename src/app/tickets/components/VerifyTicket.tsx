import { Dispatch, SetStateAction, useRef, useState } from "react";
import { getCookies, getCookie } from "cookies-next";

import { useUserContext } from "@/hooks/useUser";
import api from "../../../../api";
type Props = {
  ticket_owner: string | undefined;
  ticket_id: string | undefined;
  isVerify: boolean | undefined;
  setIsVerify: Dispatch<SetStateAction<boolean | undefined>>;
};

function VerifyEvent({
  ticket_owner,
  ticket_id,
  isVerify,
  setIsVerify,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  const cancelRef = useRef();
  const access = getCookie("access");

  const onSubmit = async () => {
    setLoading(true);
    if (user?.id === ticket_owner) {
      const response = await api.patch(
        `/my-tickets/${ticket_id}`,
        {
          used: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      if (response.status === 200) {
        setIsVerify(true);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={isVerify}
        //@ts-ignore
        onClick={() => window.modal_3.showModal()}
        className="text-sm px-1"
      >
        {isVerify ? (
          "verified"
        ) : loading ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          "verify ticket"
        )}
      </button>
      <dialog id="modal_3" className="modal ">
        <form method="dialog" className="modal-box bg-white text-gray-500">
          <h3 className="font-bold text-lg"> Please Confirm Verification!</h3>
          <p className="py-4">
            Are you sure you want to{" "}
            <p className="text-emerald-700 font-bold">Verify this ticket? </p>
            This action is permanent and cannot be undone.
          </p>
          <button onClick={onSubmit} className="btn">
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "verify"
            )}
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default VerifyEvent;
