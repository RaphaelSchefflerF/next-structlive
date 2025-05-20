export const examples = {
  básico: `// Implementação básica de Pilha usando Array
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    console.log(\`Push: \${element}\`);
    return this.items;
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Underflow! A pilha está vazia");
      return "Underflow";
    }
    const item = this.items.pop();
    console.log(\`Pop: \${item}\`);
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      console.log("A pilha está vazia");
      return null;
    }
    const item = this.items[this.items.length - 1];
    console.log(\`Peek: \${item}\`);
    return item;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    console.log(\`Tamanho da pilha: \${this.items.length}\`);
    return this.items.length;
  }

  clear() {
    this.items = [];
    console.log("Pilha limpa");
    return this.items;
  }
}

// Criando uma instância da pilha
const stack = new Stack();

// Testando operações básicas
stack.push(10);
stack.push(20);
stack.push(30);
stack.peek();
stack.size();
stack.pop();
stack.size();
stack.pop();
stack.pop();
stack.pop(); // Tentando remover de uma pilha vazia
`,
  conversãoBinária: `// Conversão de decimal para binário usando pilha
function decimalToBinary(decNumber) {
  const stack = [];
  let number = decNumber;
  let remainder;
  let binaryString = "";

  if (number === 0) {
    return "0";
  }

  while (number > 0) {
    remainder = Math.floor(number % 2);
    stack.push(remainder);
    number = Math.floor(number / 2);
  }

  console.log(\`Pilha após divisões sucessivas: [\${stack.join(", ")}]\`);

  while (stack.length > 0) {
    binaryString += stack.pop().toString();
  }

  return binaryString;
}

// Testando a função com diferentes números
const número = 42;
const binário = decimalToBinary(número);
console.log(\`\${número} em binário é: \${binário}\`);

const número2 = 255;
const binário2 = decimalToBinary(número2);
console.log(\`\${número2} em binário é: \${binário2}\`);
`,
  inversãoString: `// Usando pilha para inverter uma string
function inverterString(str) {
  // Criando uma pilha vazia
  const stack = [];

  // Adicionando cada caractere da string na pilha
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
    console.log(\`Push: \${str[i]}\`);
  }

  // Criando uma string vazia para armazenar o resultado
  let stringInvertida = "";

  // Removendo cada caractere da pilha e adicionando-o à string invertida
  while (stack.length > 0) {
    const char = stack.pop();
    console.log(\`Pop: \${char}\`);
    stringInvertida += char;
  }

  return stringInvertida;
}

// Testando a função com diferentes strings
const original = "Estrutura de dados";
const invertida = inverterString(original);
console.log(\`Original: \${original}\`);
console.log(\`Invertida: \${invertida}\`);
`,
  validaçãoParênteses: `// Validação de expressão com parênteses equilibrados
function validarParenteses(expressao) {
  const stack = [];

  // Mapeamento de parênteses de fechamento para seus parênteses de abertura correspondentes
  const parentesesMap = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  // Percorrendo cada caractere na expressão
  for (let i = 0; i < expressao.length; i++) {
    const char = expressao[i];

    // Se for um parêntese de abertura, colocamos na pilha
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
      console.log(\`Push: \${char}\`);
    }
    // Se for um parêntese de fechamento
    else if (char === ')' || char === '}' || char === ']') {
      // Se a pilha estiver vazia, não há correspondente
      if (stack.length === 0) {
        console.log(\`Erro: Encontrado \${char} sem abertura correspondente\`);
        return false;
      }

      // Pop da pilha e verifica se corresponde ao parentese de fechamento
      const top = stack.pop();
      console.log(\`Pop e comparando: \${top} com \${char}\`);

      if (parentesesMap[char] !== top) {
        console.log(\`Erro: \${char} não corresponde a \${top}\`);
        return false;
      }
    }
  }

  // Se a pilha não estiver vazia, então existem parênteses não fechados
  if (stack.length !== 0) {
    console.log(\`Erro: Existem parênteses não fechados: \${stack.join(', ')}\`);
    return false;
  }

  return true;
}

// Testando com diferentes expressões
const exp1 = "((a + b) * (c - d))";
console.log(\`\${exp1} é válido? \${validarParenteses(exp1)}\`);

const exp2 = "({[a + b]})";
console.log(\`\${exp2} é válido? \${validarParenteses(exp2)}\`);

const exp3 = "([a + b)]";
console.log(\`\${exp3} é válido? \${validarParenteses(exp3)}\`);
`,
  undoRedo: `// Implementação simples de funcionalidade Undo/Redo usando pilhas
class TextEditor {
  constructor() {
    this.text = "";
    this.undoStack = [];
    this.redoStack = [];
  }

  // Adiciona texto
  write(newText) {
    this.undoStack.push(this.text);
    this.text += newText;
    this.redoStack = [];  // Limpa a pilha de redo após uma nova operação
    console.log(\`Texto atual: "\${this.text}"\`);
  }

  // Desfaz a última operação
  undo() {
    if (this.undoStack.length === 0) {
      console.log("Nada para desfazer");
      return;
    }

    this.redoStack.push(this.text);
    this.text = this.undoStack.pop();
    console.log(\`Desfez para: "\${this.text}"\`);
  }

  // Refaz a última operação desfeita
  redo() {
    if (this.redoStack.length === 0) {
      console.log("Nada para refazer");
      return;
    }

    this.undoStack.push(this.text);
    this.text = this.redoStack.pop();
    console.log(\`Refez para: "\${this.text}"\`);
  }
}

// Testando o editor de texto
const editor = new TextEditor();
editor.write("Olá ");
editor.write("mundo!");
editor.undo();
editor.redo();
editor.write(" Como vai?");
editor.undo();
editor.undo();
editor.redo();
`,
};
