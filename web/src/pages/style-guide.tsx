import type { ReactNode } from "react";
import { CopyIcon } from "../components/icons/copy";
import { DownloadIcon } from "../components/icons/download";
import { LinkIcon } from "../components/icons/link";
import { TrashIcon } from "../components/icons/trash";
import { WarningIcon } from "../components/icons/warning";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { IconButton } from "../components/ui/icon-button";
import { Input } from "../components/ui/input";
import { Logo } from "../components/ui/logo";

const colors = [
  { name: "blue-base", className: "bg-blue-base" },
  { name: "blue-dark", className: "bg-blue-dark" },
  { name: "white", className: "bg-white border border-gray-200" },
  { name: "gray-100", className: "bg-gray-100 border border-gray-200" },
  { name: "gray-200", className: "bg-gray-200" },
  { name: "gray-300", className: "bg-gray-300" },
  { name: "gray-400", className: "bg-gray-400" },
  { name: "gray-500", className: "bg-gray-500" },
  { name: "gray-600", className: "bg-gray-600" },
  { name: "danger", className: "bg-danger" },
];

const typography = [
  { name: "Text XL", className: "text-xl font-bold" },
  { name: "Text LG", className: "text-lg font-bold" },
  { name: "Text MD", className: "text-md font-semibold" },
  { name: "Text SM", className: "text-sm" },
  { name: "Text SM SemiBold", className: "text-sm font-semibold" },
  { name: "Text XS", className: "text-xs uppercase" },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-6">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </Card>
  );
}

function State({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase text-gray-400">{name}</span>
      {children}
    </div>
  );
}

export function StyleGuide() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-3 py-8 md:py-16">
      <header className="flex items-center gap-6">
        <Logo />
        <Logo variant="icon" className="size-8" />
        <h1 className="text-xl font-bold">Style guide</h1>
      </header>

      <Section title="Cores">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div className={`h-10 rounded-lg ${color.className}`} />
              <span className="text-sm text-gray-500">{color.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <div className="flex flex-col gap-3">
          {typography.map((item) => (
            <span key={item.name} className={item.className}>
              {item.name} · Open Sans
            </span>
          ))}
        </div>
      </Section>

      <Section title="Ícones e vetores">
        <div className="flex items-center gap-6 text-gray-600 [&>svg]:size-6">
          <CopyIcon />
          <TrashIcon />
          <WarningIcon />
          <DownloadIcon />
          <LinkIcon />
        </div>
        <div className="flex items-center gap-6">
          <Logo />
          <Logo variant="icon" />
        </div>
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Button">
          <State name="Primary / default">
            <Button>Salvar link</Button>
          </State>
          <State name="Primary / hover">
            <Button className="bg-blue-dark">Salvar link</Button>
          </State>
          <State name="Primary / disabled">
            <Button disabled>Salvar link</Button>
          </State>
          <State name="Primary / carregando">
            <Button isLoading>Salvando...</Button>
          </State>

          <div className="flex flex-wrap gap-6">
            <State name="Secondary / default">
              <Button variant="secondary">
                <DownloadIcon />
                Baixar CSV
              </Button>
            </State>
            <State name="Secondary / hover">
              <Button variant="secondary" className="border-blue-base">
                <DownloadIcon />
                Baixar CSV
              </Button>
            </State>
            <State name="Secondary / disabled">
              <Button variant="secondary" disabled>
                <DownloadIcon />
                Baixar CSV
              </Button>
            </State>
            <State name="Secondary / carregando">
              <Button variant="secondary" isLoading>
                Baixar CSV
              </Button>
            </State>
          </div>
        </Section>

        <Section title="Icon button">
          <div className="flex flex-wrap gap-6">
            <State name="Default">
              <div className="flex gap-1">
                <IconButton aria-label="Copiar link">
                  <CopyIcon />
                </IconButton>
                <IconButton aria-label="Deletar link">
                  <TrashIcon />
                </IconButton>
              </div>
            </State>
            <State name="Hover">
              <div className="flex gap-1">
                <IconButton aria-label="Copiar link" className="border-blue-base">
                  <CopyIcon />
                </IconButton>
                <IconButton aria-label="Deletar link" className="border-blue-base">
                  <TrashIcon />
                </IconButton>
              </div>
            </State>
            <State name="Disabled">
              <div className="flex gap-1">
                <IconButton aria-label="Copiar link" disabled>
                  <CopyIcon />
                </IconButton>
                <IconButton aria-label="Deletar link" disabled>
                  <TrashIcon />
                </IconButton>
              </div>
            </State>
          </div>
        </Section>
      </div>

      <Section title="Input">
        <div className="grid gap-6 md:grid-cols-2">
          <State name="Empty / default">
            <Input label="Link original" placeholder="www.exemplo.com.br" />
          </State>
          <State name="Filled / default">
            <Input label="Link original" defaultValue="linkedin.com/in/myprofile" />
          </State>
          <State name="Empty / active (foco automático)">
            <Input label="Link original" placeholder="www.exemplo.com.br" autoFocus />
          </State>
          <State name="Filled / active (clique no campo)">
            <Input label="Link original" defaultValue="linkedin.com/in/myprofile" />
          </State>
          <State name="Empty / error">
            <Input
              label="Link original"
              placeholder="www.exemplo.com.br"
              error="Informe uma url válida."
            />
          </State>
          <State name="Filled / error">
            <Input
              label="Link encurtado"
              prefix="brev.ly/"
              defaultValue="Link Inválido"
              error="Informe uma url minúscula e sem espaço/caracter especial."
            />
          </State>
          <State name="Prefixo / empty">
            <Input label="Link encurtado" prefix="brev.ly/" />
          </State>
          <State name="Prefixo / filled">
            <Input label="Link encurtado" prefix="brev.ly/" defaultValue="linkedin-profile" />
          </State>
        </div>
      </Section>
    </main>
  );
}
