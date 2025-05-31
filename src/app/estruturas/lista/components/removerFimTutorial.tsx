
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button';

export default function RemoverFimTutorial() {
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState('Clique em "Próximo passo" para começar.');
    const [highlightLine, setHighlightLine] = useState<number | null>(null);
    const [nodes, setNodes] = useState(['A', 'B', 'C', 'D', 'E']);
    const [highlight, setHighlight] = useState<number | null>(null);
    const [deadNode, setDeadNode] = useState<number | null>(null);

    const steps = [
        () => {
            setHighlightLine(6);
            setExplanation('🔁 Preparando para executar remover_fim() na lista A → B → C → D → E.');
        },
        () => {
            setHighlightLine(7);
            setExplanation('🔍 Encontrar penúltimo nó. Vamos percorrer a lista até encontrar D.');
        },
        () => {
            setHighlight(3);
            setExplanation('✅ Encontrado penúltimo: D.');
        },
        () => {
            setHighlight(4);
            setHighlightLine(8);
            setExplanation('🗑 Remover último nó: E (prox de D será None).');
        },
        () => {
            setDeadNode(4);
            const newNodes = nodes.slice(0, -1);
            setNodes(newNodes);
            setHighlight(null);
            setHighlightLine(null);
            setExplanation('❌ Nó E removido. Atualizamos ult para D.');
        },
        () => {
            setExplanation('🎉 Processo finalizado. Lista: A → B → C → D');
        }
    ];

    const nextStep = () => {
        if (step < steps.length) {
            steps[step]();
            setStep((prev: number) => prev + 1);
        } else {
            setExplanation('✔️ Execução completa.');
        }
    };

    const pythonCode = [
        'class No:',
        '    def __init__(self, info, prox):',
        '        self.info = info',
        '        self.prox = prox',
        '',
        'lista = Ldse()',
        "lista.inserir_fim('A')",
        "lista.inserir_fim('B')",
        "lista.inserir_fim('C')",
        "lista.inserir_fim('D')",
        "lista.inserir_fim('E')",
        'lista.remover_fim()'
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Lado esquerdo: código Python */}
            <div className="rounded border bg-muted/30 p-4 text-left font-mono text-sm">
                {pythonCode.map((line, index) => (
                    <pre
                        key={index}
                        className={`relative pl-8 pr-2 py-1 rounded transition-all duration-300 ${highlightLine === index ? 'bg-yellow-200' : ''
                            }`}
                    >
                        <span className="absolute left-2 text-muted-foreground select-none">
                            {index + 1}
                        </span>
                        {line}
                    </pre>
                ))}
            </div>

            {/* Lado direito: visualização da lista */}
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                    {nodes.map((node: any, index: any) => (
                        <div
                            key={index}
                            className={`rounded border px-4 py-2 font-mono text-sm relative transition-all duration-300
                ${highlight === index ? 'bg-yellow-200 border-yellow-400' : ''}
                ${deadNode === index ? 'opacity-30 line-through' : 'bg-white'}
              `}
                        >
                            {node}
                            {index < nodes.length - 1 && <span className="absolute right-[-20px] top-1">→</span>}
                        </div>
                    ))}
                </div>

                <div className="text-sm text-muted-foreground text-center">
                    {explanation}
                </div>

                <div className="flex justify-center">
                    <Button onClick={nextStep}>Próximo passo</Button>
                </div>
            </div>
        </div>
    );
};

// Agora insira <RemoverFimTutorial /> no JSX principal de <ListSandbox /> onde quiser
// Exemplo:
// <div className="mt-10">
//   <RemoverFimTutorial />
// </div>
