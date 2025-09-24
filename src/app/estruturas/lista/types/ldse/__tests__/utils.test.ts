// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldse\__tests__\utils.test.ts
import { describe, it, expect } from 'vitest';

// Testes para funções utilitárias relacionadas a LDSE
describe('LDSE Utils', () => {
  describe('Validação de entrada', () => {
    it('deve validar se um valor é número', () => {
      const isNumber = (value: any): boolean => !isNaN(Number(value));

      expect(isNumber(123)).toBe(true);
      expect(isNumber('abc')).toBe(false);
    });

    it('deve validar se um valor é string válida', () => {
      const isValidString = (value: any): boolean =>
        typeof value === 'string' && value.trim().length > 0;

      expect(isValidString('teste')).toBe(true);
      expect(isValidString(' teste ')).toBe(true);
      expect(isValidString('')).toBe(false);
      expect(isValidString('   ')).toBe(false);
      expect(isValidString(123)).toBe(false);
      expect(isValidString(null)).toBe(false);
    });
  });

  describe('Formatação de dados', () => {
    it('deve formatar lista para exibição', () => {
      const formatListDisplay = (items: any[]): string => {
        if (items.length === 0) return 'Lista vazia';
        return items.join(' -> ') + ' -> null';
      };

      expect(formatListDisplay([])).toBe('Lista vazia');
      expect(formatListDisplay(['A'])).toBe('A -> null');
      expect(formatListDisplay(['A', 'B', 'C'])).toBe('A -> B -> C -> null');
    });

    it('deve gerar IDs únicos para nós', () => {
      let idCounter = 0;
      const generateNodeId = (): number => ++idCounter;

      const id1 = generateNodeId();
      const id2 = generateNodeId();
      const id3 = generateNodeId();

      expect(id1).toBe(1);
      expect(id2).toBe(2);
      expect(id3).toBe(3);
      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
    });
  });

  describe('Cálculos de complexidade', () => {
    it('deve calcular complexidade de inserção no início', () => {
      const getInsertBeginComplexity = (listSize: number): string => 'O(1)';

      expect(getInsertBeginComplexity(0)).toBe('O(1)');
      expect(getInsertBeginComplexity(100)).toBe('O(1)');
      expect(getInsertBeginComplexity(1000)).toBe('O(1)');
    });

    it('deve calcular complexidade de inserção no fim', () => {
      const getInsertEndComplexity = (hasLastPointer: boolean): string =>
        hasLastPointer ? 'O(1)' : 'O(n)';

      expect(getInsertEndComplexity(true)).toBe('O(1)');
      expect(getInsertEndComplexity(false)).toBe('O(n)');
    });

    it('deve calcular complexidade de busca', () => {
      const getSearchComplexity = (
        targetPosition: number,
        listSize: number,
      ): string => {
        const worstCase = listSize;
        const averageCase = Math.ceil(listSize / 2);

        if (targetPosition === 1) return 'O(1) - Melhor caso';
        if (targetPosition === worstCase) return 'O(n) - Pior caso';
        return 'O(n) - Caso médio';
      };

      expect(getSearchComplexity(1, 10)).toBe('O(1) - Melhor caso');
      expect(getSearchComplexity(10, 10)).toBe('O(n) - Pior caso');
      expect(getSearchComplexity(5, 10)).toBe('O(n) - Caso médio');
    });
  });

  describe('Validação de estrutura', () => {
    interface Node {
      value: any;
      next: Node | null;
    }

    it('deve validar se uma estrutura é uma lista válida', () => {
      const isValidList = (head: Node | null): boolean => {
        if (!head) return true; // Lista vazia é válida

        const visited = new Set<Node>();
        let current: Node | null = head;

        while (current) {
          if (visited.has(current)) return false; // Detecta ciclo
          visited.add(current);
          current = current.next;
        }

        return true;
      };

      // Lista válida
      const node3: Node = { value: 'C', next: null };
      const node2: Node = { value: 'B', next: node3 };
      const node1: Node = { value: 'A', next: node2 };

      expect(isValidList(null)).toBe(true);
      expect(isValidList(node1)).toBe(true);

      // Lista com ciclo (inválida)
      node3.next = node1; // Cria ciclo
      expect(isValidList(node1)).toBe(false);
    });

    it('deve contar número de nós na lista', () => {
      interface SimpleNode {
        value: any;
        next: SimpleNode | null;
      }

      const countNodes = (head: SimpleNode | null): number => {
        let count = 0;
        let current: SimpleNode | null = head;

        while (current) {
          count++;
          current = current.next;
        }

        return count;
      };

      expect(countNodes(null)).toBe(0);

      const node1: SimpleNode = { value: 'A', next: null };
      expect(countNodes(node1)).toBe(1);

      const node2: SimpleNode = { value: 'B', next: null };
      node1.next = node2;
      expect(countNodes(node1)).toBe(2);
    });
  });

  describe('Operações auxiliares', () => {
    it('deve verificar se lista está vazia', () => {
      const isEmpty = (head: any): boolean =>
        head === null || head === undefined;

      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty({ value: 'A', next: null })).toBe(false);
    });

    it('deve encontrar último nó da lista', () => {
      interface ListNode {
        value: any;
        next: ListNode | null;
      }

      const findLastNode = (head: ListNode | null): ListNode | null => {
        if (!head) return null;

        let current: ListNode = head;
        while (current.next) {
          current = current.next;
        }

        return current;
      };

      expect(findLastNode(null)).toBeNull();

      const node1: ListNode = { value: 'A', next: null };
      expect(findLastNode(node1)).toBe(node1);

      const node2: ListNode = { value: 'B', next: null };
      node1.next = node2;
      expect(findLastNode(node1)).toBe(node2);
    });

    it('deve converter array para lista encadeada', () => {
      interface ArrayNode {
        value: any;
        next: ArrayNode | null;
      }

      const arrayToLinkedList = (arr: any[]): ArrayNode | null => {
        if (arr.length === 0) return null;

        const head: ArrayNode = { value: arr[0], next: null };
        let current = head;

        for (let i = 1; i < arr.length; i++) {
          current.next = { value: arr[i], next: null };
          current = current.next;
        }

        return head;
      };

      expect(arrayToLinkedList([])).toBeNull();

      const list1 = arrayToLinkedList(['A']);
      expect(list1?.value).toBe('A');
      expect(list1?.next).toBeNull();

      const list2 = arrayToLinkedList(['A', 'B', 'C']);
      expect(list2?.value).toBe('A');
      expect(list2?.next?.value).toBe('B');
      expect(list2?.next?.next?.value).toBe('C');
      expect(list2?.next?.next?.next).toBeNull();
    });

    it('deve converter lista encadeada para array', () => {
      interface ChainNode {
        value: any;
        next: ChainNode | null;
      }

      const linkedListToArray = (head: ChainNode | null): any[] => {
        const result: any[] = [];
        let current: ChainNode | null = head;

        while (current) {
          result.push(current.value);
          current = current.next;
        }

        return result;
      };

      expect(linkedListToArray(null)).toEqual([]);

      const node3: ChainNode = { value: 'C', next: null };
      const node2: ChainNode = { value: 'B', next: node3 };
      const node1: ChainNode = { value: 'A', next: node2 };

      expect(linkedListToArray(node1)).toEqual(['A', 'B', 'C']);
    });
  });

  describe('Simulação de operações', () => {
    it('deve simular inserção de elemento', () => {
      const simulateInsert = (
        currentList: string[],
        value: string,
        position: 'start' | 'end',
      ): string[] => {
        const newList = [...currentList];

        if (position === 'start') {
          newList.unshift(value);
        } else {
          newList.push(value);
        }

        return newList;
      };

      expect(simulateInsert([], 'A', 'start')).toEqual(['A']);
      expect(simulateInsert(['B'], 'A', 'start')).toEqual(['A', 'B']);
      expect(simulateInsert(['A'], 'B', 'end')).toEqual(['A', 'B']);
      expect(simulateInsert(['A', 'B'], 'C', 'end')).toEqual(['A', 'B', 'C']);
    });

    it('deve simular remoção de elemento', () => {
      const simulateRemove = (
        currentList: string[],
        position: 'start' | 'end',
      ): string[] => {
        if (currentList.length === 0) return currentList;

        const newList = [...currentList];

        if (position === 'start') {
          newList.shift();
        } else {
          newList.pop();
        }

        return newList;
      };

      expect(simulateRemove([], 'start')).toEqual([]);
      expect(simulateRemove(['A'], 'start')).toEqual([]);
      expect(simulateRemove(['A', 'B'], 'start')).toEqual(['B']);
      expect(simulateRemove(['A', 'B'], 'end')).toEqual(['A']);
      expect(simulateRemove(['A', 'B', 'C'], 'end')).toEqual(['A', 'B']);
    });
  });
});
