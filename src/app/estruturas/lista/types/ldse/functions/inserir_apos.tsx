import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useInserirApos = ({
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
  const inserirApos = async (valor1: string, valor2: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Inserindo '${valor1}' após '${valor2}'`);
    highlightCodeLine(53); // def inserir_apos(self, valor1, valor2):
    await sleep(1000);

    highlightCodeLine(54); // aux = self.prim
    log("aux = prim (começando do primeiro nó)");
    if (nodes.length > 0) {
      setAuxPointerIndex(0);
      scrollToNode(0);
    }
    await sleep(1000);

    let currentIndex = 0;

    highlightCodeLine(55); // while aux != None and aux.info != valor2:
    log(`Procurando pelo elemento '${valor2}'`);
    await sleep(1000);

    while (
      currentIndex < nodes.length &&
      nodes[currentIndex].value !== valor2
    ) {
      log(`Comparando '${nodes[currentIndex].value}' com '${valor2}'`);
      setActiveNodeIndex(currentIndex);
      setAuxPointerIndex(currentIndex);
      scrollToNode(currentIndex);
      await sleep(1500);

      highlightCodeLine(56); // aux = aux.prox
      log("aux = aux.prox");
      currentIndex++;
      await sleep(1000);

      if (currentIndex < nodes.length) {
        setAuxPointerIndex(currentIndex);
        scrollToNode(currentIndex);
        highlightCodeLine(55); // while aux != None and aux.info != valor2:
        log("Verificando condição do while novamente");
        await sleep(1000);
      }
    }

    if (currentIndex < nodes.length && nodes[currentIndex].value === valor2) {
      setActiveNodeIndex(currentIndex);
      setAuxPointerIndex(currentIndex);
      scrollToNode(currentIndex);

      highlightCodeLine(57); // if aux != None:
      log(`Elemento '${valor2}' encontrado!`);
      await sleep(1000);

      if (currentIndex === nodes.length - 1) {
        highlightCodeLine(58); // if aux.prox == None:
        log("Elemento é o último - inserindo no fim");
        await sleep(1000);

        highlightCodeLine(59); // self.inserir_fim(valor1)
        log(`Chamando inserir_fim('${valor1}')`);
        await sleep(1000);

        const newNode = { value: valor1, id: Date.now() };
        setNodes([...nodes, newNode]);
      } else {
        highlightCodeLine(61); // aux.prox = No(valor1, aux.prox)
        log(`Inserindo '${valor1}' após '${valor2}'`);
        setHighlightedNextPointerIndex(currentIndex);
        await sleep(1200);

        const newNode = { value: valor1, id: Date.now() };
        const newNodes = [...nodes];
        newNodes.splice(currentIndex + 1, 0, newNode);
        setNodes(newNodes);

        highlightCodeLine(62); // self.quant += 1
        log("Incrementando contador: quant += 1");
        await sleep(1000);
      }
    } else {
      log(`Elemento '${valor2}' não encontrado na lista`);
      await sleep(1000);
    }

    log("Inserção após elemento concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { inserirApos };
};

export const InserirAposInfo: FunctionInfo = {
  title: "Inserindo após um elemento específico da lista",
  description:
    "Visualize a inserção de um novo elemento após um elemento existente na lista.",
  buttonText: "Inserir após",
  buttonColor: "bg-cyan-500 hover:bg-cyan-600",
};
