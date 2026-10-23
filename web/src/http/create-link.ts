import { api } from "../lib/api";
import type { Link } from "./types";

interface CreateLinkParams {
  originalUrl: string;
  shortUrl: string;
}

export async function createLink({ originalUrl, shortUrl }: CreateLinkParams) {
  const response = await api.post<Link>("/links", { originalUrl, shortUrl });

  return response.data;
}
