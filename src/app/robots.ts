import { MetadataRoute } from "next";
import { EventDataTypes } from "../../typings";
import { getEvent } from "./functions/functions";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "private",
    },
    sitemap: "https://www.naeme.app/sitemap.xml",
  };
}
