import { useMutation } from "@tanstack/react-query";
import { exportLinks } from "../http/export-links";

export function useExportLinks() {
  return useMutation({
    mutationFn: exportLinks,
  });
}
