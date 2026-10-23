import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../http/create-link";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
