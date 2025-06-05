// QuestaoPage.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainIcon, CheckCircle, CopyIcon, InfoIcon, Loader2Icon, PlayIcon, TerminalIcon, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MonacoEditor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import {analyzeCode} from './ai_analysis'

interface ExerciseProps {
  title: string;
  description: string;
  validation: (input: string) => boolean;
}

export default function LdseActivity() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [code, setCode] = useState<string>('');
  const [ai_analysis, setAi_analysis] = useState<string>('');
  const [is_analyzing, setIs_analyzing] = useState<boolean>(false);

  // Copia o código para a área de transferência
  const copy_code = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success('Código copiado!'))
      .catch(() => toast.error('Não foi possível copiar o código'));
  };

  // Analisa o código usando IA (Gemini)
  const analyze_code_with_ai = async () => {
    if (!code.trim()) {
      toast.error('Digite algum código antes de analisar!');
      return;
    }

    try {
      setIs_analyzing(true);
      setAi_analysis('');

      const analysis = await analyzeCode(code);
      if (!analysis) {
        toast.error('Não foi possível obter a análise da IA.');
        return;
      }
      setAi_analysis(analysis);
    } finally {
      setIs_analyzing(false);
    }
  };
  const exercises: ExerciseProps[] = [
    {
      title: "Encontrar o elemento central",
      description:
        "Qual é o algoritmo mais eficiente para encontrar o elemento central de uma lista encadeada em uma única passagem?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("dois ponteiros") ||
          (normalizedInput.includes("fast") &&
            normalizedInput.includes("slow")) ||
          (normalizedInput.includes("rápido") &&
            normalizedInput.includes("lento"))
        );
      },
    },
    {
      title: "Detectar ciclo",
      description:
        "Qual algoritmo podemos usar para detectar um ciclo em uma lista encadeada?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("floyd") ||
          normalizedInput.includes("tartaruga e lebre") ||
          normalizedInput.includes("dois ponteiros")
        );
      },
    },
    {
      title: "Inverter uma lista",
      description:
        "Escreva os passos para inverter uma lista simplesmente encadeada de forma iterativa.",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("prev") &&
          normalizedInput.includes("current") &&
          normalizedInput.includes("next")
        );
      },
    },
    {
      title: "Operação mais eficiente",
      description:
        "Qual tipo de lista é mais eficiente para inserções e remoções frequentes no meio da estrutura?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("duplamente") ||
          normalizedInput.includes("doubly")
        );
      },
    },
  ];

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function QuestaoPage() {
  const { data: session, status } = useSession();
  const [atividades, setAtividades] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [alternativasSelecionadas, setAlternativasSelecionadas] = useState<{
    [key: number]: string;
  }>({});
  const [respostasCorretas, setRespostasCorretas] = useState<{
    [key: number]: string;
  }>({});
  const [respostasEnviadas, setRespostasEnviadas] = useState<{
    [key: number]: boolean;
  }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [mostrarExplicacao, setMostrarExplicacao] = useState<{
    [key: number]: boolean;
  }>({});
  const [permitirExplicacao, setPermitirExplicacao] = useState<{
    [key: number]: boolean;
  }>({});
  const explicacaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAtividades = async () => {
      const res = await fetch("/api/atividades");
      const data = await res.json();
      setAtividades(data);
    };
    fetchAtividades();
  }, []);

  const atividade = atividades[index];
  const alternativa = alternativasSelecionadas[index];
  const respostaCorreta = respostasCorretas[index];

  const handleSubmit = async () => {
    if (!alternativa || !session?.user?.id || !atividade?.id) return;

    setRespostasCorretas((prev) => ({
      ...prev,
      [index]: atividade.alternativas.find((a: any) => a.correta)?.texto || "",
    }));

    setRespostasEnviadas((prev) => ({ ...prev, [index]: true }));
    setPermitirExplicacao((prev) => ({ ...prev, [index]: true }));

    await fetch("/api/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        atividadeId: atividade.id,
        usuarioId: session.user.id,
        alternativaMarcada: alternativa,
      }),
    });
  };

  const handleChangeAlternativa = (value: string) => {
    setAlternativasSelecionadas((prev) => ({ ...prev, [index]: value }));
    setRespostasEnviadas((prev) => ({ ...prev, [index]: false }));
    setRespostasCorretas((prev) => {
      const novo = { ...prev };
      delete novo[index];
      return novo;
    });
    setFeedback((prev) => ({ ...prev, [index]: "" }));
    setMostrarExplicacao((prev) => ({ ...prev, [index]: false }));
    setPermitirExplicacao((prev) => ({ ...prev, [index]: false }));
  };

  function removerMarkdownBasico(texto: string): string {
    return texto.replace(/\*{1,2}/g, "");
  }

  const handleGerarExplicacao = async () => {
    if (!session?.user?.id || !atividade?.id || !permitirExplicacao[index])
      return;

    setMostrarExplicacao((prev) => ({ ...prev, [index]: true }));

    let tentativas = 0;
    const maxTentativas = 10;
    const intervalo = 2000; // 2 segundos
    let ultimoTexto = feedback[index] || "";

    const buscarFeedback = async () => {
      const res = await fetch(`/api/respostas/${atividade.id}`);
      if (!res.ok) return;

      const data = await res.json();
      const textoBruto = data.feedback?.trim() || "";
      const textoLimpo = removerMarkdownBasico(textoBruto);

      if (textoLimpo && textoLimpo !== ultimoTexto) {
        setFeedback((prev) => ({ ...prev, [index]: textoLimpo }));
      } else if (tentativas < maxTentativas) {
        tentativas++;
        setTimeout(buscarFeedback, intervalo);
      } else {
        // Último fallback: ainda não mudou
        setFeedback((prev) => ({
          ...prev,
          [index]: textoLimpo || "Feedback não disponível.",
        }));
      }
    };

    buscarFeedback();
  };

  const getDificuldadeClasses = (dificuldade: string) => {
    switch (dificuldade.toLowerCase()) {
      case "fácil":
      case "facil":
        return "bg-green-100 text-green-800";
      case "médio":
      case "medio":
        return "bg-yellow-100 text-yellow-800";
      case "difícil":
      case "dificil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const progressoRespondido =
    Object.values(respostasEnviadas).filter(Boolean).length;
  const progressoPercentual = Math.round(
    (progressoRespondido / atividades.length) * 100
  );

  if (status === "loading") return <p>Carregando sessão...</p>;
  if (!session) return <p>Você precisa estar logado para responder.</p>;
  if (!atividade) return <p>Carregando atividade...</p>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-[minmax(0,600px)_1fr] gap-6'>
      {/* Questão */}
      <div>
        <Card className='border-none shadow-none p-0'>
          <div className='max-w-[600px]'>
            <div className='mb-1 text-sm italic font-semibold text-blue-600'>
              Questão {index + 1} de {atividades.length}
            </div>
            {atividades.length > 0 && (
              <div className='mb-6'>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-blue-600 h-2.5 rounded-full transition-all duration-500'
                    style={{ width: `${progressoPercentual}%` }}
                  />
                </div>
                <Button
                  onClick={() => handleSubmit(index)}
                  className="w-full"
                  disabled={
                    !answers[index] || (submitted[index] && results[index])
                  }
                >
                  {submitted[index]
                    ? results[index]
                      ? "Concluído"
                      : "Tentar novamente"
                    : "Verificar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="col-span-2 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PlayIcon className="h-4 w-4" />
              <span className="font-medium">Desafio Prático: Implementar Lista Simplesmente Encadeada</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">🎯 Objetivo</h4>
              <p className="text-sm text-blue-800">
                Implemente uma Lista Dinâmica Simplesmente Encadeada em Python com as operações básicas:
                inserir no início, inserir no fim, remover do início, remover do fim, e exibir a lista.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 mb-2">📋 Requisitos</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Criar uma classe <code className="bg-amber-100 px-1 rounded">No</code> com atributos <code className="bg-amber-100 px-1 rounded">dado</code> e <code className="bg-amber-100 px-1 rounded">proximo</code></li>
                <li>• Criar uma classe <code className="bg-amber-100 px-1 rounded">ListaSimplesmenteEncadeada</code> com ponteiros <code className="bg-amber-100 px-1 rounded">primeiro</code> e <code className="bg-amber-100 px-1 rounded">ultimo</code></li>
                <li>• Implementar método <code className="bg-amber-100 px-1 rounded">inserir_inicio(dado)</code></li>
                <li>• Implementar método <code className="bg-amber-100 px-1 rounded">inserir_fim(dado)</code></li>
                <li>• Implementar método <code className="bg-amber-100 px-1 rounded">remover_inicio()</code></li>
                <li>• Implementar método <code className="bg-amber-100 px-1 rounded">remover_fim()</code></li>
                <li>• Implementar método <code className="bg-amber-100 px-1 rounded">exibir()</code></li>
                <li>• Tratar casos especiais (lista vazia, um único elemento)</li>
              </ul>
            </div>
          </div>


        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-4 w-4" />
              <span className="font-medium">Editor de Código - Implemente sua Lista Dinâmica Simplesmente Encadeada</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copy_code}>
                <CopyIcon className="h-3.5 w-3.5 mr-1" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={analyze_code_with_ai}
                disabled={is_analyzing}
              >
                {is_analyzing ? (
                  <>
                    <Loader2Icon className="h-3.5 w-3.5 mr-1 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <BrainIcon className="h-3.5 w-3.5 mr-1" />
                    Analisar com IA
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="relative min-h-[400px] border rounded-md">
            <MonacoEditor
              height="600px"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value ?? '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                fontFamily: 'Fira Mono, monospace',
                automaticLayout: true,
                lineNumbers: 'on',
                tabSize: 2,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>

          {ai_analysis && (
            <div className="border rounded-md p-4 bg-muted/20 space-y-2">
              <div className="flex items-center gap-2">
                <BrainIcon className="h-4 w-4" />
                <span className="font-medium">Análise da IA</span>
              </div>
              <div className="text-sm whitespace-pre-wrap">
                <Markdown>{ai_analysis}</Markdown>
              </div>
            </div>
          )}


      </div>
        </div>
      </div>
      <div className="p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium mb-2">💡 Dicas de Implementação:</h4>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>
            <strong>Inserir no início:</strong> Crie um novo nó, faça ele apontar para o primeiro atual, atualize primeiro para o novo nó
          </li>
          <li>
            <strong>Inserir no fim:</strong> Se lista vazia, primeiro = último = novo nó. Senão, último.próximo = novo nó, último = novo nó
          </li>
          <li>
            <strong>Remover do início:</strong> Atualize primeiro para primeiro.próximo. Se ficou vazio, último = None também
          </li>
          <li>
            <strong>Remover do fim:</strong> Percorra até encontrar o penúltimo nó, faça ele apontar para None
          </li>
          <li>
            <strong>Exibir:</strong> Use um laço while para percorrer desde o primeiro até None
          </li>
          <li>
            <strong>Casos especiais:</strong> Sempre verifique se a lista está vazia antes de remover
          </li>
        </ul>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className='text-lg font-medium text-stone-700'>
              {atividade.titulo}
            </CardTitle>
          </CardHeader>

          <div className='flex flex-wrap gap-2 mt-1 mb-6 max-w-[600px]'>
            {atividade.estrutura && (
              <span className='text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                {atividade.estrutura}
              </span>
            )}
            {atividade.dificuldade && (
              <span
                className={`text-xs font-bold px-2 py-1 ${getDificuldadeClasses(
                  atividade.dificuldade
                )} rounded`}
              >
                {atividade.dificuldade}
              </span>
            )}
          </div>

          <CardContent>
            <div className='max-w-[600px]'>
              <p className='mb-4 text-md text-stone-700'>
                {atividade.descricao}
              </p>
            </div>
            <div className='space-y-3 mb-4'>
              {atividade.alternativas?.map((alt: any, idx: number) => {
                let style =
                  "max-w-[600px] bg-muted hover:bg-muted/70 border border-border text-sm px-4 py-3 rounded-xl flex items-center justify-start gap-3 transition-all duration-150";
                let textClass = "text-stone-700 font-normal";
                let badgeClass = "bg-background border border-border";

                const isSelecionada = alt.texto === alternativa;
                const isRespostaCerta = alt.texto === respostaCorreta;
                const isRespostaUsuario =
                  alt.texto === alternativasSelecionadas[index];

                if (respostasEnviadas[index]) {
                  if (isRespostaCerta && isRespostaUsuario) {
                    style += " border-green-500";
                    textClass = "text-green-700 font-medium";
                    badgeClass = "bg-green-100 border-green-500 text-green-700";
                  } else if (isRespostaCerta) {
                    style += " border-green-500";
                    textClass = "text-green-700 font-medium";
                    badgeClass = "bg-green-100 border-green-500 text-green-700";
                  } else if (isRespostaUsuario) {
                    style += " border-red-500";
                    textClass = "text-red-700 font-medium";
                    badgeClass = "bg-red-100 border-red-500 text-red-700";
                  }
                } else if (isSelecionada) {
                  style += " border-blue-500";
                  textClass = "text-blue-700 font-medium";
                  badgeClass = "bg-blue-100 border-blue-500 text-blue-700";
                }

                return (
                  <label
                    key={idx}
                    onClick={() => handleChangeAlternativa(alt.texto)}
                    className={`${style} cursor-pointer`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center font-bold rounded-full ${badgeClass}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`truncate ${textClass}`}>{alt.texto}</span>
                  </label>
                );
              })}
            </div>
            <div className='flex justify-between items-center max-w-[600px]'>
              <Button
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                disabled={index === 0}
                className='cursor-pointer'
              >
                Anterior
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!alternativa || respostasEnviadas[index]}
                className='w-1/3 cursor-pointer'
              >
                Enviar Resposta
              </Button>
              <Button
                onClick={() =>
                  setIndex((prev) => Math.min(atividades.length - 1, prev + 1))
                }
                disabled={index === atividades.length - 1}
                className='cursor-pointer'
              >
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium mb-2">Dicas Gerais:</h4>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>
            Para encontrar o elemento central, pense em ponteiros que se movem
            em velocidades diferentes
          </li>
          <li>
            Para detectar ciclos, considere o algoritmo de Floyd (Tartaruga e
            Lebre)
          </li>
          <li>
            Para inverter uma lista, você precisa rastrear referências anterior,
            atual e próxima
          </li>
          <li>
            Para operações no meio de uma lista, considere o custo de encontrar
            e atualizar referências
          </li>
        </ul>
      {/* Feedback */}
      <div className='flex flex-col gap-6 p-4 h-full'>
        <div className='flex gap-4 items-start'>
          <div className='flex flex-col gap-4 items-start'>
            <img
              src='https://cdn.dribbble.com/users/42048/screenshots/8350927/robotintro_dribble.gif'
              alt='Assistente IA'
              className='w-90 h-100% rounded-lg shadow-md'
            />
            <Button
              onClick={handleGerarExplicacao}
              className='w-[160px] cursor-pointer'
              disabled={!permitirExplicacao[index]}
            >
              Gerar Explicação
            </Button>
          </div>
          <div className='flex-1'>
            <div className='bg-white rounded-lg shadow-lg border overflow-hidden'>
              <div className='bg-gray-800 text-white px-4 py-3'>
                <h3 className='text-sm font-semibold'>Struct AI:</h3>
              </div>
              <div className='p-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                  Clique no botão ao lado para que nossa IA te explique por que
                  sua resposta está certa ou errada, com base no conteúdo
                  estudado.
                </p>
                {mostrarExplicacao[index] && (
                  <div
                    ref={explicacaoRef}
                    className='bg-gray-50 p-4 rounded-lg h-[330px] overflow-y-auto text-[0.9rem] border custom-scrollbar whitespace-pre-wrap'
                  >
                    {feedback[index]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
