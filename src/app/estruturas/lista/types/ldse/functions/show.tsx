import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useShow = ({
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
  const show = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Iniciando exibição da lista");
    highlightCodeLine(108); // def show(self):
    await sleep(1000);

    highlightCodeLine(109); // aux = self.prim
    log("aux = prim (começando do primeiro nó)");
    if (nodes.length > 0) {
      setAuxPointerIndex(0);
      scrollToNode(0);
    }
    await sleep(1000);

    let currentIndex = 0;
    let displayString = "";

    highlightCodeLine(110); // while aux != None:
    log("Verificando condição do while");
    await sleep(1000);

    while (currentIndex < nodes.length) {
      setActiveNodeIndex(currentIndex);
      setAuxPointerIndex(currentIndex);
      scrollToNode(currentIndex);

      highlightCodeLine(111); // print(aux.info, end = " ")
      log(`Exibindo: '${nodes[currentIndex].value}'`);
      displayString += nodes[currentIndex].value + " ";
      await sleep(1500);

      highlightCodeLine(112); // aux = aux.prox
      log("aux = aux.prox");
      currentIndex++;
      await sleep(1000);

      if (currentIndex < nodes.length) {
        setAuxPointerIndex(currentIndex);
        scrollToNode(currentIndex);
        highlightCodeLine(110); // while aux != None:
        log("Verificando condição do while novamente");
        await sleep(1000);
      }
    }

    highlightCodeLine(113); // print("\\n")
    log(`Lista completa: ${displayString.trim() || "(vazia)"}`);
    await sleep(1000);

    log("Exibição da lista concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { show };
};

export const ShowInfo: FunctionInfo = {
  title: "Exibindo todos os elementos da lista encadeada",
  description:
    "Visualize o percurso completo da lista mostrando todos os elementos.",
  buttonText: "Mostrar lista",
  buttonColor: "bg-teal-500 hover:bg-teal-600",
};
