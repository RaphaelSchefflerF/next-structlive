'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StackOperations from './stack-operations';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export default function StackVisualization() {
  const [mode, setMode] = useState<'interativo' | 'animado'>('interativo');

  // Função para baixar um exemplo de código
  const downloadExample = () => {
    const code = `
    // Implementação de uma pilha em JavaScript
    class Stack {
      constructor() {
        this.items = [];
      }

      push(element) {
        this.items.push(element);
        return this.items.length;
      }

      pop() {
        if (this.isEmpty()) {
          return "Underflow";
        }
        return this.items.pop();
      }

      peek() {
        if (this.isEmpty()) {
          return "Pilha vazia";
        }
        return this.items[this.items.length - 1];
      }

      isEmpty() {
        return this.items.length === 0;
      }

      size() {
        return this.items.length;
      }

      clear() {
        this.items = [];
      }
    }

    // Exemplo de uso
    const minhaStack = new Stack();
    minhaStack.push("A");
    minhaStack.push("B");
    minhaStack.push("C");
    console.log(minhaStack.peek());  // C
    console.log(minhaStack.pop());   // C
    console.log(minhaStack.size());  // 2
    `.trim();

    // Criando um blob para download
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pilha-exemplo.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Código de exemplo baixado!');
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="interativo"
        onValueChange={(value) => setMode(value as 'interativo' | 'animado')}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="interativo">Modo Interativo</TabsTrigger>
          <TabsTrigger value="animado">Modo Animado</TabsTrigger>
        </TabsList>

        <TabsContent value="interativo">
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Pratique as operações</CardTitle>
                <CardDescription>
                  Experimente as operações básicas da pilha e veja os resultados
                  imediatamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StackOperations />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recursos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                    onClick={downloadExample}
                  >
                    <span>Download Código de Exemplo</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    <p className="font-medium mb-1">Dica:</p>
                    <p>
                      Tente adicionar vários elementos e depois executar
                      operações de pop e peek para visualizar como a pilha se
                      comporta.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="animado">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Visualização Animada</CardTitle>
              <CardDescription>
                Veja animações que demonstram o comportamento LIFO das pilhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-[300px] bg-muted/30 rounded-md">
                <p className="text-muted-foreground">
                  [Aqui entraria uma animação de pilhas - função a ser
                  implementada]
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
