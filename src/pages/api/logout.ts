import { NextApiReq, NextApiRes } from "../../../typings";

const cookie = require("cookie");

const logout = async (req: NextApiReq, res: NextApiRes) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      }),
      cookie.serialize("refresh", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      }),
    ]);
    return res.status(200).json({});
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    });
  }
};

export default logout;
