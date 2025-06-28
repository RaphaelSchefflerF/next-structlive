import { describe, it, expect } from 'vitest';
import { generateRAGPrompt, RAG_CONTEXTS } from '../rag_contexts';

describe('RAG Contexts', () => {
  it('deve conter contexto para lista dinâmica simplesmente encadeada', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    expect(context).toBeDefined();
    expect(context.title).toContain('Lista Dinâmica Simplesmente Encadeada');
    expect(context.requirements).toHaveLength(8);
    expect(context.examples).toHaveLength(5);
  });

  it('deve gerar prompt RAG corretamente', () => {
    const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;
    const userCode = `
class No:
    def
