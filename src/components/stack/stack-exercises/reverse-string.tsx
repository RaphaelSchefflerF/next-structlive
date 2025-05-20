'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReverseStringProps {
  onComplete: (id: string) => void;
}

export function ReverseString({ onComplete }: ReverseStringProps) {
  const [inputString, setInputString] = useState('');
  const [reversedString, setReversedString] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [userReversed, setUserReversed] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const reverseString = () => {
    if (!inputString.trim()) {
      toast.error('Digite uma string para reverter');
      return;
    }

    // Algoritmo de reversão usando pilha
    const stack: string[] = [];
    for (const element of inputString) {
      stack.push(element);
    }

    let reversed = '';
    while (stack.length > 0) {
      reversed += stack.pop();
    }

    setReversedString(reversed);
    setShowSolution(true);
  };

  const checkUserAnswer = () => {
    if (!userReversed.trim()) {
      toast.error('Digite sua resposta antes de verificar');
      return;
    }

    const correct = userReversed === inputString.split('').reverse().join('');
    setIsCorrect(correct);

    if (correct) {
      onComplete('reverse');
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Digite uma string e depois implemente a lógica para revertê-la usando
        uma pilha. Você pode ver a solução ou tentar resolver por conta própria.
      </p>

      <div className="flex gap-2">
        <Input
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="Digite uma string (ex: algoritmo)"
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowSolution(false)}
          variant="outline"
          className="flex-1"
        >
          Tentar resolver
        </Button>
        <Button onClick={reverseString} variant="secondary" className="flex-1">
          Ver solução
        </Button>
      </div>

      {!showSolution ? (
        <div className="space-y-2">
          <p className="text-sm">Digite a string revertida:</p>
          <div className="flex gap-2">
            <Input
              value={userReversed}
              onChange={(e) => setUserReversed(e.target.value)}
              placeholder="String revertida"
              className="flex-1"
            />
            <Button onClick={checkUserAnswer}>Verificar</Button>
          </div>

          {isCorrect !== null && (
            <div
              className={cn(
                'p-3 rounded text-sm flex items-center gap-2',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
              )}
            >
              {isCorrect ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              <span>
                {isCorrect
                  ? 'Correto! Você conseguiu reverter a string!'
                  : 'Incorreto. Tente novamente!'}
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          {reversedString && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded">
                <p className="font-medium">String original:</p>
                <p className="text-lg font-mono">{inputString}</p>
                <p className="font-medium mt-2">String revertida:</p>
                <p className="text-lg font-mono">{reversedString}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm border border-blue-100 dark:border-blue-900/30">
                <p className="font-medium mb-1">Explicação:</p>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Criamos uma pilha vazia.</li>
                  <li>
                    Percorremos cada caractere da string original e o
                    adicionamos à pilha.
                  </li>
                  <li>
                    Após adicionar todos os caracteres, criamos uma nova string
                    vazia.
                  </li>
                  <li>
                    Removemos um por um os caracteres da pilha e os concatenamos
                    na nova string.
                  </li>
                  <li>
                    Como a pilha segue o princípio LIFO, os caracteres são
                    retirados na ordem inversa, resultando na string revertida.
                  </li>
                </ol>
              </div>

              <Button onClick={() => onComplete('reverse')}>
                Marcar como concluído
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
