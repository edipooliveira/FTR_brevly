import { api } from "../lib/api";
import type { Link } from "./types";

export async function getLinks() {
  const response = await api.get<{ links: Link[] }>("/links");

  return response.data.links;
}
