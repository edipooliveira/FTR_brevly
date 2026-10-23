import { api } from "../lib/api";
import type { Link } from "./types";

interface GetLinkByShortUrlParams {
  shortUrl: string;
}

export async function getLinkByShortUrl({ shortUrl }: GetLinkByShortUrlParams) {
  const response = await api.get<{ link: Link }>(
    `/links/${encodeURIComponent(shortUrl)}`
  );

  return response.data.link;
}
