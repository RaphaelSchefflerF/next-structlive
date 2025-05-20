'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  PlayIcon,
  CopyIcon,
  InfoIcon,
  BookIcon,
  TerminalIcon,
  BrainIcon,
  Loader2Icon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { examples } from './stack-sandbox-examples'; // Importa os exemplos de código
import Markdown from 'react-markdown';

export default function StackSandbox() {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [stackState, setStackState] = useState<unknown[]>([]);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [ai_analysis, set_ai_analysis] = useState<string>('');
  const [is_analyzing, set_is_analyzing] = useState<boolean>(false);

  // Atualiza o código quando o exemplo é alterado
  useEffect(() => {
    if (examples[selectedExample as keyof typeof examples]) {
      setCode(examples[selectedExample as keyof typeof examples]);
    }
  }, [selectedExample]);

  // Redireciona console.log para nossa interface
  const createCustomConsole = () => {
    const originalConsoleLog = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      const message = args.join(' ');
      logs.push(message);
      originalConsoleLog(...args);
    };

    return {
      logs,
      restore: () => {
        console.log = originalConsoleLog;
      },
    };
  };

  // Executa o código digitado e captura o resultado
  const runCode = () => {
    // Limpa a saída anterior
    setOutput([]);
    setStackState([]);

    if (!code.trim()) {
      toast.error('Digite algum código antes de executar!');
      return;
    }

    try {
      // Cria um console customizado para capturar logs
      const customConsole = createCustomConsole();

      // Executa o código do usuário
      const result = new Function(code)();

      // Restaura o console original
      customConsole.restore();

      // Atualiza a saída
      setOutput(customConsole.logs);

      toast.success('Código executado com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput([`Erro: ${error.message}`]);
      } else {
        setOutput(['Erro desconhecido']);
      }
      toast.error('Erro ao executar o código');
    }
  };

  // Copia o código para a área de transferência
  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success('Código copiado!'))
      .catch(() => toast.error('Não foi possível copiar o código'));
  };

  // Analisa o código usando IA (Gemini)
  const analyzeCodeWithAI = async () => {
    if (!code.trim()) {
      toast.error('Digite algum código antes de analisar!');
      return;
    }

    try {
      set_is_analyzing(true);
      set_ai_analysis('');

      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Erro ao analisar o código');
      }

      const data = await response.json();
      set_ai_analysis(data.analysis);
      toast.success('Análise concluída!');
    } catch (error) {
      toast.error('Erro ao analisar o código');
      console.error(error);
    } finally {
      set_is_analyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sandbox de Pilhas</h2>
        <p className="text-muted-foreground">
          Experimente implementar e testar diferentes operações de pilha neste
          ambiente de código interativo.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <BookIcon className="h-4 w-4" />
        <span className="font-medium">Exemplos:</span>
        <Select value={selectedExample} onValueChange={setSelectedExample}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um exemplo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="básico">Implementação Básica</SelectItem>
            <SelectItem value="conversãoBinária">
              Conversão para Binário
            </SelectItem>
            <SelectItem value="inversãoString">Inversão de String</SelectItem>
            <SelectItem value="validaçãoParênteses">
              Validação de Parênteses
            </SelectItem>
            <SelectItem value="undoRedo">Undo/Redo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-4 w-4" />
              <span className="font-medium">Editor de Código</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyCode}>
                <CopyIcon className="h-3.5 w-3.5 mr-1" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={analyzeCodeWithAI}
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
              <Button onClick={runCode}>
                <PlayIcon className="h-3.5 w-3.5 mr-1" />
                Executar
              </Button>
            </div>
          </div>

          <div className="relative min-h-[400px] border rounded-md">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-muted resize-none rounded-md"
              placeholder="// Digite seu código aqui..."
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

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="h-4 w-4" />
              <span className="font-medium">Console</span>
            </div>
            <div className="h-[200px] overflow-y-auto border rounded-md p-3 font-mono text-sm bg-muted/40">
              {output.length > 0 ? (
                output.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      'whitespace-pre-wrap mb-1',
                      line.startsWith('Erro:') ? 'text-red-500' : '',
                    )}
                  >
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm">
                  A saída do console aparecerá aqui após executar o código.
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="h-4 w-4" />
              <span className="font-medium">Visualização da Pilha</span>
            </div>
            <div className="border rounded-md p-3 min-h-[150px] max-h-[300px] overflow-y-auto bg-muted/40">
              {stackState.length > 0 ? (
                <div className="flex flex-col-reverse space-y-reverse space-y-2">
                  {stackState.map((item, index) => (
                    <Card
                      key={index}
                      className={cn(
                        'p-2 text-center',
                        index === stackState.length - 1
                          ? 'border-primary bg-primary/10'
                          : '',
                      )}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {index === stackState.length - 1
                            ? 'Topo'
                            : `Índice ${index}`}
                        </span>
                        <span className="font-mono">
                          {JSON.stringify(item)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  A visualização da pilha aparecerá aqui após executar o código.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg border border-muted-foreground/20">
        <h3 className="font-medium mb-2">Dicas:</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            • Utilize{' '}
            <code className="bg-muted px-1 py-0.5 rounded">console.log()</code>{' '}
            para mostrar resultados no console.
          </li>
          <li>
            • Certifique-se de que sua pilha seja uma classe chamada
            &quot;Stack&quot; com uma propriedade &quot;items&quot; para
            visualização.
          </li>
          <li>
            • Experimente modificar os exemplos para entender como as pilhas
            funcionam.
          </li>
          <li>
            • Para operações de pilha, implemente: push, pop, peek, isEmpty,
            size.
          </li>
          <li>
            • Para analisar seu código com IA, clique no botão &quot;Analisar
            com IA&quot; e receba feedback sobre sua implementação.
          </li>
        </ul>
      </div>
    </div>
  );
}
