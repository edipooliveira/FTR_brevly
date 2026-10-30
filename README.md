# Brev.ly

Encurtador de URL fullstack: cadastre, liste e remova links encurtados, acompanhe a contagem de acessos e exporte relatórios CSV para uma CDN.
Projeto do desafio da Rocketseat, com API em Fastify + PostgreSQL e SPA em React.

Construído sobre o projeto **Upload Widget**, do curso da Rocketseat, usado como base de estrutura, bibliotecas e estilo.

## Stack

**server**
- TypeScript, Fastify, Drizzle ORM, PostgreSQL, Zod, fastify-type-provider-zod
- Cloudflare R2 (AWS SDK S3 + lib-storage), csv-stringify, uuidv7
- Vitest, Biome, tsup, tsx, pnpm, Docker

**web**
- TypeScript, React, Vite (SPA)
- TailwindCSS 3, tailwind-variants, Radix UI, lucide-react, axios
- React Router, TanStack React Query, React Hook Form, Zod
- ESLint, pnpm

## Estrutura de pastas

```
.
├── server/        # API (back-end) e DevOps (Dockerfile)
├── web/           # SPA React (front-end)
│   └── docs/figma # Referências de layout
├── docs/          # Requisitos do desafio
└── README.md
```

## Decisões

- **`id` para deletar e incrementar:** `DELETE /links/:id` e `PATCH /links/:id/access` usam o `id` (UUID v7), que não muda; o encurtamento é usado só na busca por `GET /links/:shortUrl`.
- **Regex do encurtamento:** `^[a-z0-9-]{3,32}$`, a mesma no back e no front. Formato inválido retorna 400 e encurtamento duplicado retorna 409. O banco garante a unicidade, então a regra vale também para requisições simultâneas.
- **URL original só com `http` ou `https`:** a mesma regra no back e no front. Sem ela, um link `javascript:` executaria script na página de redirecionamento.
- **Streaming na exportação:** os links são lidos do banco com cursor e seguem por streams até o R2 (cursor → CSV → upload), sem carregar tudo em memória. Cada arquivo recebe um nome aleatório e único.
- **Listagem performática:** o índice `links_created_at_id_idx` atende à ordenação por data de criação sem precisar ordenar a tabela a cada consulta.

## Como rodar

Pré-requisitos: Node.js 20+, pnpm e Docker (usado no banco em ambos os fluxos abaixo; dispensável se você tiver um PostgreSQL próprio).

### Variáveis de ambiente

**`server/.env`** (copie de `server/.env.example`)

| Variável | Descrição |
| ------------------------------ | --------------------------------------------------------- |
| `PORT` | Porta da API (padrão `3333`) |
| `DATABASE_URL` | URL de conexão do PostgreSQL (`postgresql://...`) |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare |
| `CLOUDFLARE_ACCESS_KEY_ID` | Access key do token R2 |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Secret key do token R2 |
| `CLOUDFLARE_BUCKET` | Nome do bucket |
| `CLOUDFLARE_PUBLIC_URL` | URL pública do bucket |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | Usadas pelo `docker compose` para subir o banco |

**`web/.env`** (copie de `web/.env.example`)

| Variável | Descrição |
| ------------------- | ---------------------------------- |
| `VITE_FRONTEND_URL` | URL do front (`http://localhost:5175`) |
| `VITE_BACKEND_URL` | URL da API (`http://localhost:3333`; com a API no Docker, `http://localhost:3000`) |

### Configuração do Cloudflare R2

Os relatórios CSV são enviados para um bucket R2 com acesso público. No painel da Cloudflare:

1. Crie o bucket e habilite o acesso público (domínio `r2.dev` ou domínio próprio).
2. Gere um API token com permissão de leitura e escrita no bucket.
3. Preencha as variáveis `CLOUDFLARE_*` no `server/.env`.
4. Configure o CORS do bucket (R2 → bucket → Settings → CORS Policy) para o front baixar o CSV. O Vite roda fixo na porta `5175` (`strictPort`); a `5173` (padrão do Vite) fica na política para quem rodar o front em outra máquina com a porta padrão. Em produção, adicione a URL pública do front em `AllowedOrigins`.

```json
[
  {
    "AllowedOrigins": ["http://localhost:5175", "http://localhost:5173"],
    "AllowedMethods": ["GET"]
  }
]
```

Sem essa política o download via `fetch` é bloqueado pelo navegador e o front abre o CSV em uma nova aba como alternativa.

### Sem Docker na API

Instale as dependências e crie o `.env`:

```bash
cd server
pnpm install
cp .env.example .env
```

Preencha as variáveis `CLOUDFLARE_*` antes de continuar: o `.env` é validado na inicialização e também pelo `pnpm db:migrate`. Depois suba o banco (ou aponte `DATABASE_URL` para um PostgreSQL próprio), aplique as migrations e inicie a API em `http://localhost:3333`:

```bash
docker compose up -d db
pnpm db:migrate
pnpm dev
```

### Com Docker

Na pasta `server/`, com o `.env` preenchido. O `docker compose` usa as variáveis `POSTGRES_*` para subir o banco e monta o `DATABASE_URL` do container `app` apontando para o serviço `db`.

```bash
cd server
docker compose up -d --build
```

- `db` → PostgreSQL exposto em `localhost:$POSTGRES_PORT`
- `app` → API exposta em `http://localhost:3000`

A imagem do server não roda migrations. Rode-as da máquina local, com o `DATABASE_URL` do `.env` apontando para a porta exposta do banco:

```bash
pnpm db:migrate
```

Para gerar só a imagem:

```bash
docker build -t brevly-server .
```

### Web

Em outro terminal, inicie o front em `http://localhost:5175`:

```bash
cd web
pnpm install
cp .env.example .env
pnpm dev
```

### Testes do server

Os testes usam o banco `brevly_test`, criado pelo `server/docker/init.sql` quando o volume do banco é iniciado. O arquivo `.env.test` não é versionado: crie-o em `server/` com o conteúdo abaixo. O upload para o R2 é simulado, então as credenciais podem ficar vazias.

```bash
DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly_test"
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL="https://example.com"
```

```bash
pnpm test
```

## Rotas da API

Documentação interativa (Swagger) em [`http://localhost:3333/docs`](http://localhost:3333/docs) (ou na porta `3000` com Docker).

| Método | Rota | Sucesso | Erro |
| ------ | ------------------- | ----------------------------------------------------------- | -------- |
| POST | `/links` | 201 `{ id, originalUrl, shortUrl, accessCount, createdAt }` | 400, 409 |
| GET | `/links` | 200 `{ links: [...] }` ordenado por `createdAt` desc | — |
| GET | `/links/:shortUrl` | 200 `{ link }` | 404 |
| DELETE | `/links/:id` | 204 | 404 |
| PATCH | `/links/:id/access` | 200 `{ accessCount }` | 404 |
| POST | `/links/exports` | 200 `{ reportUrl }` | — |
