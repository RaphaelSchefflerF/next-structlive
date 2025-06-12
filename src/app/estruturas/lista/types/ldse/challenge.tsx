import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    BrainIcon,
    CheckCircle,
    CopyIcon,
    InfoIcon,
    Loader2Icon,
    PlayIcon,
    TerminalIcon,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import MonacoEditor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { analyzeCode } from './ai_analysis';

interface ExerciseProps {
    title: string;

    description: string;
    validation: (input: string) => boolean;
}

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

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="col-span-2 p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <PlayIcon className="h-4 w-4" />
                            <span className="font-medium">
                                Desafio Prático: Implementar Lista Simplesmente
                                Encadeada
                            </span>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-medium text-blue-900 mb-2">
                                🎯 Objetivo
                            </h4>
                            <p className="text-sm text-blue-800">
                                Implemente uma Lista Dinâmica Simplesmente
                                Encadeada em Python com as operações básicas:
                                inserir no início, inserir no fim, remover do
                                início, remover do fim, e exibir a lista.
                            </p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 className="font-medium text-amber-900 mb-2">
                                📋 Requisitos
                            </h4>
                            <ul className="text-sm text-amber-800 space-y-1">
                                <li>
                                    • Criar uma classe{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        No
                                    </code>{' '}
                                    com atributos{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        dado
                                    </code>{' '}
                                    e{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        proximo
                                    </code>
                                </li>
                                <li>
                                    • Criar uma classe{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        ListaSimplesmenteEncadeada
                                    </code>{' '}
                                    com ponteiros{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        primeiro
                                    </code>{' '}
                                    e{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        ultimo
                                    </code>
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
                                    <code className="bg-amber-100 px-1 rounded">
                                        remover_fim()
                                    </code>
                                </li>
                                <li>
                                    • Implementar método{' '}
                                    <code className="bg-amber-100 px-1 rounded">
                                        exibir()
                                    </code>
                                </li>
                                <li>
                                    • Tratar casos especiais (lista vazia, um
                                    único elemento)
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TerminalIcon className="h-4 w-4" />
                                <span className="font-medium">
                                    Editor de Código - Implemente sua Lista
                                    Dinâmica Simplesmente Encadeada
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copy_code}
                                >
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
                                    <span className="font-medium">
                                        Análise da IA
                                    </span>
                                </div>
                                <div className="text-sm whitespace-pre-wrap">
                                    <Markdown>{ai_analysis}</Markdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
