# 📋 Lista de Tarefas - Refatoração de Extensibilidade da Plataforma

> **Objetivo:** Transformar a arquitetura da plataforma de um sistema com lógica de UI hardcoded para um modelo de **"Configuração sobre Código"**. Isso tornará a adição de novas estruturas de dados (como tipos de listas) um processo simples, rápido e seguro, sem a necessidade de modificar o código-fonte existente.

---

## 🎯 Fase 1 - CRÍTICO (Sprint Atual)

**Foco:** Refatorar o sistema de Listas para ser orientado por configuração, sem quebrar a funcionalidade existente da "Lista Dinâmica Simplesmente Encadeada" (ldse).

### 1.1 - Preparação e Backup

- [x] **Task 1.1.1:** Fazer backup dos componentes "dispatcher"
  - **Ação:** Copie os seguintes arquivos, adicionando a extensão `.backup` no final de cada um:
    - `src/app/estruturas/lista/components/list-activity.tsx`
    - `src/app/estruturas/lista/components/list-challenge.tsx`
    - `src/app/estruturas/lista/components/list-theory.tsx`
    - `src/app/estruturas/lista/components/list-visualization.tsx`
  - **Resultado esperado:** Cópias de segurança criadas.
  - **⚠️ Aviso:** Este é um passo de segurança. Não pule.

- [x] **Task 1.1.2:** Fazer backup da página principal de Listas
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:** Crie uma cópia do arquivo chamada `page.tsx.backup` no mesmo diretório.
  - **Resultado esperado:** Cópia de segurança da página principal criada.

### 1.2 - Criação da Nova Arquitetura de Configuração

- [x] **Task 1.2.1:** Criar arquivo de configuração para a lista `ldse`
  - **Arquivo:** `src/app/estruturas/lista/types/ldse/config.ts` (novo arquivo)
  - **Ação:** Crie o arquivo com o seguinte conteúdo, que registra os componentes já existentes da `ldse`:
    ```typescript
    import Activity from "./activity";
    import Challenge from "./challenge";
    import Theory from "./theory";
    import Visualization from "./visualization";

    export const ldseConfig = {
      id: "ldse",
      name: "Lista Dinâmica Simplesmente Encadeada",
      components: {
        theory: Theory,
        visualization: Visualization,
        activity: Activity,
        challenge: Challenge,
      },
      disabled: false,
    };
    ```
  - **Resultado esperado:** O arquivo `config.ts` é criado e exporta a configuração da `ldse` sem erros.

- [x] **Task 1.2.2:** Criar o registro central de listas
  - **Arquivo:** `src/app/estruturas/lista/config.ts` (novo arquivo)
  - **Ação:** Crie o arquivo com o seguinte conteúdo para centralizar todas as configurações de listas:
    ```typescript
    import { ldseConfig } from "./types/ldse/config";

    export const listRegistry = {
      ldse: ldseConfig,
    };

    export const listOptions = Object.values(listRegistry).map((list) => ({
      id: list.id,
      name: list.name,
      disabled: list.disabled,
    }));
    ```
  - **Resultado esperado:** O arquivo `config.ts` é criado, importando a `ldseConfig` e exportando o `listRegistry` e `listOptions`.

- [x] **Task 1.2.3:** Criar o componente `ListContentRenderer`
  - **Arquivo:** `src/app/estruturas/lista/components/list-content-renderer.tsx` (novo arquivo)
  - **Ação:** Crie o componente genérico que irá substituir todos os `switch cases`:
    ```typescript
    import { listRegistry } from "../config";

    type Props = {
      listType: keyof typeof listRegistry;
      contentType: "theory" | "visualization" | "activity" | "challenge";
    };

    export default function ListContentRenderer({ listType, contentType }: Props) {
      const list = listRegistry[listType];
      if (!list) return <div>Tipo de lista não encontrado.</div>;

      const Component = list.components[contentType];
      if (!Component) return <div>Conteúdo não encontrado.</div>;

      return <Component />;
    }
    ```
  - **Resultado esperado:** O componente `ListContentRenderer` é criado sem erros.

### 1.3 - Refatoração Incremental da Página de Listas

- [x] **Task 1.3.1:** Refatorar o `Select` de tipos de lista
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:**
    1. Importe `listOptions` do novo arquivo de configuração: `import { listOptions } from "./config";`
    2. Substitua o conteúdo hardcoded de `<SelectGroup>` pelo código dinâmico abaixo:
       ```jsx
       <SelectGroup>
         {listOptions.map((option) => (
           <SelectItem key={option.id} value={option.id} disabled={option.disabled}>
             {option.name}
           </SelectItem>
         ))}
       </SelectGroup>
       ```
  - **Resultado esperado:** O dropdown na página de listas agora é renderizado dinamicamente. Ele deve mostrar apenas "Lista Dinâmica Simplesmente Encadeada" e as outras opções (desabilitadas) devem desaparecer.

- [x] **Task 1.3.2:** Substituir `ListTheory` pelo `ListContentRenderer`
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:**
    1. Importe o novo `ListContentRenderer`.
    2. Remova a importação de `ListTheory`.
    3. Encontre o `TabsContent` com `value="conteudo"` e substitua `<ListTheory tipo={tipoLista} />` por `<ListContentRenderer listType={tipoLista} contentType="theory" />`.
  - **Resultado esperado:** A aba "Conteúdo" continua a renderizar o componente de teoria da `ldse`, mas agora através do renderizador genérico.

- [x] **Task 1.3.3:** Substituir `ListVisualization` pelo `ListContentRenderer`
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:**
    1. Remova a importação de `ListVisualization`.
    2. Encontre o `TabsContent` com `value="visualization"` e substitua `<ListVisualization tipo={tipoLista} />` por `<ListContentRenderer listType={tipoLista} contentType="visualization" />`.
  - **Resultado esperado:** A aba "Visualização" continua a renderizar o componente de visualização da `ldse`.

- [x] **Task 1.3.4:** Substituir `ListActivity` pelo `ListContentRenderer`
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:**
    1. Remova a importação de `ListActivity`.
    2. Encontre o `TabsContent` com `value="practice"` e substitua `<ListActivity tipo={tipoLista} />` por `<ListContentRenderer listType={tipoLista} contentType="activity" />`.
  - **Resultado esperado:** A aba "Atividades" continua a renderizar o componente de atividades da `ldse`.

- [x] **Task 1.3.5:** Substituir `ListChallenge` pelo `ListContentRenderer`
  - **Arquivo:** `src/app/estruturas/lista/page.tsx`
  - **Ação:**
    1. Remova a importação de `ListChallenge`.
    2. Encontre o `TabsContent` com `value="challenge"` e substitua `<ListChallenge tipo={tipoLista} />` por `<ListContentRenderer listType={tipoLista} contentType="challenge" />`.
  - **Resultado esperado:** A aba "Desafios" continua a renderizar o componente de desafios da `ldse`.

### 1.4 - Verificação e Limpeza

- [x] **Task 1.4.1:** Teste de verificação funcional
  - **Ação:** Inicie a aplicação e navegue para a página de Listas.
    - **Cenário 1:** Verifique se o dropdown de seleção de lista mostra "Lista Dinâmica Simplesmente Encadeada".
    - **Cenário 2:** Clique em cada uma das abas ("Conteúdo", "Visualização", "Atividades", "Desafios").
  - **Resultado esperado:** Todas as abas devem exibir seu conteúdo corretamente, sem erros no console. O layout e a funcionalidade devem ser idênticos aos de antes da refatoração.
  - **❌ Se algo falhar, reverta para os arquivos de backup antes de prosseguir.**

- [x] **Task 1.4.2:** Remover componentes "dispatcher" obsoletos
  - **⚠️ AVISO:** Execute esta tarefa **SOMENTE** após o sucesso da Task 1.4.1.
  - **Ação:** Delete os seguintes arquivos, que foram substituídos pelo `ListContentRenderer`:
    - `src/app/estruturas/lista/components/list-activity.tsx`
    - `src/app/estruturas/lista/components/list-challenge.tsx`
    - `src/app/estruturas/lista/components/list-theory.tsx`
    - `src/app/estruturas/lista/components/list-visualization.tsx`
  - **Resultado esperado:** Código obsoleto removido. A aplicação deve continuar funcionando perfeitamente.

- [x] **Task 1.4.3:** Remover arquivos de backup
  - **⚠️ AVISO:** Execute esta tarefa **SOMENTE** após confirmar que toda a Fase 1 foi um sucesso.
  - **Ação:** Delete os arquivos `.backup` criados na Task 1.1.
  - **Resultado esperado:** Projeto limpo, sem arquivos de backup.

---

## 🚀 Fase 2 - IMPORTANTE (Próximo Sprint)

**Foco:** Habilitar os outros tipos de lista (`les`, `lee`, `ldde`, `lc`) usando a nova arquitetura de configuração.

### 2.1 - Habilitar Tipos de Lista Adicionais

- [x] **Task 2.1.1:** Criar e registrar a configuração para `ldde`
  - **Ação:**
    1. Crie `src/app/estruturas/lista/types/ldde/config.ts` (similar à Task 1.2.1).
    2. Importe e registre `lddeConfig` em `src/app/estruturas/lista/config.ts`.
    3. No arquivo de configuração da `ldde`, defina `disabled: false`.
  - **Resultado esperado:** A "Lista Dinâmica Duplamente Encadeada" agora aparece habilitada no dropdown e seu conteúdo é renderizado corretamente.

- [x] **Task 2.1.2:** Criar e registrar a configuração para `lc`
  - **Ação:** Repita o processo da Task 2.1.1 para a "Lista Circular" (`lc`).
  - **Resultado esperado:** A "Lista Circular" agora aparece habilitada no dropdown e funciona.

- [x] **Task 2.1.3:** Criar e registrar a configuração para `lee`
  - **Ação:** Repita o processo da Task 2.1.1 para a "Lista Estática Encadeada" (`lee`).
  - **Resultado esperado:** A "Lista Estática Encadeada" agora aparece habilitada no dropdown e funciona.

- [x] **Task 2.1.4:** Criar e registrar a configuração para `les`
  - **Ação:** Repita o processo da Task 2.1.1 para a "Lista Estática Sequencial" (`les`).
  - **Resultado esperado:** A "Lista Estática Sequencial" agora aparece habilitada no dropdown e funciona.

### 2.2 - Teste de Integração

- [x] **Task 2.2.1:** Testar todos os tipos de lista
  - **Ação:** Navegue pela página de listas e selecione cada um dos 5 tipos de lista no dropdown. Para cada tipo, verifique todas as 4 abas.
  - **Resultado esperado:** Todos os tipos de lista e todas as suas respectivas abas carregam o conteúdo correto sem erros.

---

## 🎨 Fase 3 - MELHORIAS (Médio Prazo)

**Foco:** Polir a solução com tipagem mais forte e remover código morto.

### 3.1 - Fortalecimento da Tipagem

- [x] **Task 3.1.1:** Definir tipos genéricos para a configuração
  - **Arquivo:** `src/app/estruturas/lista/config.ts`
  - **Ação:** Defina e exporte interfaces/tipos para a configuração, garantindo que todo `config` de lista tenha as propriedades `id`, `name`, e `components` com as chaves corretas.
    ```typescript
    import { ComponentType } from 'react';

    export interface ListComponentMap {
      theory: ComponentType;
      visualization: ComponentType;
      activity: ComponentType;
      challenge: ComponentType;
    }

    export interface ListConfig {
      id: string;
      name: string;
      components: ListComponentMap;
      disabled: boolean;
    }
    ```
  - **Resultado esperado:** Tipos robustos criados para guiar o desenvolvimento.

- [x] **Task 3.1.2:** Aplicar os novos tipos
  - **Ação:** Importe `ListConfig` em cada arquivo `config.ts` de lista (ex: `ldse/config.ts`) e aplique o tipo ao objeto exportado. Ex: `export const ldseConfig: ListConfig = { ... };`
  - **Resultado esperado:** O TypeScript agora garante que todas as configurações de lista são válidas, prevenindo erros em tempo de compilação.

---

## 📊 Métricas de Sucesso

### Antes da Refatoração
- ❌ **Tempo para adicionar nova lista:** ~20-30 minutos
- ❌ **Arquivos a modificar:** 3+
- ❌ **Risco de erro:** Alto (modificações manuais em múltiplos locais)

### Após Fase 1 (Crítico)
- ✅ **Arquitetura base implementada:** O sistema já suporta a nova forma de adicionar listas.
- ✅ **Funcionalidade principal (`ldse`) preservada:** Zero impacto para o usuário final.

### Após Fase 2 (Importante)
- ✅ **Tempo para adicionar nova lista:** ~5-10 minutos
- ✅ **Arquivos a modificar:** Apenas 2 (o novo `config.ts` da lista e o `config.ts` central)
- ✅ **Risco de erro:** Baixo (adição de código isolado, sem modificar lógica existente)

### Após Fase 3 (Melhorias)
- ✅ **Segurança de Tipo:** Erros de configuração são pegos em tempo de compilação.
- ✅ **Código limpo e auto-documentado:** A estrutura de configuração e os tipos tornam a intenção do código clara.

---

## 🚨 Notas Importantes

### ⚠️ CUIDADOS ao Executar
1. **Siga a ordem NUMÉRICA:** As tarefas foram ordenadas para respeitar as dependências.
2. **Não pule os backups:** Eles são sua rede de segurança.
3. **Teste após cada grupo de tarefas:** Verificações constantes evitam que erros se acumulem.

### 🎯 Ordem de Prioridade
- **Fase 1** estabelece a fundação. Sem ela, nada mais funciona.
- **Fase 2** entrega o valor principal da refatoração (extensibilidade para todas as listas).
- **Fase 3** é o polimento técnico que garante a manutenibilidade a longo prazo.

### 📝 Checklist de Verificação (Após Cada Fase)
- [ ] Build (`npm run build`) passa sem erros.
- [ ] Testes automatizados (`npm test`) passam.
- [ ] O layout da página de listas está intacto.
- [ ] A navegação entre abas e a seleção de listas funcionam como esperado.

---

**Total de Tasks:** 13 tarefas distribuídas em 3 fases
**Estimativa Fase 1:** ~1 - 2 horas
**Estimativa Fase 2:** ~1 hora
**Estimativa Fase 3:** ~30 minutos
