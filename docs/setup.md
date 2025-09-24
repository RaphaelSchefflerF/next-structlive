# ⚙️ Setup do Ambiente

Guia para iniciar o projeto localmente do zero.

## ✅ Pré-requisitos

- Node.js >= 18
- npm (ou pnpm/yarn)
- Git
- (Opcional) Docker + Docker Compose
- Conta Google (OAuth), Supabase, chave Gemini

Verificar:

```bash
node --version
npm --version
git --version
docker --version   # opcional
```

## 📥 Clonar

```bash
git clone <url-do-repositorio>
cd StructLive
```

## 📦 Instalar Dependências

```bash
npm install
```

## 🔐 Arquivo .env

Se .env.example não existir (não encontrado), crie:

```bash
cp .env.example .env   # se existir
# ou criar manualmente:
```

Conteúdo mínimo:

```env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
GEMINI_API_KEY=""
GEMINI_API_KEY2=""
RABBITMQ_URL="amqp://guest:guest@localhost:5672"
```

Gerar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## 🔑 Google OAuth (Resumo)

1. Google Cloud Console → Criar Projeto.
2. OAuth consent screen → External.
3. Credentials → OAuth Client ID → Web.
4. Redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

5. Copiar Client ID / Secret → .env.

## 🗄 Supabase

1. Criar projeto.
2. Pegar Project URL e service_role key.
3. Colocar no .env.
4. Criar tabelas (modelo fictício exemplo):

```sql
-- exemplo (adaptar)
create table atividades (
  id uuid primary key default gen_random_uuid(),
  titulo text,
  descricao text,
  estrutura text,
  dificuldade text,
  created_at timestamptz default now()
);
```

## 🤖 RabbitMQ (Docker)

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

UI: http://localhost:15672 (guest/guest)

## 🧠 Gemini

Gerar chave em https://aistudio.google.com/ → adicionar GEMINI_API_KEY.

## ▶️ Rodar Dev

```bash
npm run dev
```

Abrir http://localhost:3000

## 🛠 Worker (se implementado)

```bash
npm run start:worker   # script deve existir (ver package.json) - se não, criar
```

## 🧪 Testes

```bash
npm test
npm run test:watch
npm run test:ui
npm run coverage
```

## 🐳 Docker Compose (Se tiver docker-compose.yml)

Não localizado no snapshot → “não encontrado”.
Criar exemplo:

```yaml
version: "3.9"
services:
  app:
    build: .
    env_file: .env
    ports: ["3000:3000"]
    command: "npm run dev"
  rabbit:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

## 🔄 Scripts Úteis (ver package.json)

Exemplos comuns (ajustar se faltarem):

```bash
npm run dev
npm run build
npm start
npm test
npm run coverage
```

## 🩺 Troubleshooting

| Problema                    | Causa                       | Solução                        |
| --------------------------- | --------------------------- | ------------------------------ |
| 404 em /home                | Rota não existente → usar / | Acessar rota correta           |
| Sessão não carrega          | Variáveis Google faltando   | Preencher .env e reiniciar     |
| Feedback IA nunca chega     | Worker/fila ausente         | Subir RabbitMQ e worker        |
| ERRO: fetch /api/atividades | Rota não implementada       | Criar route.ts conforme padrão |
| NEXTAUTH_URL inválido       | URL diferente               | Ajustar no .env                |

## 🧹 Limpar Cache

```bash
rm -rf .next
npm run dev
```

## 🔐 Segurança (Dev vs Prod)

| Item             | Dev                   | Prod                        |
| ---------------- | --------------------- | --------------------------- |
| NEXTAUTH_URL     | http://localhost:3000 | URL domínio                 |
| service_role key | Usada direto          | Mover para backend seguro   |
| Logs             | Console               | Observabilidade (ELK, etc.) |

## ✅ Checklist Final

- [ ] Node >= 18
- [ ] .env preenchido
- [ ] Login Google funcionando
- [ ] Página home renderiza
- [ ] Atividade lista abre
- [ ] Feedback IA aparece (quando worker ativo)

Pronto: seguir para docs/how-to-add-a-module.md.
