import { api } from "../lib/api";

interface DeleteLinkParams {
  id: string;
}

export async function deleteLink({ id }: DeleteLinkParams) {
  await api.delete(`/links/${id}`);
}
