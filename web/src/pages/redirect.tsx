import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Card } from "../components/ui/card";
import { Logo } from "../components/ui/logo";
import { useLinkByShortUrl } from "../hooks/use-link-by-short-url";
import { incrementLinkAccess } from "../http/increment-link-access";
import { NotFound } from "./not-found";

export function Redirect() {
  const { shortUrl = "" } = useParams();
  const { data: link, error, isError } = useLinkByShortUrl(shortUrl);

  // StrictMode runs effects twice in dev; the ref keeps the access count at +1.
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!link || hasRedirected.current) {
      return;
    }

    hasRedirected.current = true;

    incrementLinkAccess({ id: link.id })
      .catch(() => {})
      .finally(() => {
        window.location.replace(link.originalUrl);
      });
  }, [link]);

  if (isAxiosError(error) && error.response?.status === 404) {
    return <NotFound />;
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-3">
      <Card className="flex max-w-[580px] flex-col items-center gap-6 px-6 py-12 text-center md:px-12 md:py-16">
        <Logo variant="icon" />

        <h1 className="text-xl font-bold text-gray-600">Redirecionando...</h1>

        {isError ? (
          <p className="text-md font-semibold text-gray-500">
            Não foi possível carregar o link. Tente novamente.
          </p>
        ) : (
          <p className="text-md font-semibold text-gray-500">
            O link será aberto automaticamente em alguns instantes.
            <br />
            Não foi redirecionado?{" "}
            {link ? (
              <a href={link.originalUrl} className="text-blue-base underline">
                Acesse aqui
              </a>
            ) : (
              "Acesse aqui"
            )}
          </p>
        )}
      </Card>
    </main>
  );
}
