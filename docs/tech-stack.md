# 🧰 Tech Stack

Lista das principais tecnologias e o “por quê”.

## Frontend

| Tech                              | Função                         | Onde                      |
| --------------------------------- | ------------------------------ | ------------------------- |
| Next.js (App Router)              | SSR, Rotas, API                | /src/app/\*               |
| React                             | Componentização                | Todos os .tsx             |
| TypeScript                        | Tipagem estática               | Projeto inteiro           |
| Tailwind CSS                      | Estilização utilitária         | classes em componentes    |
| shadcn/ui                         | Componentes acessíveis prontos | /src/components/ui        |
| lucide-react                      | Ícones                         | HomePage, etc.            |
| Monaco Editor (mencionado README) | Editor de código               | (arquivo não exibido)     |
| React Markdown                    | Render markdown                | (não exibido, mas citado) |

## Backend (Dentro do Next)

| Tech                              | Função                    |
| --------------------------------- | ------------------------- |
| NextAuth.js                       | Autenticação OAuth        |
| API Routes Next                   | Endpoints REST (route.ts) |
| Supabase JS SDK (suposição)       | Acesso ao banco           |
| RabbitMQ (amqplib ou lib similar) | Filas                     |

## IA

| Tech              | Função                             |
| ----------------- | ---------------------------------- |
| Google Gemini AI  | Gerar feedback e análise           |
| Prompt RAG custom | Contextualização (rag_contexts.ts) |

## Testes

| Tech            | Função                |
| --------------- | --------------------- |
| Vitest          | Runner de testes      |
| Testing Library | Testes de componentes |
| jsdom           | Simular DOM           |

## Infra / Dev

| Tech    | Função                                |
| ------- | ------------------------------------- |
| Docker  | Containerizar dependências (RabbitMQ) |
| OpenSSL | Gerar segredos                        |
| Git     | Versionamento                         |

## Por Que Essas Escolhas?

- Next.js unifica frontend e backend simples (menos sobrecarga).
- Tailwind acelera prototipagem.
- shadcn/ui evita reinventar componentes acessíveis.
- Supabase reduz tempo inicial comparado a montar DB + auth do zero.
- Gemini oferece explicações linguísticas boas para feedback educacional.

## Trade-offs

| Escolha            | Benefício                 | Custo                         |
| ------------------ | ------------------------- | ----------------------------- |
| Next.js App Router | API + páginas integradas  | Curva inicial                 |
| Supabase           | Rapidez                   | Dependência externa           |
| RabbitMQ           | Escalabilidade assíncrona | Overhead para módulos simples |
| IA externa         | Feedback rico             | Limite de custo e latência    |

## Versões (Não vistas, suposições)

Recomenda-se fixar versões no package.json para reprodutibilidade.

## Sugestões Futuras

- Adicionar Zod para validação schema.
- Implementar i18n (ex: next-intl).
- Observabilidade (OpenTelemetry).
- ESLint + Prettier (se já não existir).
