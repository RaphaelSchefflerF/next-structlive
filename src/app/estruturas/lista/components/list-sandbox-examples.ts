export const examples = {
  básico: `// Implementação básica de Lista usando Array
class LinkedList {
  constructor() {
    this.items = [];
  }

  // Adiciona um elemento no final da lista
  add(element) {
    this.items.push(element);
    console.log(\`Add: \${element}\`);
    return this.items.length;
  }

  // Insere um elemento em uma posição específica
  insert(element, position) {
    if (position < 0 || position > this.items.length) {
      console.log("Posição inválida");
      return false;
    }

    this.items.splice(position, 0, element);
    console.log(\`Insert: \${element} na posição \${position}\`);
    return true;
  }

  // Remove um elemento de uma posição específica
  remove(position) {
    if (position < 0 || position >= this.items.length) {
      console.log("Posição inválida");
      return null;
    }

    const removedItem = this.items.splice(position, 1)[0];
    console.log(\`Remove: \${removedItem} da posição \${position}\`);
    return removedItem;
  }

  // Retorna o elemento em uma posição específica
  get(position) {
    if (position < 0 || position >= this.items.length) {
      console.log("Posição inválida");
      return null;
    }

    const item = this.items[position];
    console.log(\`Get: \${item} da posição \${position}\`);
    return item;
  }

  // Retorna a posição de um elemento
  indexOf(element) {
    const index = this.items.indexOf(element);

    if (index === -1) {
      console.log(\`\${element} não encontrado na lista\`);
    } else {
      console.log(\`\${element} encontrado na posição \${index}\`);
    }

    return index;
  }

  // Verifica se a lista está vazia
  isEmpty() {
    const empty = this.items.length === 0;
    console.log(\`Lista está vazia? \${empty}\`);
    return empty;
  }

  // Retorna o tamanho da lista
  size() {
    const size = this.items.length;
    console.log(\`Tamanho da lista: \${size}\`);
    return size;
  }

  // Limpa a lista
  clear() {
    this.items = [];
    console.log("Lista limpa");
    return this.items;
  }

  // Imprime todos os elementos da lista
  print() {
    console.log("Lista atual:", this.items.join(" -> "));
  }
}

// Criando uma instância da lista
const list = new LinkedList();

// Testando operações básicas
list.add(10);
list.add(20);
list.add(30);
list.print();
list.insert(15, 1);
list.print();
list.remove(2);
list.print();
list.get(1);
list.indexOf(15);
list.indexOf(25);
list.size();
list.isEmpty();
`,

  encadeada: `// Implementação de Lista Encadeada
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.items = []; // Para visualização
  }

  // Atualiza a visualização
  updateVisualization() {
    this.items = [];
    let current = this.head;

    while(current) {
      this.items.push(current.data);
      current = current.next;
    }
  }

  // Adiciona um elemento no final da lista
  add(data) {
    // Cria um novo nó
    const newNode = new Node(data);

    // Se a lista estiver vazia, o novo nó será a cabeça
    if (!this.head) {
      this.head = newNode;
    } else {
      // Percorre até o último nó
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // Adiciona o novo nó como próximo do último
      current.next = newNode;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Add: \${data}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
  }

  // Insere um elemento em uma posição específica
  insert(data, position) {
    // Verifica se a posição é válida
    if (position < 0 || position > this.size) {
      console.log("Posição inválida");
      return false;
    }

    // Cria um novo nó
    const newNode = new Node(data);

    // Caso especial: inserção no início
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Encontra a posição de inserção
      let current = this.head;
      let previous = null;
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      // Insere o novo nó
      newNode.next = current;
      previous.next = newNode;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Insert: \${data} na posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
    return true;
  }

  // Remove um elemento de uma posição específica
  remove(position) {
    // Verifica se a posição é válida
    if (position < 0 || position >= this.size) {
      console.log("Posição inválida");
      return null;
    }

    let current = this.head;
    let previous = null;

    // Remoção do primeiro elemento
    if (position === 0) {
      this.head = current.next;
    } else {
      // Encontra a posição para remoção
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      // Remove o elemento
      previous.next = current.next;
    }

    const removedItem = current.data;
    this.size--;
    this.updateVisualization();
    console.log(\`Remove: \${removedItem} da posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);

    return removedItem;
  }

  // Retorna o elemento em uma posição específica
  get(position) {
    // Verifica se a posição é válida
    if (position < 0 || position >= this.size) {
      console.log("Posição inválida");
      return null;
    }

    let current = this.head;
    let index = 0;

    // Percorre até a posição desejada
    while (index < position) {
      current = current.next;
      index++;
    }

    console.log(\`Get: \${current.data} da posição \${position}\`);
    return current.data;
  }

  // Imprime todos os elementos da lista
  print() {
    let current = this.head;
    let elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    console.log("Lista atual:", elements.join(" -> "));
  }
}

// Testando a lista encadeada
const list = new LinkedList();

// Adiciona elementos na lista
list.add(10);
list.add(20);
list.add(30);
list.print();

// Insere elementos em posições específicas
list.insert(15, 1); // Entre 10 e 20
list.print();

// Remove elementos
list.remove(2); // Remove o 20
list.print();

// Obtém um elemento
list.get(1); // Obtém o segundo elemento (15)
`,

  duplamente: `// Implementação de Lista Duplamente Encadeada
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.items = []; // Para visualização
  }

  // Atualiza a visualização
  updateVisualization() {
    this.items = [];
    let current = this.head;

    while(current) {
      this.items.push(current.data);
      current = current.next;
    }
  }

  // Adiciona um elemento no final da lista
  add(data) {
    // Cria um novo nó
    const newNode = new Node(data);

    if (this.size === 0) {
      // Se a lista estiver vazia
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Adiciona no final
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Add: \${data}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
  }

  // Insere um elemento em uma posição específica
  insert(data, position) {
    // Verifica se a posição é válida
    if (position < 0 || position > this.size) {
      console.log("Posição inválida");
      return false;
    }

    const newNode = new Node(data);

    if (position === 0) {
      // Inserção no início
      if (this.size === 0) {
        // Lista vazia
        this.head = newNode;
        this.tail = newNode;
      } else {
        // Lista não vazia
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (position === this.size) {
      // Inserção no final (igual a add)
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      // Inserção no meio
      let current;

      // Otimização: decide se começa do início ou do final
      if (position < this.size / 2) {
        // Começa do início
        current = this.head;
        let index = 0;

        while (index < position) {
          current = current.next;
          index++;
        }
      } else {
        // Começa do final
        current = this.tail;
        let index = this.size - 1;

        while (index > position) {
          current = current.prev;
          index--;
        }
      }

      // Insere o novo nó antes do nó atual
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Insert: \${data} na posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
    return true;
  }

  // Remove um elemento de uma posição específica
  remove(position) {
    // Verifica se a posição é válida
    if (position < 0 || position >= this.size) {
      console.log("Posição inválida");
      return null;
    }

    let current;
    let removedItem;

    if (this.size === 1) {
      // Se há apenas um elemento
      removedItem = this.head.data;
      this.head = null;
      this.tail = null;
    } else if (position === 0) {
      // Remove do início
      removedItem = this.head.data;
      this.head = this.head.next;
      this.head.prev = null;
    } else if (position === this.size - 1) {
      // Remove do final
      removedItem = this.tail.data;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // Remove do meio
      // Otimização: decide se começa do início ou do final
      if (position < this.size / 2) {
        // Começa do início
        current = this.head;
        let index = 0;

        while (index < position) {
          current = current.next;
          index++;
        }
      } else {
        // Começa do final
        current = this.tail;
        let index = this.size - 1;

        while (index > position) {
          current = current.prev;
          index--;
        }
      }

      // Remove o nó atual
      removedItem = current.data;
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.size--;
    this.updateVisualization();
    console.log(\`Remove: \${removedItem} da posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
    return removedItem;
  }

  // Imprime todos os elementos da lista
  print() {
    let current = this.head;
    let elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    console.log("Lista atual:", elements.join(" ⟷ "));
  }

  // Imprime a lista de trás para frente
  printReverse() {
    let current = this.tail;
    let elements = [];

    while (current) {
      elements.push(current.data);
      current = current.prev;
    }

    console.log("Lista reversa:", elements.join(" ⟷ "));
  }
}

// Testando a lista duplamente encadeada
const list = new DoublyLinkedList();

// Adiciona elementos na lista
list.add(10);
list.add(20);
list.add(30);
list.print();

// Insere elementos em posições específicas
list.insert(15, 1); // Entre 10 e 20
list.print();

// Remove elementos
list.remove(2); // Remove o 20
list.print();

// Imprime de trás para frente
list.printReverse();
`,

  circular: `// Implementação de Lista Circular
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.items = []; // Para visualização
  }

  // Atualiza a visualização
  updateVisualization() {
    this.items = [];
    if (!this.head) return;

    let current = this.head;
    do {
      this.items.push(current.data);
      current = current.next;
    } while (current !== this.head);
  }

  // Adiciona um elemento no final da lista
  add(data) {
    // Cria um novo nó
    const newNode = new Node(data);

    // Se a lista estiver vazia
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; // Circular reference
    } else {
      // Encontra o último nó
      let current = this.head;

      while (current.next !== this.head) {
        current = current.next;
      }

      // Adiciona o novo nó
      current.next = newNode;
      newNode.next = this.head;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Add: \${data}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
  }

  // Insere um elemento em uma posição específica
  insert(data, position) {
    // Verifica se a posição é válida
    if (position < 0 || position > this.size) {
      console.log("Posição inválida");
      return false;
    }

    // Cria um novo nó
    const newNode = new Node(data);

    // Caso especial: lista vazia ou inserção na posição 0
    if (position === 0) {
      if (!this.head) {
        // Lista vazia
        this.head = newNode;
        newNode.next = this.head;
      } else {
        // Inserção no início
        let current = this.head;

        // Encontra o último nó
        while (current.next !== this.head) {
          current = current.next;
        }

        // Atualiza referências
        newNode.next = this.head;
        this.head = newNode;
        current.next = this.head;
      }
    } else {
      // Inserção no meio ou final
      let current = this.head;
      let previous = null;
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      // Insere o novo nó
      newNode.next = current;
      previous.next = newNode;
    }

    this.size++;
    this.updateVisualization();
    console.log(\`Insert: \${data} na posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
    return true;
  }

  // Remove um elemento de uma posição específica
  remove(position) {
    // Verifica se a posição é válida ou se a lista está vazia
    if (this.size === 0 || position < 0 || position >= this.size) {
      console.log("Posição inválida ou lista vazia");
      return null;
    }

    let current = this.head;
    let previous = null;
    let removedItem;

    // Remoção do primeiro elemento
    if (position === 0) {
      removedItem = this.head.data;

      if (this.size === 1) {
        // Se há apenas um elemento
        this.head = null;
      } else {
        // Encontra o último nó
        let temp = this.head;
        while (temp.next !== this.head) {
          temp = temp.next;
        }

        this.head = this.head.next;
        temp.next = this.head;
      }
    } else {
      // Remoção em outra posição
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      // Remove o nó
      removedItem = current.data;
      previous.next = current.next;
    }

    this.size--;
    this.updateVisualization();
    console.log(\`Remove: \${removedItem} da posição \${position}\`);
    console.log(\`Tamanho atual: \${this.size}\`);
    return removedItem;
  }

  // Imprime todos os elementos da lista
  print() {
    if (!this.head) {
      console.log("Lista vazia");
      return;
    }

    let current = this.head;
    let elements = [];

    do {
      elements.push(current.data);
      current = current.next;
    } while (current !== this.head);

    console.log("Lista atual:", elements.join(" -> ") + " -> (circular)");
  }

  // Percorre a lista circular 'steps' vezes
  traverse(steps) {
    if (!this.head) {
      console.log("Lista vazia");
      return;
    }

    let current = this.head;
    let path = [\`Início: \${current.data}\`];

    for (let i = 0; i < steps; i++) {
      current = current.next;
      path.push(\`Passo \${i+1}: \${current.data}\`);
    }

    console.log("Percurso circular:", path.join(" -> "));
    return current.data;
  }
}

// Testando a lista circular
const list = new CircularLinkedList();

// Adiciona elementos na lista
list.add(10);
list.add(20);
list.add(30);
list.add(40);
list.print();

// Insere um elemento
list.insert(25, 2);
list.print();

// Remove um elemento
list.remove(1);
list.print();

// Demonstra a natureza circular da lista, percorrendo-a várias vezes
list.traverse(8);
`,

  mesclagem: `// Mesclagem de duas listas ordenadas em uma nova lista ordenada
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.items = []; // Para visualização
  }

  // Atualiza a visualização
  updateVisualization() {
    this.items = [];
    let current = this.head;

    while(current) {
      this.items.push(current.data);
      current = current.next;
    }
  }

  // Adiciona um elemento no final da lista
  add(data) {
    // Cria um novo nó
    const newNode = new Node(data);

    // Se a lista estiver vazia, o novo nó será a cabeça
    if (!this.head) {
      this.head = newNode;
    } else {
      // Percorre até o último nó
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // Adiciona o novo nó como próximo do último
      current.next = newNode;
    }

    this.size++;
    this.updateVisualization();
  }

  // Imprime todos os elementos da lista
  print(name) {
    let current = this.head;
    let elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    console.log(\`\${name || 'Lista'}:\`, elements.join(" -> "));
  }
}

// Função para mesclar duas listas ordenadas
function mergeSortedLists(list1, list2) {
  const mergedList = new LinkedList();

  // Ponteiros para percorrer as duas listas
  let current1 = list1.head;
  let current2 = list2.head;

  console.log("Iniciando mesclagem de listas ordenadas...");

  // Enquanto ambas as listas tiverem elementos
  while (current1 !== null && current2 !== null) {
    // Compara os elementos atuais das duas listas
    if (current1.data <= current2.data) {
      mergedList.add(current1.data);
      console.log(\`Adicionando \${current1.data} da primeira lista\`);
      current1 = current1.next;
    } else {
      mergedList.add(current2.data);
      console.log(\`Adicionando \${current2.data} da segunda lista\`);
      current2 = current2.next;
    }
  }

  // Se ainda houver elementos na primeira lista
  while (current1 !== null) {
    mergedList.add(current1.data);
    console.log(\`Adicionando \${current1.data} da primeira lista (restante)\`);
    current1 = current1.next;
  }

  // Se ainda houver elementos na segunda lista
  while (current2 !== null) {
    mergedList.add(current2.data);
    console.log(\`Adicionando \${current2.data} da segunda lista (restante)\`);
    current2 = current2.next;
  }

  console.log("Mesclagem concluída!");
  return mergedList;
}

// Criando e preenchendo a primeira lista ordenada
const list1 = new LinkedList();
list1.add(1);
list1.add(3);
list1.add(5);
list1.add(7);
list1.print("Lista 1");

// Criando e preenchendo a segunda lista ordenada
const list2 = new LinkedList();
list2.add(2);
list2.add(4);
list2.add(6);
list2.add(8);
list2.print("Lista 2");

// Mesclando as duas listas
const mergedList = mergeSortedLists(list1, list2);
mergedList.print("Lista Mesclada");

// Testando com uma situação diferente
const listA = new LinkedList();
listA.add(1);
listA.add(2);
listA.add(9);
listA.add(10);
listA.print("Lista A");

const listB = new LinkedList();
listB.add(3);
listB.add(4);
listB.add(5);
listB.add(8);
listB.print("Lista B");

const mergedListAB = mergeSortedLists(listA, listB);
mergedListAB.print("Lista A+B Mesclada");
`,
};
