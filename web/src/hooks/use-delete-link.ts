import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../http/delete-link";

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    // Also refetch on error: a 404 means the link is already gone and should leave the list.
    onSettled() {
      return queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
