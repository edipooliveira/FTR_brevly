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
