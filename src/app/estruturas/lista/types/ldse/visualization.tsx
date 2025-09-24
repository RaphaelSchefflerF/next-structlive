"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Node {
  value: string;
  id: number;
}

export default function LdseVisualization() {
  const { status } = useSession();
  const router = useRouter();
  const codeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const highlightCodeLine = (lineNumber: number) => {
    setHighlightedLine(lineNumber);
  };

  const log = (message: string) => {
    setLogs((prev) => [...prev, `> ${message}`]);
  };

  useEffect(() => {
    const container = codeContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      for (const child of Array.from(container.children)) {
        const el = child as HTMLElement;
        if (el.offsetTop >= scrollTop) {
          const numSpan = el.querySelector("span")?.textContent;
          const num = numSpan ? parseInt(numSpan) : null;
          if (num !== null) highlightCodeLine(num);
          break;
        }
      }
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [highlightCodeLine]);

  if (status === "loading") return null;

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

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
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
      setNodes((prev) => prev.slice(0, -1));
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Removendo o último nó de uma lista encadeada
      </h1>

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
                    <div key={"pre-" + idx} className="flex">
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
          {/* Botões de Controle */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={removerFim}
              disabled={isAnimating || nodes.length === 0}
              className={`px-5 py-2 font-semibold rounded transition-all duration-200 ${
                isAnimating || nodes.length === 0
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Remover nó final
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
