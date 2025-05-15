'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParenthesesValidatorProps {
  onComplete: (id: string) => void;
}

export function ParenthesesValidator({
  onComplete,
}: ParenthesesValidatorProps) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const validateParentheses = () => {
    if (!expression.trim()) {
      toast.error('Digite uma expressão para validar');
      return;
    }

    const stack: string[] = [];
    let isValid = true;
    let errorChar = '';
    let errorPosition = -1;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (char === '(' || char === '[' || char === '{') {
        stack.push(char);
      } else if (char === ')' || char === ']' || char === '}') {
        if (stack.length === 0) {
          isValid = false;
          errorChar = char;
          errorPosition = i;
          break;
        }

        const top = stack.pop()!;
        if (
          (char === ')' && top !== '(') ||
          (char === ']' && top !== '[') ||
          (char === '}' && top !== '{')
        ) {
          isValid = false;
          errorChar = char;
          errorPosition = i;
          break;
        }
      }
    }

    if (stack.length > 0) {
      isValid = false;
    }

    if (isValid) {
      setResult({
        isValid: true,
        message: 'Expressão válida! Todos os parênteses estão balanceados.',
      });
      onComplete('parentheses');
    } else {
      if (errorPosition !== -1) {
        setResult({
          isValid: false,
          message: `Expressão inválida! Problema com o caractere '${errorChar}' na posição ${
            errorPosition + 1
          }.`,
        });
      } else {
        setResult({
          isValid: false,
          message:
            'Expressão inválida! Existem parênteses abertos que não foram fechados.',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Digite uma expressão contendo parênteses, colchetes ou chaves, e o
        sistema verificará se todos os caracteres de abertura e fechamento estão
        balanceados.
      </p>

      <div className="flex gap-2">
        <Input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Ex: ((2+3)*[5-2])/2"
          className="flex-1"
        />
        <Button onClick={validateParentheses}>Validar</Button>
      </div>

      {result && (
        <div
          className={cn(
            'p-3 rounded text-sm flex items-center gap-2',
            result.isValid
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
          )}
        >
          {result.isValid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      <div className="bg-muted/40 p-3 rounded text-sm">
        <p className="font-medium mb-1">Dica:</p>
        <p>
          Use uma pilha para rastrear os parênteses de abertura. Ao encontrar um
          parêntese de fechamento, verifique se ele corresponde ao último
          parêntese de abertura na pilha.
        </p>
      </div>
    </div>
  );
}
