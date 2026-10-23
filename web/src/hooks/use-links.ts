import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../http/get-links";

export function useLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });
}
