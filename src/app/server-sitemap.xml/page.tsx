import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { getServerSideSitemapIndexLegacy, ISitemapField } from "next-sitemap";
import { ParsedUrlQuery } from "querystring";
import { getEvents } from "../functions/functions";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const events = await getEvents();
  const { results } = events;
  const fields = results.map((item) => ({
    loc: `https://www.naeme.app/event/${item.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemapIndexLegacy(ctx, fields);
};

export default function Site() {}
