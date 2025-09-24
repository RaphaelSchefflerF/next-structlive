import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useInserirInicio = ({
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
  const inserirInicio = async (valor: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Iniciando inserção de '${valor}' no início da lista`);
    highlightCodeLine(11); // def inserir_inicio(self, valor):
    await sleep(1000);

    log("Verificando se a lista está vazia");
    highlightCodeLine(12); // if self.quant == 0:
    await sleep(1000);

    if (nodes.length === 0) {
      log("Lista vazia: criando primeiro nó");
      highlightCodeLine(13); // self.prim = self.ult = No(valor, None)
      await sleep(1000);

      const newNode = { value: valor, id: Date.now() };
      setNodes([newNode]);
      log("prim = ult = novo nó");
      await sleep(1000);
    } else {
      log("Lista não vazia: inserindo no início");

      // Destacar o primeiro nó atual (que será o segundo)
      setActiveNodeIndex(0);
      scrollToNode(0);
      await sleep(1000);

      highlightCodeLine(15); // self.prim = No(valor, self.prim)
      log("Criando novo nó que aponta para o antigo primeiro");
      await sleep(1200);

      const newNode = { value: valor, id: Date.now() };
      setNodes([newNode, ...nodes]);

      log("prim agora aponta para o novo nó");
      await sleep(1000);

      // Scroll para mostrar o novo primeiro nó
      scrollToNode(0);
    }

    highlightCodeLine(16); // self.quant += 1
    log("Incrementando contador: quant += 1");
    await sleep(1000);

    log("Inserção no início concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { inserirInicio };
};

export const InserirInicioInfo: FunctionInfo = {
  title: "Inserindo um novo nó no início de uma lista encadeada",
  description:
    "Visualize o comportamento da inserção de um novo elemento no início da lista.",
  buttonText: "Inserir no início",
  buttonColor: "bg-purple-500 hover:bg-purple-600",
};
