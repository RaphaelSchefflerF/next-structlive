# 🛠️ Guia de Configuração do StructLive

Este guia fornece instruções detalhadas para configurar o ambiente de desenvolvimento do StructLive.

## 📋 Pré-requisitos

### Software Necessário

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm**, **yarn** ou **pnpm** (incluído com Node.js)
- **Docker** (opcional) ([Download](https://www.docker.com/))

### Verificação de Instalação

```bash
# Verificar versões instaladas
node --version    # Deve ser >= 18.0.0
npm --version     # Qualquer versão recente
docker --version  # Opcional
```

## 🚀 Configuração Passo a Passo

### 1. Clone e Configuração Inicial

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd StructLive

# Instale as dependências
npm install

# Copie o arquivo de exemplo das variáveis de ambiente
cp .env.example .env
```

### 2. Configuração do Google OAuth

#### 2.1. Criar Projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Select a project" → "New Project"
3. Nome do projeto: `StructLive` (ou nome de sua preferência)
4. Clique em "Create"

#### 2.2. Ativar APIs Necessárias

1. No painel lateral, vá em "APIs & Services" → "Library"
2. Procure e ative as seguintes APIs:
   - Google+ API
   - Google Identity Services API

#### 2.3. Criar Credenciais OAuth 2.0

1. Vá em "APIs & Services" → "Credentials"
2. Clique em "Create Credentials" → "OAuth 2.0 Client IDs"
3. Se solicitado, configure a "OAuth consent screen":
   - User Type: External
   - App name: StructLive
   - User support email: seu-email@exemplo.com
   - Developer contact information: seu-email@exemplo.com
4. Application type: Web application
5. Name: StructLive Web Client
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Clique em "Create"
8. Copie o Client ID e Client Secret gerados

#### 2.4. Configurar Variáveis de Ambiente

```env
GOOGLE_CLIENT_ID="seu-client-id-aqui"
GOOGLE_CLIENT_SECRET="seu-client-secret-aqui"
```

### 3. Configuração do NextAuth

#### 3.1. Gerar Secret Key

```bash
# Gerar uma chave secreta aleatória
openssl rand -base64 32
```

#### 3.2. Configurar Variáveis

```env
NEXTAUTH_SECRET="sua-chave-secreta-gerada"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configuração do Supabase

#### 4.1. Criar Conta e Projeto

1. Acesse [Supabase](https://supabase.com/)
2. Clique em "Start your project"
3. Crie uma conta ou faça login
4. Clique em "New project"
5. Preencha os dados:
   - Name: StructLive
   - Database Password: (escolha uma senha segura)
   - Region: (escolha a mais próxima)
6. Clique em "Create new project"

#### 4.2. Obter Credenciais

1. No dashboard do projeto, vá em "Settings" → "API"
2. Copie os seguintes valores:
   - Project URL
   - Project API keys → service_role (mantenha segredo!)

#### 4.3. Configurar Variáveis

```env
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
```

#### 4.4. Configurar Tabelas (Opcional)

1. No dashboard do Supabase, vá em "Table Editor"
2. Crie as tabelas necessárias conforme o modelo do projeto

### 5. Configuração do Google Gemini AI

#### 5.1. Obter API Key

1. Acesse [Google AI Studio](https://aistudio.google.com/)
2. Faça login com sua conta Google
3. Clique em "Get API key"
4. Clique em "Create API key in new project" ou escolha um projeto existente
5. Copie a API key gerada

#### 5.2. Configurar Variáveis

```env
GEMINI_API_KEY="sua-api-key-aqui"
GEMINI_API_KEY2="sua-api-key-backup-aqui"  # Opcional: chave de backup
```

### 6. Configuração do RabbitMQ

#### Opção A: Docker (Recomendado para desenvolvimento)

```bash
# Iniciar RabbitMQ via Docker
docker-compose up -d

# Verificar se está rodando
docker ps
```

O RabbitMQ estará disponível em:

- AMQP: `amqp://guest:guest@localhost:5672`
- Management UI: <http://localhost:15672> (guest/guest)

```env
RABBITMQ_URL="amqp://guest:guest@localhost:5672"
```

#### Opção B: CloudAMQP (Produção)

1. Acesse [CloudAMQP](https://www.cloudamqp.com/)
2. Crie uma conta e faça login
3. Clique em "Create New Instance"
4. Escolha o plano (Little Lemur é gratuito)
5. Nome: StructLive
6. Região: (escolha a mais próxima)
7. Clique em "Create instance"
8. Copie a AMQP URL fornecida

```env
RABBITMQ_URL="amqps://usuario:senha@host.cloudamqp.com/vhost"
```

## 🔧 Verificação da Configuração

### 1. Verificar Arquivo .env.local

Seu arquivo `.env` deve conter todas as variáveis:

```env
# Autenticação Google
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Supabase
SUPABASE_URL="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Google Gemini AI
GEMINI_API_KEY="..."
GEMINI_API_KEY2="..."  # Opcional

# RabbitMQ
RABBITMQ_URL="..."
```

## 🧪 Executar Testes

```bash
# Testes completos
npm run test

# Interface visual de testes
npm run test:ui

# Cobertura de código
npm run coverage
```
