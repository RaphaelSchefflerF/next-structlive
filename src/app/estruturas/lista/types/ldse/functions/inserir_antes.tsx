import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useInserirAntes = ({
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
  const inserirAntes = async (valor1: string, valor2: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log(`Inserindo '${valor1}' antes de '${valor2}'`);
    highlightCodeLine(64); // def inserir_antes(self, valor1, valor2):
    await sleep(1000);

    highlightCodeLine(65); // anterior = None
    log("anterior = None");
    await sleep(1000);

    highlightCodeLine(66); // atual = self.prim
    log("atual = prim (começando do primeiro nó)");
    if (nodes.length > 0) {
      setActiveNodeIndex(0);
      scrollToNode(0);
    }
    await sleep(1000);

    let currentIndex = 0;
    let anteriorIndex = -1;

    highlightCodeLine(67); // while atual != None and atual.info != valor2:
    log(`Procurando pelo elemento '${valor2}'`);
    await sleep(1000);

    while (
      currentIndex < nodes.length &&
      nodes[currentIndex].value !== valor2
    ) {
      log(`Comparando '${nodes[currentIndex].value}' com '${valor2}'`);
      setActiveNodeIndex(currentIndex);
      scrollToNode(currentIndex);
      await sleep(1500);

      highlightCodeLine(68); // anterior = atual
      log("anterior = atual");
      anteriorIndex = currentIndex;
      await sleep(1000);

      highlightCodeLine(69); // atual = atual.prox
      log("atual = atual.prox");
      currentIndex++;
      await sleep(1000);

      if (currentIndex < nodes.length) {
        setActiveNodeIndex(currentIndex);
        scrollToNode(currentIndex);
        highlightCodeLine(67); // while atual != None and atual.info != valor2:
        log("Verificando condição do while novamente");
        await sleep(1000);
      }
    }

    if (currentIndex < nodes.length && nodes[currentIndex].value === valor2) {
      setActiveNodeIndex(currentIndex);
      scrollToNode(currentIndex);

      highlightCodeLine(70); // if atual != None:
      log(`Elemento '${valor2}' encontrado!`);
      await sleep(1000);

      if (anteriorIndex === -1) {
        highlightCodeLine(71); // if anterior == None:
        log("Elemento é o primeiro - inserindo no início");
        await sleep(1000);

        highlightCodeLine(72); // self.inserir_inicio(valor1)
        log(`Chamando inserir_inicio('${valor1}')`);
        await sleep(1000);

        const newNode = { value: valor1, id: Date.now() };
        setNodes([newNode, ...nodes]);
      } else {
        highlightCodeLine(74); // anterior.prox = No(valor1, atual)
        log(`Inserindo '${valor1}' antes de '${valor2}'`);
        await sleep(1200);

        const newNode = { value: valor1, id: Date.now() };
        const newNodes = [...nodes];
        newNodes.splice(currentIndex, 0, newNode);
        setNodes(newNodes);

        highlightCodeLine(75); // self.quant += 1
        log("Incrementando contador: quant += 1");
        await sleep(1000);
      }
    } else {
      log(`Elemento '${valor2}' não encontrado na lista`);
      await sleep(1000);
    }

    log("Inserção antes do elemento concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedLine(null);
    setHighlightedNextPointerIndex(null);
  };

  return { inserirAntes };
};

export const InserirAntesInfo: FunctionInfo = {
  title: "Inserindo antes de um elemento específico da lista",
  description:
    "Visualize a inserção de um novo elemento antes de um elemento existente na lista.",
  buttonText: "Inserir antes",
  buttonColor: "bg-lime-500 hover:bg-lime-600",
};
