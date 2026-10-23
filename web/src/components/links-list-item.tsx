import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { env } from "../env";
import { useDeleteLink } from "../hooks/use-delete-link";
import type { Link } from "../http/types";
import { CopyIcon } from "./icons/copy";
import { TrashIcon } from "./icons/trash";
import { WarningIcon } from "./icons/warning";
import { IconButton } from "./ui/icon-button";

const COPY_FEEDBACK_DURATION_IN_MS = 2000;

type CopyStatus = "idle" | "copied" | "failed";

interface LinksListItemProps {
  link: Link;
}

export function LinksListItem({ link }: LinksListItemProps) {
  const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const shortLink = `${env.VITE_FRONTEND_URL}/${link.shortUrl}`;
  const displayOriginalUrl = link.originalUrl.replace(/^https?:\/\//, "");

  useEffect(() => {
    if (copyStatus === "idle") {
      return;
    }

    const timeout = setTimeout(
      () => setCopyStatus("idle"),
      COPY_FEEDBACK_DURATION_IN_MS
    );

    return () => clearTimeout(timeout);
  }, [copyStatus]);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shortLink);

      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function handleDeleteLink() {
    const shouldDelete = window.confirm(
      `Você realmente quer apagar o link brev.ly/${link.shortUrl}?`
    );

    if (shouldDelete) {
      deleteLink({ id: link.id });
    }
  }

  return (
    <li className="flex items-center gap-4 py-4 md:gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <a
          href={shortLink}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-md font-semibold text-blue-base hover:underline"
        >
          brev.ly/{link.shortUrl}
        </a>
        <span title={link.originalUrl} className="truncate text-sm text-gray-500">
          {displayOriginalUrl}
        </span>
      </div>

      <span className="shrink-0 text-sm text-gray-500">
        {link.accessCount} {link.accessCount === 1 ? "acesso" : "acessos"}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        <IconButton
          type="button"
          onClick={handleCopyLink}
          aria-label={
            copyStatus === "copied"
              ? "Link copiado"
              : copyStatus === "failed"
                ? "Não foi possível copiar"
                : `Copiar link brev.ly/${link.shortUrl}`
          }
        >
          {copyStatus === "copied" && <Check />}
          {copyStatus === "failed" && <WarningIcon className="text-danger" />}
          {copyStatus === "idle" && <CopyIcon />}
        </IconButton>

        <IconButton
          type="button"
          onClick={handleDeleteLink}
          disabled={isDeleting}
          aria-label={`Apagar link brev.ly/${link.shortUrl}`}
        >
          <TrashIcon />
        </IconButton>
      </div>
    </li>
  );
}
