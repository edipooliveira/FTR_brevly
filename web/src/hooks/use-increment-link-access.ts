import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementLinkAccess } from "../http/increment-link-access";

export function useIncrementLinkAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementLinkAccess,
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
