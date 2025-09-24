import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useRemoverInicio = ({
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
  const removerInicio = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Iniciando remoção do primeiro nó");
    highlightCodeLine(25); // def remover_inicio(self):
    await sleep(1000);

    log("Verificando se a lista possui apenas um nó");
    highlightCodeLine(26); // if self.quant == 1:
    await sleep(1000);

    if (nodes.length === 1) {
      log("A lista possui apenas um nó");
      await sleep(1000);

      highlightCodeLine(27); // self.prim = self.ult = None
      log("Removendo o único nó: prim = ult = None");
      await sleep(1000);

      setNodes([]);
    } else {
      log("Lista com múltiplos nós");

      // Destacar o primeiro nó
      setActiveNodeIndex(0);
      scrollToNode(0);
      await sleep(1000);

      highlightCodeLine(29); // self.prim = self.prim.prox
      log("Movendo prim para o próximo nó");
      setHighlightedNextPointerIndex(0);
      await sleep(1200);

      setNodes(nodes.slice(1));
      log("prim agora aponta para o segundo nó");
      await sleep(1000);

      setHighlightedNextPointerIndex(null);
    }

    highlightCodeLine(30); // self.quant -= 1
    log("Decrementando contador: quant -= 1");
    await sleep(1000);

    log("Remoção do início concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { removerInicio };
};

export const RemoverInicioInfo: FunctionInfo = {
  title: "Removendo o primeiro nó de uma lista encadeada",
  description:
    "Visualize o comportamento da remoção do primeiro elemento da lista.",
  buttonText: "Remover do início",
  buttonColor: "bg-red-500 hover:bg-red-600",
};
