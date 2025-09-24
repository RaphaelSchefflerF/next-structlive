import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useInserirFim = ({
  nodes,
  setNodes,
  isAnimating,
  setIsAnimating,
  highlightCodeLine,
  log,
  setActiveNodeIndex,
  setAuxPointerIndex,
  setHighlightedNextPointerIndex,
  scrollToNode,
  setLogs,
  setHighlightedLine,
}: FunctionProps) => {
  const inserirFim = async (valor: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Iniciando inserção de '${valor}' no final da lista`);
    highlightCodeLine(18); // def inserir_fim(self, valor):
    await sleep(1000);

    log("Verificando se a lista está vazia");
    highlightCodeLine(19); // if self.quant == 0:
    await sleep(1000);

    if (nodes.length === 0) {
      log("Lista vazia: criando primeiro nó");
      highlightCodeLine(20); // self.prim = self.ult = No(valor, None)
      await sleep(1000);

      const newNode = { value: valor, id: Date.now() };
      setNodes([newNode]);
      log("prim = ult = novo nó");
      await sleep(1000);
    } else {
      log("Lista não vazia: inserindo no final");

      // Destacar o último nó atual
      const lastIndex = nodes.length - 1;
      setActiveNodeIndex(lastIndex);
      scrollToNode(lastIndex);
      await sleep(1000);

      highlightCodeLine(22); // self.ult.prox = self.ult = No(valor, None)
      log("Criando novo nó e atualizando ponteiros");
      setHighlightedNextPointerIndex(lastIndex);
      await sleep(1200);

      const newNode = { value: valor, id: Date.now() };
      setNodes([...nodes, newNode]);

      log("ult.prox = novo nó; ult = novo nó");
      await sleep(1000);

      setHighlightedNextPointerIndex(null);
      scrollToNode(nodes.length); // Scroll to new node position
    }

    highlightCodeLine(23); // self.quant += 1
    log("Incrementando contador: quant += 1");
    await sleep(1000);

    log("Inserção concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { inserirFim };
};

export const InserirFimInfo: FunctionInfo = {
  title: "Inserindo um novo nó no final de uma lista encadeada",
  description:
    "Visualize o comportamento da inserção de um novo elemento no final da lista.",
  buttonText: "Inserir no fim",
  buttonColor: "bg-blue-500 hover:bg-blue-600",
};
