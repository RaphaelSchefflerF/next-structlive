# 🌐 Visão Geral

StructLive é uma plataforma educacional para aprender Estruturas de Dados de forma:

- Visual (animações)
- Interativa (execução simulada)
- Prática (desafios, quizzes, feedback)
- Assistida por IA (análise de código / explicações)

## 🎯 Problema que Resolve

Estudantes iniciantes têm dificuldade em “ver” como listas, filas ou árvores funcionam internamente. O StructLive mostra passo a passo as operações (inserir, remover, percorrer) e registra o progresso.

## 🧩 Principais Funcionalidades

- Cadastro/Login via Google (NextAuth + OAuth).
- Navegação por módulos de estruturas (ex: Lista Dinâmica Simplesmente Encadeada - LDSE).
- Página inicial em /src/app/home/page.tsx com:
  - Hero
  - Benefícios
  - Estruturas Disponíveis / Em Breve
  - Última estrutura visitada.
- Desafios interativos (ex: /src/app/estruturas/lista/types/ldse/activity.tsx).
- Geração de feedback via IA (RAG prompt em /src/app/estruturas/lista/types/ldse/rag_contexts.ts).
- Filas (RabbitMQ) para processamento assíncrono (suposição baseada em variáveis).
- Persistência de atividades / usuários (Supabase).

## 🏗 Diagrama de Alto Nível

```mermaid
flowchart LR
  User[Usuário Navegador] --> NextApp[Next.js App Router]
  NextApp --> Auth[NextAuth OAuth Google]
  NextApp --> API[/API Routes /src/app/api/*/]
  API --> DB[(Supabase)]
  API --> Queue[(RabbitMQ)]
  Queue --> Worker[Workers /workers/* (suposição)]
  API --> AI[Google Gemini AI]
  AI --> API
  API --> NextApp
  NextApp --> User
```

## 🔄 Fluxo Básico de Uso

1. Usuário acessa / (ou /home) → interface Next.js.
2. Faz login com Google → NextAuth obtém token → sessão em cookies.
3. Seleciona módulo (ex: Lista) → carrega página com componentes específicos.
4. Realiza atividade → envia resposta → rota /api/atividades ou /api/responder (suposição).
5. IA analisa código / resposta → feedback armazenado → exibido ao estudante.

## 📦 Módulos Atuais (Detectados)

- Lista Dinâmica Simplesmente Encadeada (LDSE) (arquivos em /src/app/estruturas/lista/types/ldse/).
- Outras pastas indicadas no README (ldde, lee, les) não exibidas no snapshot: “não encontrado” (provável roadmap).

## 🚧 Limitações / O Que Não Está no Snapshot

- schema SQL / migrations: não encontrado.
- Código de rotas API (ex: /src/app/api/atividades/route.ts): não encontrado.
- Workers de fila: apenas mencionado (variáveis), implementação não exibida.
- Arquivo .env.example: não encontrado (criar é recomendado).

Essas partes são tratadas com suposições em outros docs.

## 🗺 Onde Continuar

- Para entender camadas internas: veja docs/architecture.md.
- Para preparar ambiente: docs/setup.md.
- Para criar novo módulo: docs/how-to-add-a-module.md.
