import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useRemoverElemento = ({
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
  const removerElemento = async (valor: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Iniciando remoção do elemento '${valor}'`);
    highlightCodeLine(76); // def remover_elemento(self, valor):
    await sleep(1000);

    highlightCodeLine(77); // anterior = None
    log("anterior = None");
    await sleep(1000);

    highlightCodeLine(78); // atual = self.prim
    log("atual = prim (começando do primeiro nó)");
    if (nodes.length > 0) {
      setActiveNodeIndex(0);
      scrollToNode(0);
    }
    await sleep(1000);

    let currentIndex = 0;
    let anteriorIndex = -1;

    highlightCodeLine(79); // while atual != None and atual.info != valor:
    log("Verificando condição do while");
    await sleep(1000);

    while (currentIndex < nodes.length && nodes[currentIndex].value !== valor) {
      log(`Comparando '${nodes[currentIndex].value}' com '${valor}'`);
      setActiveNodeIndex(currentIndex);
      scrollToNode(currentIndex);
      await sleep(1500);

      highlightCodeLine(80); // anterior = atual
      log("anterior = atual");
      anteriorIndex = currentIndex;
      await sleep(1000);

      highlightCodeLine(81); // atual = atual.prox
      log("atual = atual.prox");
      currentIndex++;
      await sleep(1000);

      if (currentIndex < nodes.length) {
        setActiveNodeIndex(currentIndex);
        scrollToNode(currentIndex);
        highlightCodeLine(79); // while atual != None and atual.info != valor:
        log("Verificando condição do while novamente");
        await sleep(1000);
      }
    }

    if (currentIndex < nodes.length && nodes[currentIndex].value === valor) {
      setActiveNodeIndex(currentIndex);
      scrollToNode(currentIndex);

      highlightCodeLine(82); // if atual != None:
      log(`Elemento '${valor}' encontrado!`);
      await sleep(1000);

      if (currentIndex === 0) {
        highlightCodeLine(83); // if atual == self.prim:
        log("Elemento é o primeiro da lista");
        await sleep(1000);

        highlightCodeLine(84); // self.remover_inicio()
        log("Chamando remover_inicio()");
        await sleep(1000);

        setNodes(nodes.slice(1));
      } else if (currentIndex === nodes.length - 1) {
        highlightCodeLine(85); // elif atual == self.ult:
        log("Elemento é o último da lista");
        await sleep(1000);

        highlightCodeLine(86); // self.remover_fim()
        log("Chamando remover_fim()");
        await sleep(1000);

        setNodes(nodes.slice(0, -1));
      } else {
        highlightCodeLine(88); // anterior.prox = atual.prox
        log("Elemento está no meio - removendo ligação");
        setHighlightedNextPointerIndex(anteriorIndex);
        await sleep(1200);

        const newNodes = [...nodes];
        newNodes.splice(currentIndex, 1);
        setNodes(newNodes);

        highlightCodeLine(89); // self.quant -= 1
        log("Decrementando contador: quant -= 1");
        await sleep(1000);
      }
    } else {
      log(`Elemento '${valor}' não encontrado na lista`);
      await sleep(1000);
    }

    log("Remoção concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { removerElemento };
};

export const RemoverElementoInfo: FunctionInfo = {
  title: "Removendo um elemento específico da lista encadeada",
  description:
    "Visualize o processo de busca e remoção de um elemento específico da lista.",
  buttonText: "Remover elemento",
  buttonColor: "bg-orange-500 hover:bg-orange-600",
};
