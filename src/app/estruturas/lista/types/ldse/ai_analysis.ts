'use server';

import OpenAI from 'openai';
import {
    ChallengeContext,
    generateRAGPrompt,
    RAG_CONTEXTS,
} from './rag_contexts';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 10000, // 10 seconds
});

function getAiAnalysisWithRAG(context: ChallengeContext, userCode: string) {
    const ragPrompt = generateRAGPrompt(context, userCode);

    return client.chat.completions.create({
        model: 'o4-mini',
        messages: [
            {
                role: 'system',
                content:
                    'Você é um professor especialista em estruturas de dados e algoritmos. Sua função é analisar e fornecer feedback construtivo sobre implementações de estruturas de dados, sempre considerando o contexto educacional e os requisitos específicos do exercício. Seja detalhado, educativo e construtivo em suas análises.',
            },
            {
                role: 'user',
                content: ragPrompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 2000,
    });
}

export async function analyzeCode(
    code: string,
    context?: Partial<ChallengeContext>,
) {
    try {
        // Contexto padrão para Lista Dinâmica Simplesmente Encadeada
        const defaultContext =
            RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

        // Mescla o contexto fornecido com o padrão
        const finalContext: ChallengeContext = {
            ...defaultContext,
            ...context,
        };

        const response = await getAiAnalysisWithRAG(finalContext, code);
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao analisar o código:', error);
        throw new Error('Não foi possível analisar o código.');
    }
}
