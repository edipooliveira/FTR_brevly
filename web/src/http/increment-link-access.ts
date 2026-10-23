import { api } from "../lib/api";

interface IncrementLinkAccessParams {
  id: string;
}

export async function incrementLinkAccess({ id }: IncrementLinkAccessParams) {
  const response = await api.patch<{ accessCount: number }>(
    `/links/${id}/access`
  );

  return response.data;
}
