import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getLinkByShortUrl } from "../http/get-link-by-short-url";

const MAX_RETRIES = 3;

export function useLinkByShortUrl(shortUrl: string) {
  return useQuery({
    queryKey: ["link", shortUrl],
    queryFn: () => getLinkByShortUrl({ shortUrl }),
    retry(failureCount, error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return false;
      }

      return failureCount < MAX_RETRIES;
    },
  });
}
