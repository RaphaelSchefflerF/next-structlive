export interface Node {
  value: string;
  id: number;
}

export interface FunctionProps {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  highlightCodeLine: (lineNumber: number) => void;
  log: (message: string) => void;
  setActiveNodeIndex: (index: number | null) => void;
  setAuxPointerIndex: (index: number | null) => void;
  setHighlightedNextPointerIndex: (index: number | null) => void;
  scrollToNode: (index: number) => void;
  setLogs: (logs: string[]) => void;
  setHighlightedLine: (line: number | null) => void;
}

export interface FunctionInfo {
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
}
