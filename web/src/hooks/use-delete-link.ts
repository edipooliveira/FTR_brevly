import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../http/delete-link";

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
