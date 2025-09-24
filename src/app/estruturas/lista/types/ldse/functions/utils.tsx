import { FunctionProps, FunctionInfo } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Função tamanho_atual
export const useTamanhoAtual = ({
  nodes,
  isAnimating,
  setIsAnimating,
  highlightCodeLine,
  log,
  setActiveNodeIndex,
  setAuxPointerIndex,
  setHighlightedNextPointerIndex,
  setLogs,
  setHighlightedLine,
}: FunctionProps) => {
  const tamanhoAtual = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Verificando tamanho atual da lista");
    highlightCodeLine(115); // def tamanho_atual(self):
    await sleep(1000);

    highlightCodeLine(116); // return self.quant
    log(`Tamanho da lista: ${nodes.length}`);
    await sleep(1500);

    log("Consulta de tamanho concluída");
    setIsAnimating(false);
    setHighlightedLine(null);
  };

  return { tamanhoAtual };
};

export const TamanhoAtualInfo: FunctionInfo = {
  title: "Verificando o tamanho atual da lista encadeada",
  description: "Visualize como obter o número de elementos na lista.",
  buttonText: "Ver tamanho",
  buttonColor: "bg-gray-500 hover:bg-gray-600",
};

// Função esta_vazia
export const useEstaVazia = ({
  nodes,
  isAnimating,
  setIsAnimating,
  highlightCodeLine,
  log,
  setActiveNodeIndex,
  setAuxPointerIndex,
  setHighlightedNextPointerIndex,
  setLogs,
  setHighlightedLine,
}: FunctionProps) => {
  const estaVazia = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Verificando se a lista está vazia");
    highlightCodeLine(118); // def esta_vazia(self):
    await sleep(1000);

    highlightCodeLine(119); // return self.quant == 0
    const isEmpty = nodes.length === 0;
    log(
      `Lista ${
        isEmpty ? "está vazia" : "não está vazia"
      } (quant == 0: ${isEmpty})`
    );
    await sleep(1500);

    log("Verificação concluída");
    setIsAnimating(false);
    setHighlightedLine(null);
  };

  return { estaVazia };
};

export const EstaVaziaInfo: FunctionInfo = {
  title: "Verificando se a lista encadeada está vazia",
  description: "Visualize como verificar se a lista não contém elementos.",
  buttonText: "Verificar vazia",
  buttonColor: "bg-slate-500 hover:bg-slate-600",
};

// Função ver_primeiro
export const useVerPrimeiro = ({
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
  const verPrimeiro = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Verificando o primeiro elemento da lista");
    highlightCodeLine(121); // def ver_primeiro(self):
    await sleep(1000);

    if (nodes.length > 0) {
      setActiveNodeIndex(0);
      scrollToNode(0);

      highlightCodeLine(122); // return self.prim.info
      log(`Primeiro elemento: '${nodes[0].value}'`);
      await sleep(1500);
    } else {
      log("Lista está vazia - não há primeiro elemento");
      await sleep(1000);
    }

    log("Consulta do primeiro elemento concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setHighlightedLine(null);
  };

  return { verPrimeiro };
};

export const VerPrimeiroInfo: FunctionInfo = {
  title: "Visualizando o primeiro elemento da lista",
  description: "Visualize como acessar o primeiro elemento da lista encadeada.",
  buttonText: "Ver primeiro",
  buttonColor: "bg-rose-500 hover:bg-rose-600",
};

// Função ver_ultimo
export const useVerUltimo = ({
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
  const verUltimo = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);

    log("Verificando o último elemento da lista");
    highlightCodeLine(124); // def ver_ultimo(self):
    await sleep(1000);

    if (nodes.length > 0) {
      const lastIndex = nodes.length - 1;
      setActiveNodeIndex(lastIndex);
      scrollToNode(lastIndex);

      highlightCodeLine(125); // return self.ult.info
      log(`Último elemento: '${nodes[lastIndex].value}'`);
      await sleep(1500);
    } else {
      log("Lista está vazia - não há último elemento");
      await sleep(1000);
    }

    log("Consulta do último elemento concluída");
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setHighlightedLine(null);
  };

  return { verUltimo };
};

export const VerUltimoInfo: FunctionInfo = {
  title: "Visualizando o último elemento da lista",
  description: "Visualize como acessar o último elemento da lista encadeada.",
  buttonText: "Ver último",
  buttonColor: "bg-emerald-500 hover:bg-emerald-600",
};
