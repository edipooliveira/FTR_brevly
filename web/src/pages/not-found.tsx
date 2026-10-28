import { Link } from "react-router";
import notFoundImage from "../assets/404.svg";
import { Card } from "../components/ui/card";

export function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-3">
      <Card className="flex max-w-[580px] flex-col items-center gap-6 px-5 py-12 text-center md:px-12 md:py-16">
        <img src={notFoundImage} alt="404" className="w-[150px] md:w-[180px]" />

        <h1 className="text-xl font-bold text-gray-600">Link não encontrado</h1>

        <p className="text-md font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <Link to="/" className="text-blue-base underline">
            brev.ly
          </Link>
          .
        </p>
      </Card>
    </main>
  );
}
