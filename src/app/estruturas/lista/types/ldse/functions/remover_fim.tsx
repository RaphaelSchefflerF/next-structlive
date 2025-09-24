import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useRemoverFim = ({
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
  const removerFim = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Iniciando remoção do último nó");
    highlightCodeLine(127); // def remover_fim(self):
    await sleep(1000);

    log("Verificando se a lista possui apenas um nó");
    highlightCodeLine(128); // if self.quant == 1:
    await sleep(1000);

    if (nodes.length === 1) {
      log("A lista possui apenas um nó");
      await sleep(1000);

      highlightCodeLine(129); // self.prim = self.ult = None
      log("Removendo o único nó: prim = ult = None");
      await sleep(1000);

      highlightCodeLine(136); // self.quant -= 1
      log("Decrementando contador: quant -= 1");
      setNodes([]);
      await sleep(1000);
    } else {
      highlightCodeLine(131); // aux = self.prim
      log("aux = prim (Começando do primeiro nó)");
      setActiveNodeIndex(0);
      setAuxPointerIndex(0);
      scrollToNode(0);
      await sleep(1500);

      let currentIndex = 0;
      highlightCodeLine(132); // while aux.prox != self.ult:
      log("Verificando se aux.prox é diferente de ult");
      await sleep(1000);

      while (currentIndex < nodes.length - 2) {
        highlightCodeLine(133); // aux = aux.prox
        log("Movendo aux para o próximo nó");
        setActiveNodeIndex(currentIndex + 1);
        setAuxPointerIndex(currentIndex + 1);
        currentIndex++;
        scrollToNode(currentIndex);
        await sleep(1500);

        highlightCodeLine(132); // while aux.prox != self.ult:
        log("Verificando se aux.prox é diferente de ult");
        await sleep(1000);
      }

      highlightCodeLine(134); // self.ult = aux
      log("Atualizando: ult = aux");
      await sleep(1200);

      highlightCodeLine(135); // self.ult.prox = None
      log("Definindo ult.prox = None");
      setHighlightedNextPointerIndex(currentIndex); // Destaca o ponteiro next do novo último nó
      await sleep(1200);

      highlightCodeLine(136); // self.quant -= 1
      log("Decrementando contador: quant -= 1");
      setNodes(nodes.slice(0, -1));
      await sleep(1000);

      setHighlightedNextPointerIndex(null); // Remove o destaque após a animação
    }

    log("Remoção concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { removerFim };
};

export const RemoverFimInfo: FunctionInfo = {
  title: "Removendo o último nó de uma lista encadeada",
  description:
    "Visualize o comportamento da remoção do último elemento da lista.",
  buttonText: "Remover nó final",
  buttonColor: "bg-green-500 hover:bg-green-600",
};
