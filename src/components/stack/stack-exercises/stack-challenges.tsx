'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StackOperationType = 'push' | 'pop' | 'peek' | 'size' | 'isEmpty';

interface Challenge {
  id: number;
  description: string;
  type: StackOperationType;
  expectedOutput?: string | number | boolean;
  completed: boolean;
}

interface StackChallengesProps {
  onComplete: (id: string) => void;
  challenges: Challenge[];
}

export function StackChallenges({
  onComplete,
  challenges,
}: StackChallengesProps) {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<StackOperationType>('push');
  const [result, setResult] = useState<string | null>(null);
  const [challengesList, setChallengesList] = useState<Challenge[]>(challenges);

  const executeOperation = () => {
    let operationResult: string | number | boolean | null = null;
    const newStack = [...stack];

    switch (operation) {
      case 'push':
        if (!inputValue.trim()) {
          toast.error('Digite um valor para adicionar à pilha');
          return;
        }
        newStack.push(inputValue);
        setStack(newStack);
        operationResult = `Elemento "${inputValue}" adicionado ao topo da pilha`;
        break;

      case 'pop': {
        if (newStack.length === 0) {
          toast.error('A pilha está vazia');
          return;
        }
        const popped = newStack.pop() as string;
        setStack(newStack);
        operationResult = popped;
        break;
      }

      case 'peek':
        if (newStack.length === 0) {
          toast.error('A pilha está vazia');
          return;
        }
        operationResult = newStack[newStack.length - 1];
        break;

      case 'size':
        operationResult = newStack.length;
        break;

      case 'isEmpty':
        operationResult = newStack.length === 0;
        break;
    }

    setResult(String(operationResult));
    setInputValue('');
    checkChallengeCompletion(operation, inputValue, operationResult);
  };

  const checkChallengeCompletion = (
    type: StackOperationType,
    value: string,
    operationResult: string | number | boolean | null,
  ) => {
    setChallengesList(
      challengesList.map((challenge) => {
        if (challenge.completed) return challenge;

        // Verificar desafio 1: adicionar X, Y, Z
        if (type === 'push' && challenge.id === 1 && challenge.type === type) {
          if (stack.includes('X') && stack.includes('Y') && value === 'Z') {
            onComplete('basicOperations');
            return { ...challenge, completed: true };
          }
        }

        // Verificar desafio 2: remover elemento do topo (Z)
        else if (
          type === 'pop' &&
          challenge.id === 2 &&
          challenge.type === type
        ) {
          if (operationResult === 'Z') {
            return { ...challenge, completed: true };
          }
        }

        // Verificar desafio 3: verificar elemento no topo (Y)
        else if (
          type === 'peek' &&
          challenge.id === 3 &&
          challenge.type === type
        ) {
          if (operationResult === 'Y') {
            return { ...challenge, completed: true };
          }
        }

        // Verificar desafio 4: adicionar W e V
        else if (
          type === 'push' &&
          challenge.id === 4 &&
          challenge.type === type
        ) {
          if (
            (stack.includes('W') && value === 'V') ||
            (stack.includes('V') && value === 'W')
          ) {
            return { ...challenge, completed: true };
          }
        }

        // Verificar desafio 5: verificar tamanho (4 elementos)
        else if (
          type === 'size' &&
          challenge.id === 5 &&
          challenge.type === type
        ) {
          if (Number(operationResult) === 4) {
            return { ...challenge, completed: true };
          }
        }

        // Verificar desafio 6: verificar se está vazia
        else if (
          type === 'isEmpty' &&
          challenge.id === 6 &&
          challenge.type === type
        ) {
          if (stack.length === 0 && operationResult === true) {
            return { ...challenge, completed: true };
          }
        }

        return challenge;
      }),
    );
  };

  const resetStack = () => {
    setStack([]);
    setResult(null);
    setInputValue('');
    setChallengesList(challenges.map((c) => ({ ...c, completed: false })));
    toast('Pilha e desafios reiniciados');
  };

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium">Desafios</h3>
        <div className="space-y-2">
          {challengesList.map((challenge) => (
            <div
              key={challenge.id}
              className={cn(
                'p-3 border rounded-md flex items-center gap-3',
                challenge.completed
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                  : '',
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  challenge.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {challenge.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  challenge.id
                )}
              </div>
              <p
                className={
                  challenge.completed
                    ? 'line-through text-muted-foreground'
                    : ''
                }
              >
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="p-4 border rounded-md bg-muted/30">
          <h3 className="font-medium mb-2">Operações de Pilha</h3>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="col-span-2 flex gap-2">
                <select
                  className="bg-background border rounded px-3 py-2 flex-1"
                  value={operation}
                  onChange={(e) =>
                    setOperation(e.target.value as StackOperationType)
                  }
                >
                  <option value="push">Push (Adicionar)</option>
                  <option value="pop">Pop (Remover)</option>
                  <option value="peek">Peek (Ver topo)</option>
                  <option value="size">Size (Tamanho)</option>
                  <option value="isEmpty">isEmpty (Está vazia?)</option>
                </select>

                {operation === 'push' && (
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Valor a adicionar"
                    className="flex-1"
                  />
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={executeOperation} className="flex-1">
                  Executar
                </Button>
                <Button onClick={resetStack} variant="outline">
                  Resetar
                </Button>
              </div>
            </div>

            {result !== null && (
              <div className="p-3 bg-muted rounded text-sm">
                <p className="font-medium">Resultado:</p>
                <p className="text-lg font-mono mt-1">{result}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Visualização da Pilha</h3>
          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted p-2 text-sm font-medium">
              Topo da Pilha
            </div>
            <div className="divide-y">
              {stack.length > 0 ? (
                [...stack].reverse().map((item, index) => (
                  <div
                    key={stack.length - 1 - index}
                    className={cn(
                      'p-3 flex justify-between items-center',
                      index === 0 ? 'bg-primary/5' : '',
                    )}
                  >
                    <span className="font-mono">{item}</span>
                    <Badge variant="outline" className="text-xs">
                      {index === 0 ? 'Topo' : `Posição ${index}`}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Pilha vazia
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
