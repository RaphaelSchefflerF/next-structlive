'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ListNode {
  value: string;
  id: string;
}

export default function ListVisualization() {
  const [list, setList] = useState<ListNode[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [animatingNodeId, setAnimatingNodeId] = useState<string | null>(null);
  const [operationText, setOperationText] = useState('');

  const maxListSize = 8;

  // Gerar um ID único para cada nó da lista
  const generateId = () => Math.random().toString(36).slice(2, 11);

  const append = () => {
    if (!inputValue.trim()) {
      toast.error('Entrada inválida', {
        description: 'Por favor, insira um valor para adicionar à lista.',
      });
      return;
    }

    if (list.length >= maxListSize) {
      toast.error('Lista cheia', {
        description: 'A lista atingiu seu tamanho máximo.',
      });
      return;
    }

    const newNodeId = generateId();
    setOperationText(`Adicionando "${inputValue}" ao final da lista...`);
    setList([...list, { value: inputValue, id: newNodeId }]);
    setAnimatingNodeId(newNodeId);

    setTimeout(() => {
      setAnimatingNodeId(null);
      setOperationText(`"${inputValue}" foi adicionado ao final da lista.`);
      setInputValue('');
    }, 1000);
  };

  const insert = () => {
    if (!inputValue.trim()) {
      toast.error('Entrada inválida', {
        description: 'Por favor, insira um valor para adicionar à lista.',
      });
      return;
    }

    if (list.length >= maxListSize) {
      toast.error('Lista cheia', {
        description: 'A lista atingiu seu tamanho máximo.',
      });
      return;
    }

    const index = Number.parseInt(inputIndex);
    if (Number.isNaN(index) || index < 0 || index > list.length) {
      toast.error('Índice inválido', {
        description: `O índice deve estar entre 0 e ${list.length}.`,
      });
      return;
    }

    const newNodeId = generateId();
    setOperationText(`Inserindo "${inputValue}" na posição ${index}...`);

    const newList = [...list];
    newList.splice(index, 0, { value: inputValue, id: newNodeId });
    setList(newList);
    setAnimatingNodeId(newNodeId);

    setTimeout(() => {
      setAnimatingNodeId(null);
      setOperationText(`"${inputValue}" foi inserido na posição ${index}.`);
      setInputValue('');
      setInputIndex('');
    }, 1000);
  };

  const remove = () => {
    if (list.length === 0) {
      toast.error('Lista vazia', {
        description: 'Não é possível remover de uma lista vazia.',
      });
      return;
    }

    const index = Number.parseInt(inputIndex);
    if (Number.isNaN(index) || index < 0 || index >= list.length) {
      toast.error('Índice inválido', {
        description: `O índice deve estar entre 0 e ${list.length - 1}.`,
      });
      return;
    }

    const nodeToRemove = list[index];
    setOperationText(
      `Removendo "${nodeToRemove.value}" da posição ${index}...`,
    );
    setAnimatingNodeId(nodeToRemove.id);

    setTimeout(() => {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
      setAnimatingNodeId(null);
      setOperationText(
        `"${nodeToRemove.value}" foi removido da posição ${index}.`,
      );
      setInputIndex('');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visualização da Lista</h3>

        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            {operationText ||
              'Utilize os controles abaixo para adicionar, inserir ou remover elementos da lista.'}
          </div>

          <div className="bg-muted/50 border rounded-lg p-8 flex items-center justify-center min-h-[150px]">
            {list.length > 0 ? (
              <div className="flex items-center space-x-1">
                {list.map((node, index) => (
                  <div key={node.id} className="flex flex-col items-center">
                    <div
                      className={`
                        w-14 h-14 border-2 rounded flex items-center justify-center text-lg font-medium
                        ${
                          animatingNodeId === node.id
                            ? 'animate-pulse bg-primary/20 border-primary'
                            : 'bg-background border-border'
                        }
                      `}
                    >
                      {node.value}
                    </div>
                    <div className="text-xs mt-1 text-center">{index}</div>
                    {index < list.length - 1 && (
                      <div className="flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 mx-1 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">Lista vazia</div>
            )}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="value-input">Valor</Label>
                <Input
                  id="value-input"
                  placeholder="Digite um valor..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && append()}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="index-input">Índice (opcional)</Label>
                <Input
                  id="index-input"
                  placeholder="Para inserção/remoção em posição específica"
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  type="number"
                  min="0"
                  max={list.length}
                />
              </div>
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <Button
                onClick={append}
                disabled={
                  animatingNodeId !== null || list.length >= maxListSize
                }
                className="w-full"
              >
                Adicionar ao final
              </Button>
              <Button
                onClick={insert}
                disabled={
                  animatingNodeId !== null || list.length >= maxListSize
                }
                variant="outline"
                className="w-full"
              >
                Inserir na posição
              </Button>
              <Button
                onClick={remove}
                disabled={animatingNodeId !== null || list.length === 0}
                variant="destructive"
                className="w-full"
              >
                Remover da posição
              </Button>
            </div>
          </div>
        </div>

        {list.length > 0 && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="font-medium">Estado atual da lista:</div>
            <div className="mt-2 space-y-1">
              <div>Tamanho: {list.length}</div>
              <div>
                Elementos: [
                {list.map((node, index) => (
                  <span key={node.id}>
                    {index > 0 ? ', ' : ''}
                    {node.value}
                  </span>
                ))}
                ]
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
