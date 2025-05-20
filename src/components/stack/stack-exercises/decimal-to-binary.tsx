'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface DecimalToBinaryProps {
  onComplete: (id: string) => void;
}

export function DecimalToBinary({ onComplete }: DecimalToBinaryProps) {
  const [decimalNumber, setDecimalNumber] = useState('');
  const [binaryResult, setBinaryResult] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const convertToBinary = () => {
    if (!decimalNumber.trim() || isNaN(Number(decimalNumber))) {
      toast.error('Digite um número decimal válido');
      return;
    }

    const decimal = parseInt(decimalNumber);
    if (decimal < 0) {
      toast.error(
        'Por favor, use apenas números positivos para este exercício',
      );
      return;
    }

    // Convertendo para binário usando pilha
    const stack: number[] = [];
    const conversionSteps: string[] = [];
    let num = decimal;

    if (num === 0) {
      stack.push(0);
      conversionSteps.push(`0 ÷ 2 = 0 com resto 0 (Push 0 na pilha)`);
    }

    while (num > 0) {
      const remainder = num % 2;
      stack.push(remainder);
      conversionSteps.push(
        `${num} ÷ 2 = ${Math.floor(
          num / 2,
        )} com resto ${remainder} (Push ${remainder} na pilha)`,
      );
      num = Math.floor(num / 2);
    }

    let binary = '';
    conversionSteps.push(`\nDesempilhando os valores:`);

    while (stack.length > 0) {
      const digit = stack.pop();
      binary += digit;
      conversionSteps.push(`Pop: ${digit}`);
    }

    setBinaryResult(binary);
    setSteps(conversionSteps);
    setShowSolution(true);
    onComplete('binary');
  };

  return (
    <div className="space-y-4">
      <p>
        Converta um número decimal para binário usando o algoritmo de divisão
        sucessiva por 2, utilizando uma pilha para armazenar os restos e depois
        desempilhando para formar o número binário.
      </p>

      <div className="flex gap-2">
        <Input
          type="number"
          value={decimalNumber}
          onChange={(e) => setDecimalNumber(e.target.value)}
          placeholder="Digite um número decimal"
          className="flex-1"
        />
        <Button onClick={convertToBinary}>Converter para Binário</Button>
      </div>

      {showSolution && (
        <div className="space-y-4 mt-4">
          <div className="p-3 bg-muted rounded">
            <p className="font-medium">Número decimal:</p>
            <p className="text-lg font-mono">{decimalNumber}</p>
            <p className="font-medium mt-2">Representação binária:</p>
            <p className="text-lg font-mono">{binaryResult}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm border border-blue-100 dark:border-blue-900/30">
            <p className="font-medium mb-2">Passos da conversão:</p>
            <pre className="whitespace-pre-wrap">{steps.join('\n')}</pre>
          </div>

          <div className="bg-muted/40 p-3 rounded text-sm">
            <p className="font-medium mb-1">Por que usar uma pilha?</p>
            <p>
              A pilha é perfeita para este algoritmo porque precisamos reverter
              a ordem dos restos. Como estamos dividindo o número do mais
              significativo para o menos significativo, mas precisamos construir
              o binário do bit mais significativo para o menos significativo, a
              pilha nos permite armazenar e depois recuperar os dígitos na ordem
              correta.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
