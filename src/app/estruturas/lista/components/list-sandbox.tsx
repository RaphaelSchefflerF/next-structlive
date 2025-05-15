'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  BookIcon,
  BrainIcon,
  CopyIcon,
  InfoIcon,
  Loader2Icon,
  PlayIcon,
  TerminalIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { toast } from 'sonner';
import { examples } from './list-sandbox-examples'; // Importa os exemplos de código

export default function ListSandbox() {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [list_state, setList_state] = useState<unknown[]>([]);
  const [selected_example, setSelected_example] = useState<string>('');
  const [ai_analysis, setAi_analysis] = useState<string>('');
  const [is_analyzing, setIs_analyzing] = useState<boolean>(false);

  // Atualiza o código quando o exemplo é alterado
  useEffect(() => {
    if (examples[selected_example as keyof typeof examples]) {
      setCode(examples[selected_example as keyof typeof examples]);
    }
  }, [selected_example]);

  // Redireciona console.log para nossa interface
  const create_custom_console = () => {
    const original_console_log = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      const message = args.join(' ');
      logs.push(message);
      original_console_log(...args);
    };

    return {
      logs,
      restore: () => {
        console.log = original_console_log;
      },
    };
  };

  // Executa o código digitado e captura o resultado
  const run_code = () => {
    // Limpa a saída anterior
    setOutput([]);
    setList_state([]);

    if (!code.trim()) {
      toast.error('Digite algum código antes de executar!');
      return;
    }

    try {
      // Cria um console customizado para capturar logs
      const custom_console = create_custom_console();

      // Executa o código do usuário
      const result = new Function(code)();

      // Restaura o console original
      custom_console.restore();

      // Atualiza a saída
      setOutput(custom_console.logs);

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
      setAi_analysis(data.analysis);
      toast.success('Análise concluída!');
    } catch (error) {
      toast.error('Erro ao analisar o código');
      console.error(error);
    } finally {
      setIs_analyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sandbox de Listas</h2>
        <p className="text-muted-foreground">
          Experimente implementar e testar diferentes operações de lista neste
          ambiente de código interativo.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <BookIcon className="h-4 w-4" />
        <span className="font-medium">Exemplos:</span>
        <Select value={selected_example} onValueChange={setSelected_example}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um exemplo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="básico">Implementação Básica</SelectItem>
            <SelectItem value="encadeada">Lista Encadeada</SelectItem>
            <SelectItem value="duplamente">
              Lista Duplamente Encadeada
            </SelectItem>
            <SelectItem value="circular">Lista Circular</SelectItem>
            <SelectItem value="mesclagem">Mesclagem de Listas</SelectItem>
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
              <Button onClick={run_code}>
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
              <span className="font-medium">Visualização da Lista</span>
            </div>
            <div className="border rounded-md p-3 min-h-[150px] max-h-[300px] overflow-y-auto bg-muted/40">
              {list_state.length > 0 ? (
                <div className="flex flex-col space-y-2">
                  {list_state.map((item, index) => (
                    <Card
                      key={index}
                      className="p-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {index}
                        </span>
                        <span className="font-mono">
                          {JSON.stringify(item)}
                        </span>
                      </div>
                      {index < list_state.length - 1 && (
                        <div className="text-muted-foreground">→</div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  A visualização da lista aparecerá aqui após executar o código.
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
            • Certifique-se de que sua lista seja uma classe chamada
            &quot;LinkedList&quot; com uma propriedade &quot;items&quot; para
            visualização.
          </li>
          <li>
            • Experimente modificar os exemplos para entender como as listas
            funcionam.
          </li>
          <li>
            • Para operações de lista, implemente: add, insert, remove, get,
            indexOf.
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
