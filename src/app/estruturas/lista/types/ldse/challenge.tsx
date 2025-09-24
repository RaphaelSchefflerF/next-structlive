import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BrainIcon,
  CopyIcon,
  Loader2Icon,
  PlayIcon,
  TerminalIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import MonacoEditor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { analyzeCode } from './ai_analysis';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function LdseActivity() {
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

  // Analisa o código usando IA com contexto RAG
  const analyze_code_with_ai = async () => {
    if (!code.trim()) {
      toast.error('Digite algum código antes de analisar!');
      return;
    }

    try {
      setIs_analyzing(true);
      setAi_analysis(''); // Limpa análise anterior
      const analysis = await analyzeCode(code);
      if (!analysis) {
        toast.error('Não foi possível obter a análise da IA.');
        return;
      }
      setAi_analysis(analysis);
      toast.success('Análise concluída! Veja o feedback abaixo.');
    } catch (error) {
      toast.error('Erro ao analisar o código. Tente novamente.');
      console.error('Erro na análise:', error);
    } finally {
      setIs_analyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <PlayIcon className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-medium">
              Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-blue-100 border-blue-300 text-blue-800"
              >
                Objetivo
              </Badge>
            </h4>
            <p className="text-sm text-blue-800">
              Implemente uma Lista Dinâmica Simplesmente Encadeada em Python com
              as operações básicas: inserir no início, inserir no fim, remover
              do início, remover do fim, e exibir a lista.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-amber-100 border-amber-300 text-amber-800"
              >
                Requisitos
              </Badge>
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>
                • Criar uma classe{' '}
                <code className="bg-amber-100 px-1 rounded">No</code> com
                atributos{' '}
                <code className="bg-amber-100 px-1 rounded">dado</code> e{' '}
                <code className="bg-amber-100 px-1 rounded">proximo</code>
              </li>
              <li>
                • Criar uma classe{' '}
                <code className="bg-amber-100 px-1 rounded">
                  ListaDinamicaSimplesmenteEncadeada
                </code>{' '}
                com ponteiros{' '}
                <code className="bg-amber-100 px-1 rounded">primeiro</code> e{' '}
                <code className="bg-amber-100 px-1 rounded">ultimo</code>
              </li>
              <li>
                • Implementar método{' '}
                <code className="bg-amber-100 px-1 rounded">
                  inserir_inicio(dado)
                </code>
              </li>
              <li>
                • Implementar método{' '}
                <code className="bg-amber-100 px-1 rounded">
                  inserir_fim(dado)
                </code>
              </li>
              <li>
                • Implementar método{' '}
                <code className="bg-amber-100 px-1 rounded">
                  remover_inicio()
                </code>
              </li>
              <li>
                • Implementar método{' '}
                <code className="bg-amber-100 px-1 rounded">remover_fim()</code>
              </li>
              <li>
                • Implementar método{' '}
                <code className="bg-amber-100 px-1 rounded">exibir()</code>
              </li>
              <li>• Tratar casos especiais (lista vazia, um único elemento)</li>
            </ul>
          </div>

          <Card className="border shadow-sm">
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-4 w-4 text-slate-600" />
                  <span className="font-medium text-sm">
                    Editor de Código - Implemente sua Lista Dinâmica
                    Simplesmente Encadeada
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={copy_code}>
                          <CopyIcon className="h-3.5 w-3.5 mr-1" />
                          Copiar
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copiar código para área de transferência</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Analisar código com Gemini AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative min-h-[400px] border-t">
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
            </CardContent>
          </Card>

          {ai_analysis && (
            <Card className="border shadow-sm">
              <CardHeader className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <BrainIcon className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium text-sm">
                    Análise da IA (Gemini AI)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4 border-t">
                  <div className="text-sm whitespace-pre-wrap p-2 prose prose-sm max-w-none">
                    <Markdown>{ai_analysis}</Markdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
