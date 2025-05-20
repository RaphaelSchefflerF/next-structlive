'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  CheckCircle,
  X,
  Info,
  PlusSquare,
  ArrowDownSquare,
  Eye,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function StackOperations() {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [operationType, setOperationType] = useState('push');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para limpar o resultado/erro após um tempo
  const clearResultAfterDelay = () => {
    setTimeout(() => {
      setResult(null);
      setError(null);
    }, 3000);
  };

  // Função para executar a operação selecionada
  const executeOperation = () => {
    setError(null);
    setResult(null);

    try {
      switch (operationType) {
        case 'push':
          if (!inputValue.trim()) {
            setError('Por favor, insira um valor para adicionar à pilha.');
            clearResultAfterDelay();
            return;
          }
          setStack([...stack, inputValue]);
          setResult(`Valor "${inputValue}" adicionado ao topo da pilha.`);
          setInputValue('');
          break;

        case 'pop': {
          if (stack.length === 0) {
            setError('Não é possível remover de uma pilha vazia.');
            clearResultAfterDelay();
            return;
          }
          const removedItem = stack[stack.length - 1];
          setStack(stack.slice(0, -1));
          setResult(`Valor "${removedItem}" removido do topo da pilha.`);
          break;
        }

        case 'peek':
          if (stack.length === 0) {
            setError('A pilha está vazia.');
            clearResultAfterDelay();
            return;
          }
          setResult(`O valor no topo da pilha é "${stack[stack.length - 1]}".`);
          break;

        case 'isEmpty': {
          const empty = stack.length === 0;
          setResult(`A pilha ${empty ? 'está' : 'não está'} vazia.`);
          break;
        }

        case 'size':
          setResult(`A pilha contém ${stack.length} elemento(s).`);
          break;

        default:
          setError('Operação desconhecida.');
          clearResultAfterDelay();
          return;
      }
      clearResultAfterDelay();
    } catch (e) {
      setError('Ocorreu um erro ao executar a operação.');
      clearResultAfterDelay();
    }
  };

  // Função para limpar a pilha
  const clearStack = () => {
    setStack([]);
    setResult('Pilha esvaziada.');
    clearResultAfterDelay();
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">
        Pratique as operações de Pilha
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Selecione uma operação e veja como a pilha é afetada por cada uma delas.
      </p>

      <div className="flex flex-col space-y-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <div className="flex items-start gap-2 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={operationType}
                  onValueChange={(value) => setOperationType(value)}
                >
                  <SelectTrigger className="w-40 sm:w-[180px]">
                    <SelectValue placeholder="Selecione a operação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push">Push</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="peek">Peek/Top</SelectItem>
                    <SelectItem value="isEmpty">isEmpty</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mostrar o campo de entrada apenas para operação push */}
                {operationType === 'push' && (
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Valor para adicionar"
                    className="w-[200px]"
                  />
                )}
              </div>
              <Button onClick={executeOperation} variant="default">
                Executar {operationType}
              </Button>
              <Button onClick={clearStack} variant="outline">
                Limpar Pilha
              </Button>
            </div>

            <div className="flex-1 p-2 bg-background rounded border min-h-[2.5rem]">
              {stack.length > 0 ? (
                <div className="flex flex-col space-y-2">
                  {[...stack].reverse().map((item, reverseIndex) => {
                    const actualIndex = stack.length - 1 - reverseIndex;
                    return (
                      <div
                        key={actualIndex}
                        className="px-2 py-1 bg-muted rounded text-sm flex justify-between"
                      >
                        <span>{item}</span>
                        <span className="text-muted-foreground">
                          {actualIndex === stack.length - 1 ? '(topo)' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center text-muted-foreground gap-1">
                  <Info className="h-4 w-4" />
                  <span>Pilha vazia</span>
                </div>
              )}
            </div>
          </div>

          {/* Exibição do resultado ou erro */}
          {result && (
            <div className="p-3 bg-muted rounded text-sm mt-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{result}</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded text-sm mt-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <X className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted/20">
            <h4 className="font-medium">
              Visualizando operações em tempo real
            </h4>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <PlusSquare className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Push</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Adiciona um elemento ao topo da pilha
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowDownSquare className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Pop</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Remove e retorna o elemento do topo
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Peek</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Visualiza o elemento do topo sem removê-lo
                </p>
              </div>
            </div>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Dica</AlertTitle>
              <AlertDescription>
                Experimente adicionar vários elementos e depois usar as
                operações pop e peek para entender melhor o comportamento LIFO
                (Last In, First Out) da pilha.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
