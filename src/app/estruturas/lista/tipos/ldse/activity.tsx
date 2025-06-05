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
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = (index: number) => {
    const answer = answers[index] || "";
    const result = exercises[index].validation(answer);

    setResults((prev) => ({
      ...prev,
      [index]: result,
    }));

    setSubmitted((prev) => ({
      ...prev,
      [index]: true,
    }));

    if (result) {
      toast.success("Resposta correta!");
    } else {
      toast.error("Tente novamente.");
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Exercícios Práticos</h3>
        <p className="text-sm text-muted-foreground">
          Responda às perguntas para testar seu conhecimento sobre listas
          encadeadas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exercises.map((exercise, index) => (
          <Card
            key={exercise.title}
            className={
              submitted[index]
                ? results[index]
                  ? "border-green-500/50"
                  : "border-red-500/50"
                : ""
            }
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{exercise.title}</CardTitle>
                {submitted[index] &&
                  (results[index] ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ))}
              </div>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`answer-${index}`}>Sua resposta</Label>
                  <Input
                    id={`answer-${index}`}
                    placeholder="Digite sua resposta..."
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={submitted[index] && results[index]}
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
      </div>
    </div>
  );
}
