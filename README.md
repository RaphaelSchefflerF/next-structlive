# StructLive DSI-2501

> Plataforma interativa para aprendizado de estruturas de dados desenvolvida para a disciplina DSI-2501

## 📋 Sobre o Projeto

StructLive é uma aplicação web educativa que permite aos estudantes aprender estruturas de dados através de visualizações interativas e exemplos práticos. A plataforma aborda vários tipos de estruturas como listas, pilhas, filas e árvores, fornecendo explicações detalhadas, visualizações e exemplos de implementação.

## 📁 Estrutura do Projeto

```
structlive-dsi-2501/
├── src/                      # Código fonte
│   ├── app/                 # Páginas organizadas por rotas (Next.js App Router)
│   │   ├── estruturas/     # Páginas específicas para cada estrutura de dados
│   │   │   ├── lists/      # Estrutura de dados: Listas
│   │   │   ├── stacks/     # Estrutura de dados: Pilhas
│   │   │   ├── queues/     # Estrutura de dados: Filas
│   │   │   └── arvores/    # Estrutura de dados: Árvores
│   ├── components/          # Componentes React reutilizáveis
│   │   └── ui/             # Componentes de interface do usuário
│   ├── contexts/           # Contextos React para gerenciamento de estado
│   └── lib/                # Funções e utilitários
├── public/                  # Arquivos estáticos públicos
└── .next/                   # Arquivos de build do Next.js (gerados automaticamente)
```

## 🚀 Começando

### Pré-requisitos

- Node.js >= 16.x
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/structlive-dsi-2501.git
```

2. Instale as dependências

```bash
cd structlive-dsi-2501
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

4. Acesse `http://localhost:3000` no seu navegador

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org/) - Framework React para desenvolvimento web
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis

## 📊 Estruturas de Dados Implementadas

- Listas - Estrutura de dados sequencial com operações flexíveis

## 📝 Funcionalidades

- Visualização interativa de estruturas de dados
- Implementações práticas em TypeScript/JavaScript
- Exemplos de operações em cada estrutura
- Interface intuitiva com design responsivo
- Progressão de aprendizado com acompanhamento de progresso

## 👥 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
