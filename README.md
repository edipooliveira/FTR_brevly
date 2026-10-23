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
