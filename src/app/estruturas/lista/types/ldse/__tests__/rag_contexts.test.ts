import { describe, it, expect } from 'vitest';
import {
  RAG_CONTEXTS,
  generateRAGPrompt,
  type ChallengeContext,
} from '../rag_contexts';

describe('RAG_CONTEXTS', () => {
  it('deve conter o contexto para Lista Dinâmica Simplesmente Encadeada', () => {
    expect(RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA).toBeDefined();
  });

  it('deve ter todas as propriedades obrigatórias no contexto LDSE', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(context.title).toBe(
      'Implementar Lista Dinâmica Simplesmente Encadeada',
    );
    expect(context.objective).toContain(
      'Lista Dinâmica Simplesmente Encadeada em Python',
    );
    expect(Array.isArray(context.requirements)).toBe(true);
    expect(context.requirements.length).toBeGreaterThan(0);
  });

  it('deve ter requisitos específicos para LDSE', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(context.requirements).toContain(
      'Criar uma classe No com atributos dado e proximo',
    );
    expect(context.requirements).toContain(
      'Criar uma classe ListaDinamicaSimplesmenteEncadeada com ponteiros primeiro e ultimo',
    );
    expect(context.requirements).toContain(
      'Implementar método inserir_inicio(dado)',
    );
    expect(context.requirements).toContain(
      'Implementar método inserir_fim(dado)',
    );
    expect(context.requirements).toContain(
      'Implementar método remover_inicio()',
    );
    expect(context.requirements).toContain('Implementar método remover_fim()');
    expect(context.requirements).toContain('Implementar método exibir()');
    expect(context.requirements).toContain(
      'Tratar casos especiais (lista vazia, um único elemento)',
    );
  });

  it('deve ter exemplos de uso', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(Array.isArray(context.examples)).toBe(true);
    expect(context.examples!.length).toBeGreaterThan(0);
    expect(context.examples).toContain(
      'lista = ListaDinamicaSimplesmenteEncadeada()',
    );
    expect(context.examples).toContain('lista.inserir_inicio(10)');
    expect(context.examples).toContain('lista.inserir_fim(20)');
  });

  it('deve ter erros comuns documentados', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(Array.isArray(context.commonMistakes)).toBe(true);
    expect(context.commonMistakes!.length).toBeGreaterThan(0);
    expect(context.commonMistakes).toContain(
      'Não atualizar o ponteiro ultimo ao inserir o primeiro elemento',
    );
    expect(context.commonMistakes).toContain(
      'Não verificar se a lista está vazia antes de remover',
    );
  });

  it('deve ter critérios de avaliação', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(Array.isArray(context.evaluationCriteria)).toBe(true);
    expect(context.evaluationCriteria!.length).toBeGreaterThan(0);
    expect(context.evaluationCriteria).toContain(
      'Implementação correta da classe No',
    );
    expect(context.evaluationCriteria).toContain(
      'Gerenciamento adequado dos ponteiros primeiro e ultimo',
    );
  });
});

describe('generateRAGPrompt', () => {
  const mockContext: ChallengeContext = {
    title: 'Teste de Lista',
    objective: 'Implementar uma lista de teste',
    requirements: [
      'Criar classe Node',
      'Implementar inserção',
      'Implementar remoção',
    ],
    examples: ['lista.inserir(1)', 'lista.remover()'],
    commonMistakes: ['Não verificar lista vazia', 'Não atualizar ponteiros'],
    evaluationCriteria: [
      'Implementação correta',
      'Tratamento de casos especiais',
    ],
  };

  const mockUserCode = `
class No:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None

class Lista:
    def __init__(self):
        self.primeiro = None
    `;

  it('deve gerar um prompt com todas as seções obrigatórias', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('## CONTEXTO DO DESAFIO');
    expect(prompt).toContain('**Título:** Teste de Lista');
    expect(prompt).toContain('**Objetivo:** Implementar uma lista de teste');
    expect(prompt).toContain('**Requisitos técnicos:**');
    expect(prompt).toContain('## CÓDIGO IMPLEMENTADO PELO ESTUDANTE');
    expect(prompt).toContain('## TAREFA DE ANÁLISE');
  });

  it('deve incluir todos os requisitos formatados', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('- Criar classe Node');
    expect(prompt).toContain('- Implementar inserção');
    expect(prompt).toContain('- Implementar remoção');
  });

  it('deve incluir exemplos quando fornecidos', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('**Exemplos de uso esperado:**');
    expect(prompt).toContain('`lista.inserir(1)`');
    expect(prompt).toContain('`lista.remover()`');
  });

  it('deve incluir erros comuns quando fornecidos', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('**Erros comuns a observar:**');
    expect(prompt).toContain('- Não verificar lista vazia');
    expect(prompt).toContain('- Não atualizar ponteiros');
  });

  it('deve incluir critérios de avaliação quando fornecidos', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('**Critérios de avaliação:**');
    expect(prompt).toContain('- Implementação correta');
    expect(prompt).toContain('- Tratamento de casos especiais');
  });

  it('deve incluir o código do usuário formatado', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('```python');
    expect(prompt).toContain('class No:');
    expect(prompt).toContain('class Lista:');
    expect(prompt).toContain('```');
  });

  it('deve incluir todas as perguntas de análise', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('1. **Conformidade com requisitos**');
    expect(prompt).toContain('2. **Implementação técnica**');
    expect(prompt).toContain('3. **Casos especiais**');
    expect(prompt).toContain('4. **Erros comuns**');
    expect(prompt).toContain('5. **Boas práticas**');
    expect(prompt).toContain('6. **Sugestões de melhoria**');
  });

  it('deve incluir os emojis e seções de feedback', () => {
    const prompt = generateRAGPrompt(mockContext, mockUserCode);

    expect(prompt).toContain('✅ **Pontos positivos**');
    expect(prompt).toContain('⚠️ **Pontos de atenção**');
    expect(prompt).toContain('🚀 **Sugestões avançadas**');
    expect(prompt).toContain('💡 **Dicas educativas**');
  });

  it('deve funcionar com contexto mínimo (sem campos opcionais)', () => {
    const minimalContext: ChallengeContext = {
      title: 'Teste Mínimo',
      objective: 'Teste objetivo',
      requirements: ['Req 1'],
    };

    const prompt = generateRAGPrompt(minimalContext, 'print("test")');

    expect(prompt).toContain('**Título:** Teste Mínimo');
    expect(prompt).toContain('**Objetivo:** Teste objetivo');
    expect(prompt).toContain('- Req 1');
    expect(prompt).not.toContain('**Exemplos de uso esperado:**');
    expect(prompt).not.toContain('**Erros comuns a observar:**');
    expect(prompt).not.toContain('**Critérios de avaliação:**');
  });

  it('deve lidar com código vazio', () => {
    const prompt = generateRAGPrompt(mockContext, '');

    expect(prompt).toContain('```python');
    expect(prompt).toContain('```');
    expect(prompt).toContain('## CÓDIGO IMPLEMENTADO PELO ESTUDANTE');
  });
});

describe('ChallengeContext interface', () => {
  it('deve aceitar contexto com todas as propriedades', () => {
    const fullContext: ChallengeContext = {
      title: 'Teste Completo',
      objective: 'Implementar estrutura completa',
      requirements: ['Req 1', 'Req 2'],
      examples: ['Ex 1', 'Ex 2'],
      commonMistakes: ['Erro 1', 'Erro 2'],
      evaluationCriteria: ['Critério 1', 'Critério 2'],
    };

    expect(fullContext.title).toBe('Teste Completo');
    expect(fullContext.examples).toHaveLength(2);
    expect(fullContext.commonMistakes).toHaveLength(2);
    expect(fullContext.evaluationCriteria).toHaveLength(2);
  });

  it('deve aceitar contexto com apenas propriedades obrigatórias', () => {
    const minimalContext: ChallengeContext = {
      title: 'Teste Mínimo',
      objective: 'Teste',
      requirements: ['Req 1'],
    };

    expect(minimalContext.title).toBe('Teste Mínimo');
    expect(minimalContext.examples).toBeUndefined();
    expect(minimalContext.commonMistakes).toBeUndefined();
    expect(minimalContext.evaluationCriteria).toBeUndefined();
  });
});
