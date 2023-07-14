import cookie from "cookie";
import api from "../../../api";
import { verifyAccessToken } from "@/app/signin/utils/function";
import { NextApiReq, NextApiRes } from "../../../typings";

const user = async (req: NextApiReq, res: NextApiRes) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const refresh = cookies.access ?? false;
    if (!access) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }
    const obj = await verifyAccessToken(access);
    if (!obj) {
      // refresh token
    }
    if (obj) {
      try {
        const apiRes = await api.get("/account/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${obj}`,
          },
        });
        const data = await apiRes.data;
        if (apiRes.status === 200) {
          return res.status(200).json({
            user: data,
          });
        } else {
          return res.status(apiRes.status).json({
            error: data.error,
          });
        }
      } catch (err) {
        return res.status(500).json({
          error: "Something went wrong when retrieving user",
        });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};

export default user;
