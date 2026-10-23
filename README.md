# Brev.ly

Encurtador de URL fullstack: cadastre, liste e remova links encurtados, acompanhe a contagem de acessos e exporte relatórios CSV para uma CDN.
Projeto do desafio da Rocketseat, com API em Fastify + PostgreSQL e SPA em React.

## Stack

**server**
- TypeScript, Fastify, Drizzle ORM, PostgreSQL, Zod
- Cloudflare R2 (via AWS SDK S3)
- Vitest, Biome, pnpm, Docker

**web**
- TypeScript, React, Vite (SPA)
- TailwindCSS v4, React Router, TanStack React Query
- React Hook Form, Zod, Biome, pnpm

## Estrutura de pastas

```
.
├── server/        # API (back-end) e DevOps (Dockerfile)
├── web/           # SPA React (front-end)
│   └── docs/figma # Referências de layout
└── README.md
```

## Como rodar

> TODO: preencher na etapa final (variáveis de ambiente, banco, migrations, server e web).

### Configuração do Cloudflare R2

Os relatórios CSV são enviados para um bucket R2 com acesso público. No painel da Cloudflare:

1. Crie o bucket e habilite o acesso público (domínio `r2.dev` ou domínio próprio).
2. Gere um API token com permissão de leitura e escrita no bucket.
3. Preencha no `server/.env`: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ACCESS_KEY_ID`, `CLOUDFLARE_SECRET_ACCESS_KEY`, `CLOUDFLARE_BUCKET` e `CLOUDFLARE_PUBLIC_URL` (URL pública do bucket).
4. Configure o CORS do bucket (R2 → bucket → Settings → CORS Policy) para o front baixar o CSV. O Vite roda fixo na porta `5175` (`strictPort`); a `5173` (padrão do Vite) fica na política para quem rodar o front em outra máquina com a porta padrão. Em produção, adicione a URL pública do front em `AllowedOrigins`.

```json
[
  {
    "AllowedOrigins": ["http://localhost:5175", "http://localhost:5173"],
    "AllowedMethods": ["GET"]
  }
]
```

No `web/.env`, a URL do front usa a mesma porta:

```bash
VITE_FRONTEND_URL=http://localhost:5175
VITE_BACKEND_URL=http://localhost:3333
```

Sem essa política o download via `fetch` é bloqueado pelo navegador e o front abre o CSV em uma nova aba como alternativa.

### Server com Docker

Na pasta `server/`, copie o `.env.example` para `.env` e preencha as variáveis. O `docker compose` usa as variáveis `POSTGRES_*` para subir o banco e monta o `DATABASE_URL` do container `app` apontando para o serviço `db`.

```bash
cd server
docker compose up -d --build
```

- `db` → PostgreSQL exposto em `localhost:$POSTGRES_PORT`
- `app` → API exposta em `http://localhost:3000` (documentação em `http://localhost:3000/docs`)

A imagem do server não roda migrations. Rode-as da máquina local contra o banco do compose, com o `DATABASE_URL` do `.env` apontando para a porta exposta:

```bash
# server/.env — mesmos valores de POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT e POSTGRES_DB
DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly"
```

```bash
pnpm db:migrate
```

Para gerar só a imagem:

```bash
docker build -t brevly-server .
```
