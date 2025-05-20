'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, X } from 'lucide-react';

interface ExpressionEvaluationProps {
  onComplete: (id: string) => void;
}

export function ExpressionEvaluation({
  onComplete,
}: ExpressionEvaluationProps) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluateExpression = () => {
    if (!expression.trim()) {
      toast.error('Digite uma expressão para avaliar');
      return;
    }

    try {
      // Implementação simplificada - na vida real usaríamos um parser apropriado
      // Isso é apenas para fins educacionais
      setError(null);
      const answer = eval(expression);
      setResult(answer);
      onComplete('expression');
    } catch (err) {
      setError('Expressão inválida. Verifique a sintaxe.');
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <p>
        A avaliação de expressões matemáticas é uma aplicação comum de pilhas.
        Digite uma expressão matemática simples e veja o resultado da avaliação.
      </p>

      <div className="flex gap-2">
        <Input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Ex: (3 + 4) * 2"
          className="flex-1"
        />
        <Button onClick={evaluateExpression}>Avaliar</Button>
      </div>

      {result !== null && !error && (
        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded text-sm flex items-center gap-2 text-green-800 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span>Resultado: {result}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded text-sm flex items-center gap-2 text-red-800 dark:text-red-400">
          <X className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-muted/40 p-3 rounded text-sm">
        <p className="font-medium mb-1">Como funciona:</p>
        <p>
          Para avaliar expressões matemáticas, os compiladores e interpretadores
          usam duas pilhas:
        </p>
        <ol className="list-decimal ml-4 mt-2 space-y-1">
          <li>Pilha de operandos (números)</li>
          <li>Pilha de operadores (+, -, *, /)</li>
        </ol>
        <p className="mt-2">
          Quando um número é encontrado, ele é empilhado na pilha de operandos.
          Quando um operador é encontrado, ele é processado com base em sua
          precedência, desempilhando operandos e aplicando as operações conforme
          necessário.
        </p>
      </div>
    </div>
  );
}
