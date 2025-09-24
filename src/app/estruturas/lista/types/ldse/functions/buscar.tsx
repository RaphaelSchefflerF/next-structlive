import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBuscar = ({
  nodes,
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
  const buscar = async (valor: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Iniciando busca pelo valor '${valor}'`);
    highlightCodeLine(97); // def buscar(self, valor):
    await sleep(1000);

    highlightCodeLine(98); // aux = self.prim
    log("aux = prim (começando do primeiro nó)");
    if (nodes.length > 0) {
      setAuxPointerIndex(0);
      scrollToNode(0);
    }
    await sleep(1000);

    highlightCodeLine(99); // posicao = 0
    log("posicao = 0");
    let posicao = 0;
    await sleep(1000);

    let currentIndex = 0;
    let found = false;

    highlightCodeLine(100); // while aux != None and aux.info != valor:
    log("Verificando condição do while");
    await sleep(1000);

    while (currentIndex < nodes.length && nodes[currentIndex].value !== valor) {
      log(`Comparando '${nodes[currentIndex].value}' com '${valor}'`);
      setActiveNodeIndex(currentIndex);
      setAuxPointerIndex(currentIndex);
      scrollToNode(currentIndex);
      await sleep(1500);

      highlightCodeLine(101); // aux = aux.prox
      log("aux = aux.prox");
      currentIndex++;
      posicao++;
      await sleep(1000);

      highlightCodeLine(102); // posicao += 1
      log(`posicao += 1 (posicao = ${posicao})`);
      await sleep(1000);

      if (currentIndex < nodes.length) {
        setAuxPointerIndex(currentIndex);
        scrollToNode(currentIndex);
        highlightCodeLine(100); // while aux != None and aux.info != valor:
        log("Verificando condição do while novamente");
        await sleep(1000);
      }
    }

    if (currentIndex < nodes.length && nodes[currentIndex].value === valor) {
      found = true;
      setActiveNodeIndex(currentIndex);
      setAuxPointerIndex(currentIndex);
      scrollToNode(currentIndex);

      highlightCodeLine(103); // if aux != None and aux.info == valor:
      log(`Elemento encontrado! aux.info = '${valor}'`);
      await sleep(1500);

      highlightCodeLine(104); // print(posicao)
      log(`Posição encontrada: ${posicao}`);
      await sleep(1000);
    } else {
      highlightCodeLine(106); // print(None)
      log("Elemento não encontrado - retornando None");
      await sleep(1000);
    }

    log(`Busca concluída. Resultado: ${found ? `posição ${posicao}` : "None"}`);
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { buscar };
};

export const BuscarInfo: FunctionInfo = {
  title: "Buscando um elemento na lista encadeada",
  description:
    "Visualize o processo de busca de um elemento na lista e sua posição.",
  buttonText: "Buscar elemento",
  buttonColor: "bg-indigo-500 hover:bg-indigo-600",
};
