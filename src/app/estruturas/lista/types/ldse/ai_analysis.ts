'use server';

import { GoogleGenAI } from '@google/genai';
import {
  ChallengeContext,
  generateRAGPrompt,
  RAG_CONTEXTS,
} from './rag_contexts';

// Configura a API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY2,
});

async function getAiAnalysisWithRAG(
  context: ChallengeContext,
  userCode: string,
) {
  const ragPrompt = generateRAGPrompt(context, userCode);

  // Cria a mensagem com o sistema e o prompt RAG
  const systemPrompt =
    'Você é um professor especialista em estruturas de dados e algoritmos. Sua função é analisar e fornecer feedback construtivo sobre implementações de estruturas de dados, sempre considerando o contexto educacional e os requisitos específicos do exercício. Seja detalhado, educativo e construtivo em suas análises.';

  // Combina os prompts
  const fullPrompt = `${systemPrompt}\n\n${ragPrompt}`;

  // Gera o conteúdo
  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  return result.text;
}

export async function analyzeCode(
  code: string,
  context?: Partial<ChallengeContext>,
) {
  try {
    // Contexto padrão para Lista Dinâmica Simplesmente Encadeada
    const defaultContext = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

    // Mescla o contexto fornecido com o padrão
    const finalContext: ChallengeContext = {
      ...defaultContext,
      ...context,
    };

    const text = await getAiAnalysisWithRAG(finalContext, code);
    return text;
  } catch (error) {
    console.error('Erro ao analisar o código:', error);
    throw new Error('Não foi possível analisar o código.');
  }
}
