"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useRemoverFim,
  RemoverFimInfo,
  useInserirFim,
  InserirFimInfo,
  useRemoverInicio,
  RemoverInicioInfo,
  useInserirInicio,
  InserirInicioInfo,
  useBuscar,
  BuscarInfo,
  useShow,
  ShowInfo,
  useRemoverElemento,
  RemoverElementoInfo,
  useInserirApos,
  InserirAposInfo,
  useInserirAntes,
  InserirAntesInfo,
  useTamanhoAtual,
  TamanhoAtualInfo,
  useEstaVazia,
  EstaVaziaInfo,
  useVerPrimeiro,
  VerPrimeiroInfo,
  useVerUltimo,
  VerUltimoInfo,
  type Node,
} from "./functions/index_clean";

export default function LdseVisualization() {
  const { status } = useSession();
  const router = useRouter();
  const codeContainerRef = useRef<HTMLDivElement>(null);

  // Estados
  const [nodes, setNodes] = useState<Node[]>([
    { value: "A", id: 1 },
    { value: "B", id: 2 },
    { value: "C", id: 3 },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [auxPointerIndex, setAuxPointerIndex] = useState<number | null>(null);
  const [highlightedNextPointerIndex, setHighlightedNextPointerIndex] =
    useState<number | null>(null);
  const [selectedFunction, setSelectedFunction] =
    useState<string>("remover_fim");
  const [inputValue, setInputValue] = useState<string>("D");
  const [inputValue2, setInputValue2] = useState<string>("B");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const highlightCodeLine = React.useCallback((lineNumber: number) => {
    setHighlightedLine(lineNumber);

    setTimeout(() => {
      const container = codeContainerRef.current;
      if (container && lineNumber > 0) {
        const lineElement = container.querySelector(
          `[data-line="${lineNumber}"]`
        ) as HTMLElement;
        if (lineElement) {
          lineElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }
    }, 200);
  }, []);

  const log = React.useCallback((message: string) => {
    setLogs((prev) => [...prev, `> ${message}`]);
  }, []);

  // Função para centralizar a visualização em um nó específico
  const scrollToNode = (index: number) => {
    setTimeout(() => {
      const container = document.querySelector(".list-container");
      if (container && nodes.length > 0 && index >= 0 && index < nodes.length) {
        const nodeWidth = 84; // largura aproximada do nó + seta
        const containerWidth = container.clientWidth;
        const scrollLeft =
          index * nodeWidth - containerWidth / 2 + nodeWidth / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Hooks das funções
  const removerFimHook = useRemoverFim({
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
  });

  const inserirFimHook = useInserirFim({
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
  });

  const removerInicioHook = useRemoverInicio({
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
  });

  const inserirInicioHook = useInserirInicio({
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
  });

  const buscarHook = useBuscar({
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
  });

  const showHook = useShow({
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
  });

  const removerElementoHook = useRemoverElemento({
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
  });

  const inserirAposHook = useInserirApos({
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
  });

  const inserirAntesHook = useInserirAntes({
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
  });

  const tamanhoAtualHook = useTamanhoAtual({
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
  });

  const estaVaziaHook = useEstaVazia({
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
  });

  const verPrimeiroHook = useVerPrimeiro({
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
  });

  const verUltimoHook = useVerUltimo({
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
  });

  // Configuração das funções disponíveis
  const functionConfigs = {
    remover_fim: {
      hook: removerFimHook,
      info: RemoverFimInfo,
    },
    inserir_fim: {
      hook: inserirFimHook,
      info: InserirFimInfo,
    },
    remover_inicio: {
      hook: removerInicioHook,
      info: RemoverInicioInfo,
    },
    inserir_inicio: {
      hook: inserirInicioHook,
      info: InserirInicioInfo,
    },
    buscar: {
      hook: buscarHook,
      info: BuscarInfo,
    },
    show: {
      hook: showHook,
      info: ShowInfo,
    },
    remover_elemento: {
      hook: removerElementoHook,
      info: RemoverElementoInfo,
    },
    inserir_apos: {
      hook: inserirAposHook,
      info: InserirAposInfo,
    },
    inserir_antes: {
      hook: inserirAntesHook,
      info: InserirAntesInfo,
    },
    tamanho_atual: {
      hook: tamanhoAtualHook,
      info: TamanhoAtualInfo,
    },
    esta_vazia: {
      hook: estaVaziaHook,
      info: EstaVaziaInfo,
    },
    ver_primeiro: {
      hook: verPrimeiroHook,
      info: VerPrimeiroInfo,
    },
    ver_ultimo: {
      hook: verUltimoHook,
      info: VerUltimoInfo,
    },
  };

  const currentFunction =
    functionConfigs[selectedFunction as keyof typeof functionConfigs];

  // Função para executar a operação atual
  const executeCurrentFunction = async () => {
    if (selectedFunction === "remover_fim") {
      await removerFimHook.removerFim();
    } else if (selectedFunction === "inserir_fim") {
      await inserirFimHook.inserirFim(inputValue);
    } else if (selectedFunction === "remover_inicio") {
      await removerInicioHook.removerInicio();
    } else if (selectedFunction === "inserir_inicio") {
      await inserirInicioHook.inserirInicio(inputValue);
    } else if (selectedFunction === "buscar") {
      await buscarHook.buscar(inputValue);
    } else if (selectedFunction === "show") {
      await showHook.show();
    } else if (selectedFunction === "remover_elemento") {
      await removerElementoHook.removerElemento(inputValue);
    } else if (selectedFunction === "inserir_apos") {
      await inserirAposHook.inserirApos(inputValue, inputValue2);
    } else if (selectedFunction === "inserir_antes") {
      await inserirAntesHook.inserirAntes(inputValue, inputValue2);
    } else if (selectedFunction === "tamanho_atual") {
      await tamanhoAtualHook.tamanhoAtual();
    } else if (selectedFunction === "esta_vazia") {
      await estaVaziaHook.estaVazia();
    } else if (selectedFunction === "ver_primeiro") {
      await verPrimeiroHook.verPrimeiro();
    } else if (selectedFunction === "ver_ultimo") {
      await verUltimoHook.verUltimo();
    }
  };

  // Verificar se a função atual precisa de input
  const needsInput =
    selectedFunction === "inserir_fim" ||
    selectedFunction === "inserir_inicio" ||
    selectedFunction === "buscar" ||
    selectedFunction === "remover_elemento";

  const needsTwoInputs =
    selectedFunction === "inserir_apos" || selectedFunction === "inserir_antes";

  useEffect(() => {
    const container = codeContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      // Só atualizar highlight baseado no scroll se não estivermos animando
      if (!isAnimating) {
        const scrollTop = container.scrollTop;
        for (const child of Array.from(container.children)) {
          const el = child as HTMLElement;
          if (el.offsetTop >= scrollTop) {
            const numSpan = el.querySelector("span")?.textContent;
            const num = numSpan ? parseInt(numSpan) : null;
            if (num !== null && num !== highlightedLine) {
              setHighlightedLine(num);
            }
            break;
          }
        }
      }
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [isAnimating, highlightedLine]);

  if (status === "loading") return null;

  const resetList = () => {
    if (isAnimating) return;
    setNodes([
      { value: "A", id: 1 },
      { value: "B", id: 2 },
      { value: "C", id: 3 },
    ]);
    setLogs([]);
    setHighlightedLine(null);
    setActiveNodeIndex(null);
    setAuxPointerIndex(null);
    setHighlightedNextPointerIndex(null);
  };
  const preCodeLines = [
    "class No:",
    "    def __init__(self, valor, proximo):",
    "        self.info = valor",
    "        self.prox = proximo",
    "",
    "class Ldse:",
    "    def __init__(self):",
    "        self.prim = self.ult = None",
    "        self.quant = 0",
    "",
    "    def inserir_inicio(self, valor):",
    "        if self.quant == 0:",
    "            self.prim = self.ult = No(valor, None)",
    "        else:",
    "            self.prim = No(valor, self.prim)",
    "        self.quant += 1",
    "",
    "    def inserir_fim(self, valor):",
    "        if self.quant == 0:",
    "            self.prim = self.ult = No(valor, None)",
    "        else:",
    "            self.ult.prox = self.ult = No(valor, None)",
    "        self.quant += 1",
    "",
    "    def remover_inicio(self):",
    "        if self.quant == 1:",
    "            self.prim = self.ult = None",
    "        else:",
    "            self.prim = self.prim.prox",
    "        self.quant -= 1",
    "",
    "    def remover_irmaos(self, valor):",
    "        if self.quant != 1 and self.quant != 0:",
    "            anterior_do_anterior = None",
    "            anterior = None",
    "            atual = self.prim",
    "            while atual != None and atual.info != valor:",
    "                anterior_do_anterior = anterior",
    "                anterior = atual",
    "                atual = atual.prox",
    "            if atual != None and atual.info == valor:",
    "                if anterior != None and anterior == self.prim:",
    "                    self.remover_inicio()",
    "            else:",
    "                if anterior_do_anterior != None:",
    "                    anterior_do_anterior.prox = atual",
    "                    anterior = None",
    "                    self.quant -= 1",
    "            if atual.prox != None and atual.prox == self.ult:",
    "                self.remover_fim()",
    "            else:",
    "                if atual.prox != None:",
    "                    proximo = atual.prox",
    "                    atual.prox = proximo.prox",
    "                    proximo = None",
    "                    self.quant -= 1",
    "",
    "    def inserir_apos(self, valor1, valor2):",
    "        aux = self.prim",
    "        while aux != None and aux.info != valor2:",
    "            aux = aux.prox",
    "        if aux != None:",
    "            if aux.prox == None:",
    "                self.inserir_fim(valor1)",
    "            else:",
    "                aux.prox = No(valor1, aux.prox)",
    "                self.quant += 1",
    "",
    "    def inserir_antes(self, valor1, valor2):",
    "        anterior = None",
    "        atual = self.prim",
    "        while atual != None and atual.info != valor2:",
    "            anterior = atual",
    "            atual = atual.prox",
    "        if atual != None:",
    "            if anterior == None:",
    "                self.inserir_inicio(valor1)",
    "            else:",
    "                anterior.prox = No(valor1, atual)",
    "                self.quant += 1",
    "",
    "    def remover_elemento(self, valor):",
    "        anterior = None",
    "        atual = self.prim",
    "        while atual != None and atual.info != valor:",
    "            anterior = atual",
    "            atual = atual.prox",
    "        if atual != None:",
    "            if atual == self.prim:",
    "                self.remover_inicio()",
    "            elif atual == self.ult:",
    "                self.remover_fim()",
    "            else:",
    "                anterior.prox = atual.prox",
    "                self.quant -= 1",
    "",
    "    def buscar(self, valor):",
    "        aux = self.prim",
    "        posicao = 0",
    "        while aux != None and aux.info != valor:",
    "            aux = aux.prox",
    "            posicao += 1",
    "        if aux != None and aux.info == valor:",
    "            print(posicao)",
    "        else:",
    "            print(None)",
    "",
    "    def show(self):",
    "        aux = self.prim",
    "        while aux != None:",
    '            print(aux.info, end = " ")',
    "            aux = aux.prox",
    '        print("\\n")',
    "",
    "    def tamanho_atual(self):",
    "        return self.quant",
    "",
    "    def esta_vazia(self):",
    "        return self.quant == 0",
    "",
    "    def ver_primeiro(self):",
    "        return self.prim.info",
    "",
    "    def ver_ultimo(self):",
    "        return self.ult.info",
    "",
    "    def remover_fim(self):",
    "        if self.quant == 1:",
    "            self.prim = self.ult = None",
    "        else:",
    "            aux = self.prim",
    "            while aux.prox != self.ult:",
    "                aux = aux.prox",
    "            self.ult = aux",
    "            self.ult.prox = None",
    "            self.quant -= 1",
    "",
  ];

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-semibold mb-4">
        {currentFunction.info.title}
      </h2>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">{currentFunction.info.description}</p>
        <div className="flex flex-wrap gap-3 items-center">
          <label className="font-semibold text-gray-700">
            Selecione a operação:
          </label>
          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
            disabled={isAnimating}
            className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-200 cursor-not-allowed text-gray-500"
                : "bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
            }`}
          >
            <option value="remover_fim">Remover Fim</option>
            <option value="inserir_fim">Inserir Fim</option>
            <option value="remover_inicio">Remover Início</option>
            <option value="inserir_inicio">Inserir Início</option>
            <option value="buscar">Buscar</option>
            <option value="show">Mostrar Lista</option>
            <option value="remover_elemento">Remover Elemento</option>
            <option value="inserir_apos">Inserir Após</option>
            <option value="inserir_antes">Inserir Antes</option>
            <option value="tamanho_atual">Tamanho Atual</option>
            <option value="esta_vazia">Está Vazia?</option>
            <option value="ver_primeiro">Ver Primeiro</option>
            <option value="ver_ultimo">Ver Último</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
        {/* Coluna Esquerda - Código e Log */}
        <div className="space-y-6 h-full">
          {/* Código */}
          <div className="bg-white rounded-lg shadow-lg border overflow-hidden h-full">
            <div className="bg-gray-800 text-white px-4 py-3">
              <h3 className="text-lg font-semibold">Código sendo executado:</h3>
            </div>
            <div className="p-4 h-full">
              {/* container com scroll e altura fixa */}
              <div
                className="bg-gray-50 p-4 rounded-lg font-mono text-sm leading-6 border max-h-[450px] overflow-y-auto custom-scrollbar"
                ref={codeContainerRef}
              >
                {/* preCodeLines com numeração */}
                {preCodeLines.map((line, idx) => {
                  const lineNumber = idx + 1;
                  return (
                    <div
                      key={"pre-" + idx}
                      className="flex"
                      data-line={lineNumber}
                    >
                      <span className="inline-block w-6 text-right text-gray-500">
                        {lineNumber}
                      </span>
                      {/* Preserva a indentação com non-breaking spaces */}
                      <span
                        className={`pl-2 transition-colors duration-300 rounded ${
                          highlightedLine === lineNumber
                            ? "bg-yellow-300 shadow-sm"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {line.replace(/\s/g, "\u00A0")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Visualização e Controles */}
        <div className="space-y-6">
          {" "}
          {/* Container da Visualização da Lista */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg border">
            {/* Indicador de Quantidade */}
            <div className="absolute -top-3 left-4 bg-blue-100 px-3 py-1 rounded-full font-bold text-sm text-blue-800 shadow-sm">
              quant: <span className="text-blue-600">{nodes.length}</span>
            </div>

            <div className="flex items-center py-10 justify-center space-x-1 min-h-[120px] overflow-x-hidden overflow-y-hidden list-container">
              {nodes.length === 0 ? (
                <div className="relative">
                  <div className="w-20 h-16 border-2 border-gray-400 bg-gray-100 flex items-center justify-center rounded font-bold text-gray-600 shadow-sm">
                    None
                  </div>
                  <div className="absolute -top-7 left-1 bg-red-100 px-2 py-1 rounded font-bold text-xs text-red-600">
                    prim
                  </div>
                  <div className="absolute -top-7 right-1 bg-green-100 px-2 py-1 rounded font-bold text-xs text-green-600">
                    ult
                  </div>
                </div>
              ) : (
                <>
                  {nodes.map((node, index) => (
                    <div key={node.id} className="flex items-center">
                      <div
                        className={`relative transition-all duration-300 ${
                          activeNodeIndex === index ? "scale-105" : ""
                        }`}
                      >
                        <div
                          className={`w-20 h-16 border-2 flex shadow-md transition-colors duration-300 ${
                            activeNodeIndex === index
                              ? "bg-yellow-200 border-yellow-500 shadow-yellow-300"
                              : "bg-white border-gray-800"
                          }`}
                        >
                          {/* Ponteiros */}
                          {index === 0 && (
                            <div className="absolute -top-7 -left-1 bg-red-100 px-2 py-1 rounded font-bold text-xs text-red-600 shadow-sm">
                              prim
                            </div>
                          )}
                          {index === nodes.length - 1 && (
                            <div className="absolute -top-7 -right-1 bg-green-100 px-2 py-1 rounded font-bold text-xs text-green-600 shadow-sm">
                              ult
                            </div>
                          )}
                          {auxPointerIndex === index && (
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-100 px-2 py-1 rounded font-bold text-xs text-blue-600 shadow-sm animate-pulse">
                              aux
                            </div>
                          )}

                          {/* Conteúdo do nó */}
                          <div className="w-1/2 h-full flex items-center justify-center font-bold text-lg text-gray-800">
                            {node.value}
                          </div>
                          <div className="w-1/2 h-full border-l-2 border-gray-800 flex items-center justify-center bg-gray-50">
                            {/* Área do ponteiro next */}
                          </div>
                        </div>
                      </div>

                      {/* Seta para o próximo nó */}
                      {index < nodes.length && (
                        <div className="flex items-center mx-1 relative">
                          <div
                            className={`w-13 h-1 right-0 top-[-2px] absolute ${
                              highlightedNextPointerIndex === index
                                ? "bg-blue-400 animate-pulse"
                                : "bg-gray-800"
                            }`}
                          ></div>
                          <div className="w-6 h-1 relative">
                            <div
                              className={`absolute right-[-8px] top-0 w-0 h-0 border-l-[12px] ${
                                highlightedNextPointerIndex === index
                                  ? "border-l-blue-400 animate-pulse"
                                  : "border-l-gray-800"
                              } border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent transform -translate-y-1/2`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Nó None final */}
                  <div className="w-16 h-16 border-2 border-gray-400 bg-gray-100 flex items-center justify-center font-bold text-gray-600 shadow-sm">
                    None
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Input para valor (quando necessário) */}
          {needsInput && (
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <label className="font-semibold text-gray-700">Valor:</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isAnimating}
                maxLength={3}
                className={`px-3 py-1 border rounded font-mono text-center w-16 ${
                  isAnimating
                    ? "bg-gray-200 cursor-not-allowed text-gray-500"
                    : "bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                }`}
              />
            </div>
          )}
          {/* Inputs para funções que precisam de dois valores */}
          {needsTwoInputs && (
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">
                  {selectedFunction === "inserir_apos"
                    ? "Inserir:"
                    : "Novo valor:"}
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isAnimating}
                  maxLength={3}
                  className={`px-3 py-1 border rounded font-mono text-center w-16 ${
                    isAnimating
                      ? "bg-gray-200 cursor-not-allowed text-gray-500"
                      : "bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">
                  {selectedFunction === "inserir_apos" ? "Após:" : "Antes de:"}
                </label>
                <input
                  type="text"
                  value={inputValue2}
                  onChange={(e) => setInputValue2(e.target.value)}
                  disabled={isAnimating}
                  maxLength={3}
                  className={`px-3 py-1 border rounded font-mono text-center w-16 ${
                    isAnimating
                      ? "bg-gray-200 cursor-not-allowed text-gray-500"
                      : "bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  }`}
                />
              </div>
            </div>
          )}
          {/* Botões de Controle */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={executeCurrentFunction}
              disabled={
                isAnimating ||
                ((selectedFunction === "remover_fim" ||
                  selectedFunction === "remover_inicio" ||
                  selectedFunction === "buscar" ||
                  selectedFunction === "show" ||
                  selectedFunction === "remover_elemento" ||
                  selectedFunction === "inserir_apos" ||
                  selectedFunction === "inserir_antes" ||
                  selectedFunction === "ver_primeiro" ||
                  selectedFunction === "ver_ultimo") &&
                  nodes.length === 0)
              }
              className={`px-5 py-2 font-semibold rounded transition-all duration-200 ${
                isAnimating ||
                ((selectedFunction === "remover_fim" ||
                  selectedFunction === "remover_inicio" ||
                  selectedFunction === "buscar" ||
                  selectedFunction === "show" ||
                  selectedFunction === "remover_elemento" ||
                  selectedFunction === "inserir_apos" ||
                  selectedFunction === "inserir_antes" ||
                  selectedFunction === "ver_primeiro" ||
                  selectedFunction === "ver_ultimo") &&
                  nodes.length === 0)
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : currentFunction.info.buttonColor + " text-white"
              }`}
            >
              {currentFunction.info.buttonText}
            </button>

            <button
              onClick={resetList}
              disabled={isAnimating}
              className={`px-5 py-2 font-semibold rounded transition-all duration-200 ${
                isAnimating
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Resetar
            </button>
          </div>
          {/* Log */}
          <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-3">
              <h3 className="text-lg font-semibold">Log de execução:</h3>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 p-4 rounded-lg h-48 overflow-y-auto text-sm border custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-gray-500 italic">
                    Nenhuma execução ainda...
                  </div>
                ) : (
                  logs.map((logEntry, index) => (
                    <div
                      key={index}
                      className="py-1 border-b border-gray-200 last:border-b-0"
                    >
                      {logEntry}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
