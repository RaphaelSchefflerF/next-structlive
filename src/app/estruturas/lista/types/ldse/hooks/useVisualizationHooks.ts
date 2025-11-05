import {
  useRemoverFim,
  useInserirFim,
  useRemoverInicio,
  useInserirInicio,
  useBuscar,
  useShow,
  useRemoverElemento,
  useInserirApos,
  useInserirAntes,
  useTamanhoAtual,
  useEstaVazia,
  useVerPrimeiro,
  useVerUltimo,
  type Node,
} from "../functions/index_clean";

interface UseVisualizationHooksProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  highlightCodeLine: (lineNumber: number) => void;
  log: (message: string) => void;
  setActiveNodeIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setAuxPointerIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHighlightedNextPointerIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  scrollToNode: (index: number) => void;
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedLine: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useVisualizationHooks = (props: UseVisualizationHooksProps) => {
  const removerFimHook = useRemoverFim(props);
  const inserirFimHook = useInserirFim(props);
  const removerInicioHook = useRemoverInicio(props);
  const inserirInicioHook = useInserirInicio(props);
  const buscarHook = useBuscar(props);
  const showHook = useShow(props);
  const removerElementoHook = useRemoverElemento(props);
  const inserirAposHook = useInserirApos(props);
  const inserirAntesHook = useInserirAntes(props);
  const tamanhoAtualHook = useTamanhoAtual(props);
  const estaVaziaHook = useEstaVazia(props);
  const verPrimeiroHook = useVerPrimeiro(props);
  const verUltimoHook = useVerUltimo(props);

  return {
    removerFimHook,
    inserirFimHook,
    removerInicioHook,
    inserirInicioHook,
    buscarHook,
    showHook,
    removerElementoHook,
    inserirAposHook,
    inserirAntesHook,
    tamanhoAtualHook,
    estaVaziaHook,
    verPrimeiroHook,
    verUltimoHook,
  };
};
