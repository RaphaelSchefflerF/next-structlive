'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

export default function ListImplementation() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Implementação de Lista</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Exemplos de como implementar diferentes tipos de listas em TypeScript.
        </p>
      </div>

      <Tabs defaultValue="singly" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="singly">Lista Simplesmente Encadeada</TabsTrigger>
          <TabsTrigger value="doubly">Lista Duplamente Encadeada</TabsTrigger>
        </TabsList>

        <TabsContent value="singly" className="space-y-6">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(singlyLinkedListCode, 'singly')}
            >
              {copied === 'singly' ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </>
              )}
            </Button>
            <pre className="p-4 rounded-lg border bg-muted overflow-x-auto">
              <code className="text-sm">{singlyLinkedListCode}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium">Explicação dos Métodos</h4>

            <div>
              <h5 className="font-medium">Classe Node</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Um nó contém um valor e uma referência para o próximo nó na
                lista. É o bloco de construção básico de uma lista encadeada.
              </p>
            </div>

            <div>
              <h5 className="font-medium">append(element)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Adiciona um elemento ao final da lista. Se a lista estiver
                vazia, o elemento se torna o primeiro nó (head). Caso contrário,
                percorre a lista até o último nó e adiciona o elemento como o
                próximo nó.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">insert(element, position)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Insere um elemento em uma posição específica da lista.
                Verificamos se a posição é válida, percorremos a lista até
                encontrar o ponto de inserção, e então adicionamos o novo nó,
                ajustando as referências.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">removeAt(position)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Remove o elemento na posição especificada. Navegamos até o nó
                anterior à posição desejada e ajustamos as referências para
                &quot;pular&ldquo; o nó a ser removido, efetivamente removendo-o
                da lista.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">remove(element)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Remove a primeira ocorrência de um elemento específico. Procura
                o elemento na lista e, quando encontrado, ajusta as referências
                para removê-lo.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">indexOf(element)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Encontra o índice da primeira ocorrência de um elemento.
                Percorre a lista, comparando cada elemento com o valor buscado.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">isEmpty() e size()</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Métodos auxiliares para verificar se a lista está vazia e para
                obter o número de elementos na lista, respectivamente.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(1) para isEmpty, O(1)
                para size (com contador mantido)
              </p>
            </div>

            <div>
              <h5 className="font-medium">getHead() e toString()</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Métodos para obter o primeiro nó da lista e para converter a
                lista em uma representação de string legível, respectivamente.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="doubly" className="space-y-6">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(doublyLinkedListCode, 'doubly')}
            >
              {copied === 'doubly' ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </>
              )}
            </Button>
            <pre className="p-4 rounded-lg border bg-muted overflow-x-auto">
              <code className="text-sm">{doublyLinkedListCode}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium">Explicação dos Métodos</h4>

            <div>
              <h5 className="font-medium">Classe DoublyNode</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Estende o conceito do nó simples adicionando uma referência ao
                nó anterior, permitindo navegação em ambas as direções.
              </p>
            </div>

            <div>
              <h5 className="font-medium">insert(element, position)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Similar à lista simplesmente encadeada, mas precisa atualizar
                tanto referências de próximo quanto de anterior para manter a
                lista consistente.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">removeAt(position)</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Remove um elemento na posição especificada, atualizando as
                referências de próximo e anterior dos nós adjacentes.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Complexidade de tempo:</strong> O(n)
              </p>
            </div>

            <div>
              <h5 className="font-medium">
                Vantagens da Lista Duplamente Encadeada
              </h5>
              <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
                <li>Navegação bidirecional (para frente e para trás)</li>
                <li>
                  Remoção mais eficiente (não precisa encontrar o nó anterior)
                </li>
                <li>Implementação mais simples para certas operações</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium">
                Desvantagens da Lista Duplamente Encadeada
              </h5>
              <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
                <li>
                  Consome mais memória (armazena uma referência adicional por
                  nó)
                </li>
                <li>
                  Operações de inserção e remoção são mais complexas (mais
                  ponteiros para atualizar)
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const singlyLinkedListCode = `class Node<T> {
  element: T;
  next: Node<T> | null;

  constructor(element: T) {
    this.element = element;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  private head: Node<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.count = 0;
  }

  // Adiciona um elemento ao final da lista
  append(element: T): void {
    const node = new Node(element);

    // Se a lista estiver vazia
    if (this.head === null) {
      this.head = node;
    } else {
      // Percorre até o último nó
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      // Adiciona o novo nó como próximo do último
      current.next = node;
    }

    this.count++;
  }

  // Insere um elemento em uma posição específica
  insert(element: T, position: number): boolean {
    // Verifica se posição é válida
    if (position < 0 || position > this.count) {
      return false;
    }

    const node = new Node(element);

    // Inserindo no início da lista
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      // Percorre até a posição desejada
      let current = this.head;
      let previous = null;
      let index = 0;

      while (index++ < position) {
        previous = current;
        current = current!.next;
      }

      // Insere o novo nó
      node.next = current;
      previous!.next = node;
    }

    this.count++;
    return true;
  }

  // Remove o elemento em uma posição específica
  removeAt(position: number): T | null {
    // Verifica se posição é válida
    if (position < 0 || position >= this.count || this.head === null) {
      return null;
    }

    let current = this.head;

    // Remove o primeiro elemento
    if (position === 0) {
      this.head = current.next;
    } else {
      // Percorre até a posição desejada
      let previous = null;
      let index = 0;

      while (index++ < position) {
        previous = current;
        current = current.next!;
      }

      // Pula o elemento a ser removido ligando o anterior ao próximo
      previous!.next = current.next;
    }

    this.count--;
    return current.element;
  }

  // Remove um elemento específico da lista
  remove(element: T): T | null {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // Encontra o índice de um elemento
  indexOf(element: T): number {
    if (this.head === null) {
      return -1;
    }

    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1; // Elemento não encontrado
  }

  // Verifica se a lista está vazia
  isEmpty(): boolean {
    return this.count === 0;
  }

  // Retorna o tamanho da lista
  size(): number {
    return this.count;
  }

  // Retorna o primeiro nó da lista
  getHead(): Node<T> | null {
    return this.head;
  }

  // Converte a lista para string
  toString(): string {
    if (this.head === null) {
      return '';
    }

    let str = \`\${this.head.element}\`;
    let current = this.head.next;

    while (current !== null) {
      str = \`\${str},\${current.element}\`;
      current = current.next;
    }

    return str;
  }
}`;

const doublyLinkedListCode = `class DoublyNode<T> {
  element: T;
  next: DoublyNode<T> | null;
  prev: DoublyNode<T> | null;

  constructor(element: T) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null;
  private tail: DoublyNode<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  // Adiciona um elemento ao final da lista
  append(element: T): void {
    const node = new DoublyNode(element);

    // Se a lista estiver vazia
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      // Adiciona ao final da lista
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }

    this.count++;
  }

  // Insere um elemento em uma posição específica
  insert(element: T, position: number): boolean {
    // Verifica se posição é válida
    if (position < 0 || position > this.count) {
      return false;
    }

    const node = new DoublyNode(element);

    // Inserindo em lista vazia ou no início
    if (position === 0) {
      if (this.head === null) {
        this.head = node;
        this.tail = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
    }
    // Inserindo no final
    else if (position === this.count) {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    // Inserindo no meio
    else {
      let current: DoublyNode<T>;

      // Determina qual extremidade é mais próxima da posição
      if (position < this.count / 2) {
        // Começa do início
        current = this.head!;
        let index = 0;
        while (index++ < position) {
          current = current.next!;
        }
      } else {
        // Começa do final
        current = this.tail!;
        let index = this.count - 1;
        while (index-- > position) {
          current = current.prev!;
        }
      }

      // Insere o novo nó antes do nó current
      node.next = current;
      node.prev = current.prev;
      current.prev!.next = node;
      current.prev = node;
    }

    this.count++;
    return true;
  }

  // Remove o elemento em uma posição específica
  removeAt(position: number): T | null {
    // Verifica se posição é válida
    if (position < 0 || position >= this.count || this.head === null) {
      return null;
    }

    let current = this.head;

    // Remove o primeiro elemento
    if (position === 0) {
      this.head = current.next;

      // Se houver apenas um item, atualiza o tail também
      if (this.count === 1) {
        this.tail = null;
      } else {
        this.head!.prev = null;
      }
    }
    // Remove o último elemento
    else if (position === this.count - 1) {
      current = this.tail!;
      this.tail = current.prev;
      this.tail!.next = null;
    }
    // Remove do meio
    else {
      // Determina qual extremidade é mais próxima da posição
      if (position < this.count / 2) {
        // Começa do início
        current = this.head;
        let index = 0;
        while (index++ < position) {
          current = current.next!;
        }
      } else {
        // Começa do final
        current = this.tail!;
        let index = this.count - 1;
        while (index-- > position) {
          current = current.prev!;
        }
      }

      // Remove o nó atualizando as ligações
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }

    this.count--;
    return current.element;
  }

  // Outros métodos (indexOf, remove, isEmpty, size, etc.) são similares
  // à implementação da lista simplesmente encadeada
}`;
