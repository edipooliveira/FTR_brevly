import { useParams } from "react-router";

export function Redirect() {
  const { shortUrl } = useParams();

  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold">Redirecionando...</h1>
      <p className="text-sm">{shortUrl}</p>
    </main>
  );
}
