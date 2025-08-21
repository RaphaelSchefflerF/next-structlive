# 🏗️ StructLive

> Plataforma visual e interativa para aprender Estruturas de Dados passo a passo.

## 📚 Sumário Rápido (TOC)

- [Visão Geral](#-sobre-o-projeto)
- [Como Começar Rápido](#️-início-rápido)
- [Documentação Completa](#-documentação-completa)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Docker](#-docker)
- [Próximos Passos](#-próximos-passos)

## 🏁 Início Rápido

```bash
git clone <url-do-repositorio>
cd StructLive
cp .env.example .env   # se existir (não encontrado no snapshot, suposição)
npm install
npm run dev
```

Abra: http://localhost:3000

Se precisar de ajuda: leia docs/setup.md.

## 📖 Documentação Completa

| Tema              | Arquivo                                                    |
| ----------------- | ---------------------------------------------------------- |
| Visão Geral       | [docs/overview.md](docs/overview.md)                       |
| Arquitetura       | [docs/architecture.md](docs/architecture.md)               |
| Setup / Ambiente  | [docs/setup.md](docs/setup.md)                             |
| Stack Técnica     | [docs/tech-stack.md](docs/tech-stack.md)                   |
| Criar Novo Módulo | [docs/how-to-add-a-module.md](docs/how-to-add-a-module.md) |
| Glossário         | [docs/glossary.md](docs/glossary.md)                       |
| FAQ               | [docs/faq.md](docs/faq.md)                                 |

## 🎯 Sobre o Projeto

O StructLive é uma plataforma educacional que oferece:

- **Teoria Interativa**: Conteúdo didático sobre estruturas de dados
- **Visualizações Animadas**: Animações que demonstram operações em estruturas
- **Desafios Práticos**: Editor de código com análise de IA
- **Atividades Gamificadas**: Questionários com sistema de progresso
- **Estruturas**: Listas (LDSE)

### Tipos de estrutura de dados

- **LDSE**: Lista Dinâmica Simplesmente Encadeada

## 🚀 Tecnologias

### Frontend

- **Next.js** - Framework React
- **React** - Biblioteca de interface
- **TypeScript** - Linguagem tipada
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes de interface
- **Monaco Editor** - Editor de código
- **React Markdown** - Renderização de markdown

### Backend & Serviços

- **NextAuth.js** - Autenticação
- **Supabase** - Banco de dados
- **Google Gemini AI** - Análise de código
- **RabbitMQ** - Sistema de filas

### Testes

- **Vitest** - Framework de testes
- **Testing Library** - Utilitários de teste
- **jsdom** - Ambiente DOM para testes

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js**
- **npm**
- **Docker**
- **Git**

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd StructLive
```

2. **Instale as dependências**

```bash
npm install
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Autenticação Google
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-nextauth"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
SUPABASE_URL="sua-url-supabase"
SUPABASE_SERVICE_ROLE_KEY="sua-chave-service-role"

# Google Gemini AI
GEMINI_API_KEY="sua-chave-gemini-ai"
GEMINI_API_KEY2="sua-chave-gemini-ai-2"

# RabbitMQ
RABBITMQ_URL="sua-url-rabbitmq"
```

### 2. Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+
4. Crie credenciais OAuth 2.0
5. Adicione `http://localhost:3000/api/auth/callback/google` como URI de redirecionamento

### 3. Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com/)
2. Crie um novo projeto
3. Obtenha a URL e a chave de serviço
4. Configure as tabelas necessárias

### 4. Configuração do Google Gemini

1. Acesse o [Google AI Studio](https://aistudio.google.com/)
2. Gere uma API key
3. Adicione a chave ao arquivo `.env`

### 5. Configuração do RabbitMQ

#### Opção 1: Docker (Recomendado)

```bash
docker-compose up -d
```

#### Opção 2: CloudAMQP (Produção)

1. Crie uma conta no [CloudAMQP](https://www.cloudamqp.com/)
2. Crie uma instância
3. Use a URL fornecida na variável `RABBITMQ_URL`

## 🏃‍♂️ Execução

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Inicia o worker do RabbitMQ (em outro terminal)
npm run start:worker
```

O projeto estará disponível em `http://localhost:3000`

### Produção

```bash
# Build do projeto
npm run build

# Inicia o servidor de produção
npm start
```

### Interface de Desenvolvimento

```bash
# Interface do Vitest (testes)
npm run test:ui
```

## 📁 Estrutura do Projeto

(árvore detalhada e explicações adicionais em docs/architecture.md)

```text
StructLive/
StructLive/
├── src/
│   ├── app/                          # App Router (Next.js 13+)
│   │   ├── api/                      # API Routes
│   │   ├── estruturas/               # Páginas de estruturas
│   │   │   └── lista/
│   │   │       └── types/
│   │   │           ├── ldse/         # Lista Dinâmica Simplesmente Encadeada
│   │   │           ├── ldde/         # Lista Dinâmica Duplamente Encadeada
│   │   │           ├── lee/          # Lista Estática Encadeada
│   │   │           └── les/          # Lista Estática Sequencial
│   │   └── globals.css               # Estilos globais
│   ├── components/                   # Componentes reutilizáveis
│   │   └── ui/                       # Componentes shadcn/ui
│   ├── lib/                          # Utilitários e configurações
│   └── test/                         # Configurações de teste
├── workers/                          # Workers RabbitMQ
├── public/                           # Arquivos estáticos
├── __tests__/                        # Testes unitários
└── docs/                             # Documentação
```

## 🧪 Testes

### Comandos de Teste

```bash
# Executa todos os testes
npm test

# Executa testes em modo watch
npm run test:watch

# Gera relatório de cobertura
npm run coverage
```

## 🐳 Docker

### Desenvolvimento com Docker

```bash
# Apenas RabbitMQ
docker-compose up -d

# Verificar status
docker ps

# Logs
docker-compose logs -f
```

### Acessos

- **Aplicação**: <http://localhost:3000>
- **RabbitMQ Management**: <http://localhost:15672> (guest/guest)

## 🔗 Recursos Relacionados

- Autenticação (NextAuth) – ver docs/architecture.md
- Integração IA (Google Gemini) – ver docs/tech-stack.md
- Filas (RabbitMQ) – ver docs/architecture.md#integrações-externas

## ✅ Próximos Passos

1. Ler docs/overview.md para entender o “porquê”.
2. Fazer o setup completo (docs/setup.md).
3. Explorar a arquitetura (docs/architecture.md).
4. Criar um módulo de exemplo seguindo docs/how-to-add-a-module.md.
5. Abrir sua primeira Pull Request usando a checklist.

## 🛠 Branch Sugerida para esta Documentação

```
git checkout -b docs/beginner-guide
```

## 💬 Suporte

Dúvidas comuns? Veja docs/faq.md. Termos? docs/glossary.md.

---

(Conteúdo original preservado acima e abaixo com ajustes mínimos para links.)
