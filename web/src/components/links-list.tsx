import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useExportLinks } from "../hooks/use-export-links";
import { useLinks } from "../hooks/use-links";
import { downloadUrl } from "../utils/download-url";
import { DownloadIcon } from "./icons/download";
import { LinkIcon } from "./icons/link";
import { SpinnerIcon } from "./icons/spinner";
import { WarningIcon } from "./icons/warning";
import { LinksListItem } from "./links-list-item";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function LinksList() {
  const { data: links, isLoading, isError } = useLinks();
  const {
    mutate: exportLinks,
    isPending: isExporting,
    isError: hasExportFailed,
  } = useExportLinks();

  const isLinksListEmpty = !links || links.length === 0;

  function handleExportLinks() {
    exportLinks(undefined, {
      onSuccess: ({ reportUrl }) => downloadUrl(reportUrl),
    });
  }

  return (
    <Card className="flex flex-col gap-4 md:gap-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-600">Meus links</h2>

        <Button
          type="button"
          variant="secondary"
          onClick={handleExportLinks}
          disabled={isLinksListEmpty}
          isLoading={isExporting}
        >
          {!isExporting && <DownloadIcon />}
          Baixar CSV
        </Button>
      </div>

      {hasExportFailed && (
        <p
          role="alert"
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <WarningIcon className="size-4 shrink-0 text-danger" />
          Não foi possível baixar o CSV. Tente novamente.
        </p>
      )}

      <div className="border-t border-gray-200">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 pb-6 pt-4">
            <SpinnerIcon className="size-8 animate-spin text-gray-400" />
            <span className="text-xs uppercase text-gray-500">
              Carregando links...
            </span>
          </div>
        ) : isError && !links ? (
          <div className="flex flex-col items-center gap-3 pb-6 pt-4">
            <WarningIcon className="size-8 text-danger" />
            <span className="text-xs uppercase text-gray-500">
              Não foi possível carregar os links
            </span>
          </div>
        ) : isLinksListEmpty ? (
          <div className="flex flex-col items-center gap-3 pb-6 pt-4">
            <LinkIcon className="size-8 text-gray-400" />
            <span className="text-xs uppercase text-gray-500">
              Ainda não existem links cadastrados
            </span>
          </div>
        ) : (
          <ScrollArea.Root type="scroll" className="overflow-hidden">
            {/* Radix wraps the content in a `display: table` div, which breaks `truncate`. */}
            <ScrollArea.Viewport className="max-h-[400px] lg:max-h-[464px] [&>div]:!block">
              <ul className="divide-y divide-gray-200">
                {links.map((link) => (
                  <LinksListItem key={link.id} link={link} />
                ))}
              </ul>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="flex w-1 touch-none select-none"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-blue-base" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </div>
    </Card>
  );
}
