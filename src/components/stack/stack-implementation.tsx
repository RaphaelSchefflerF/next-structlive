'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Copy, Check, Info } from 'lucide-react';

export default function StackImplementation() {
  const [activeTab, setActiveTab] = useState('array');
  const [copiedImplementation, setCopiedImplementation] = useState<
    string | null
  >(null);

  const arrayImplementation = `class Stack<T> {
  private items: T[] = [];

  // Adiciona um elemento ao topo da pilha
  push(element: T): void {
    this.items.push(element);
  }

  // Remove e retorna o elemento do topo da pilha
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // Retorna o elemento do topo da pilha sem removê-lo
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Verifica se a pilha está vazia
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Retorna o tamanho da pilha
  size(): number {
    return this.items.length;
  }

  // Limpa a pilha
  clear(): void {
    this.items = [];
  }
}

// Exemplo de uso:
const stack = new Stack<string>();
stack.push("A");
stack.push("B");
stack.push("C");

console.log(stack.peek());  // "C"
console.log(stack.pop());   // "C"
console.log(stack.size());  // 2`;

  const linkedListImplementation = `class StackNode<T> {
  value: T;
  next: StackNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedStack<T> {
  private top: StackNode<T> | null = null;
  private count: number = 0;

  // Adiciona um elemento ao topo da pilha
  push(element: T): void {
    const newNode = new StackNode(element);

    if (this.isEmpty()) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }

    this.count++;
  }

  // Remove e retorna o elemento do topo da pilha
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.top!.value;
    this.top = this.top!.next;
    this.count--;

    return value;
  }

  // Retorna o elemento do topo da pilha sem removê-lo
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.top!.value;
  }

  // Verifica se a pilha está vazia
  isEmpty(): boolean {
    return this.top === null;
  }

  // Retorna o tamanho da pilha
  size(): number {
    return this.count;
  }

  // Limpa a pilha
  clear(): void {
    this.top = null;
    this.count = 0;
  }
}

// Exemplo de uso:
const linkedStack = new LinkedStack<number>();
linkedStack.push(10);
linkedStack.push(20);
linkedStack.push(30);

console.log(linkedStack.peek());  // 30
console.log(linkedStack.pop());   // 30
console.log(linkedStack.size());  // 2`;

  const bracketCheckerImplementation = `// Verificador de parênteses balanceados usando pilha
function checkBalancedBrackets(expression: string): boolean {
  const stack = new Array<string>();

  // Mapeia os parênteses de fechamento para seus correspondentes de abertura
  const bracketPairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    // Se for parêntese de abertura, empilha
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
      continue;
    }

    // Se for parêntese de fechamento
    if (char === ')' || char === '}' || char === ']') {
      // Se a pilha estiver vazia, não há correspondente
      if (stack.length === 0) {
        return false;
      }

      // Obtém o último parêntese aberto
      const lastOpenBracket = stack.pop();

      // Verifica se o parêntese aberto corresponde ao fechado
      if (lastOpenBracket !== bracketPairs[char]) {
        return false;
      }
    }
  }

  // Se a pilha não estiver vazia, ainda há parênteses abertos sem fechamento
  return stack.length === 0;
}

// Exemplos de uso:
console.log(checkBalancedBrackets("(a + b) * {c - [d / e]}")); // true
console.log(checkBalancedBrackets("((a + b) * (c - d)")); // false (falta fechar um parêntese)
console.log(checkBalancedBrackets("(a + b) * c)")); // false (fecha mais parênteses do que abre)
console.log(checkBalancedBrackets("{[()]}")); // true
console.log(checkBalancedBrackets("{[(])}")); // false (ordem incorreta)`;

  const copyToClipboard = (implementation: string, type: string) => {
    navigator.clipboard.writeText(implementation);
    setCopiedImplementation(type);

    toast.success('Código copiado para a área de transferência!', {
      description: `Implementação de pilha usando ${type} copiada com sucesso.`,
      duration: 3000,
    });

    setTimeout(() => {
      setCopiedImplementation(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Implementação de Pilha</h3>
      <p className="text-sm text-muted-foreground">
        Existem diferentes maneiras de implementar uma pilha em
        TypeScript/JavaScript. Abaixo você encontrará implementações usando
        array, lista encadeada e uma aplicação prática.
      </p>

      <Tabs defaultValue="array" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="array">Usando Array</TabsTrigger>
          <TabsTrigger value="linked">Usando Lista Encadeada</TabsTrigger>
          <TabsTrigger value="brackets">Verificador de Parênteses</TabsTrigger>
        </TabsList>

        <TabsContent value="array" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">Stack.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(arrayImplementation, 'array')}
              >
                {copiedImplementation === 'array' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{arrayImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm text-muted-foreground">
              <p>
                <span className="font-semibold">Nota:</span> A implementação
                usando arrays é a mais simples e eficiente para pilhas, pois as
                operações de push e pop em JavaScript são O(1).
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="linked" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">LinkedStack.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(linkedListImplementation, 'linked')
                }
              >
                {copiedImplementation === 'linked' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{linkedListImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm text-muted-foreground">
              <p>
                <span className="font-semibold">Vantagens:</span> A
                implementação com lista encadeada não tem limitação de tamanho e
                permite que a pilha cresça conforme necessário. A inserção e
                remoção sempre ocorrem no início da lista, garantindo operações
                O(1).
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="brackets" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">BracketChecker.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(bracketCheckerImplementation, 'brackets')
                }
              >
                {copiedImplementation === 'brackets' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{bracketCheckerImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm flex items-start gap-2">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Aplicação prática: Verificação de parênteses balanceados
                </p>
                <p className="mt-1">
                  Esta é uma aplicação comum de pilhas em compiladores e
                  editores de código. O algoritmo percorre a expressão caractere
                  por caractere, empilhando parênteses de abertura e
                  desempilhando quando encontra parênteses de fechamento,
                  verificando se correspondem ao último parêntese aberto.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border p-4 bg-muted/20">
        <h4 className="font-medium mb-2 text-sm">
          Comparação entre implementações
        </h4>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <div className="font-medium">Característica</div>
            <div className="font-medium">Array</div>
            <div className="font-medium">Lista Encadeada</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>Complexidade de espaço</div>
            <div>Menor</div>
            <div>Maior (referências)</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>Tamanho</div>
            <div>Limitado pela memória</div>
            <div>Limitado pela memória</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>Push</div>
            <div>O(1)</div>
            <div>O(1)</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>Pop</div>
            <div>O(1)</div>
            <div>O(1)</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>Facilidade de implementação</div>
            <div>Muito fácil</div>
            <div>Moderada</div>
          </div>
        </div>
      </div>
    </div>
  );
}
