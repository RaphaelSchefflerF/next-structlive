export interface ChallengeContext {
    title: string;
    objective: string;
    requirements: string[];
    examples?: string[];
    commonMistakes?: string[];
    evaluationCriteria?: string[];
}

// Contextos RAG para diferentes desafios de estruturas de dados
export const RAG_CONTEXTS = {
    LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA: {
        title: 'Implementar Lista Dinâmica Simplesmente Encadeada',
        objective:
            'Implemente uma Lista Dinâmica Simplesmente Encadeada em Python com as operações básicas: inserir no início, inserir no fim, remover do início, remover do fim, e exibir a lista.',
        requirements: [
            'Criar uma classe No com atributos dado e proximo',
            'Criar uma classe ListaDinamicaSimplesmenteEncadeada com ponteiros primeiro e ultimo',
            'Implementar método inserir_inicio(dado)',
            'Implementar método inserir_fim(dado)',
            'Implementar método remover_inicio()',
            'Implementar método remover_fim()',
            'Implementar método exibir()',
            'Tratar casos especiais (lista vazia, um único elemento)',
        ],
        examples: [
            'lista = ListaDinamicaSimplesmenteEncadeada()',
            'lista.inserir_inicio(10)',
            'lista.inserir_fim(20)',
            'lista.exibir() # Deve mostrar: 10 -> 20',
            'lista.remover_inicio()',
            'lista.exibir() # Deve mostrar: 20',
        ],
        commonMistakes: [
            'Não atualizar o ponteiro ultimo ao inserir o primeiro elemento',
            'Não verificar se a lista está vazia antes de remover',
            'Não atualizar os ponteiros corretamente ao remover o último elemento',
            'Vazamentos de memória ao não limpar referências',
        ],
        evaluationCriteria: [
            'Implementação correta da classe No',
            'Gerenciamento adequado dos ponteiros primeiro e ultimo',
            'Tratamento correto de casos especiais',
            'Eficiência das operações O(1) para inserção/remoção no início',
            'Clareza e organização do código',
        ],
    },
};

// Função para gerar prompt RAG contextualizado
export function generateRAGPrompt(
    context: ChallengeContext,
    userCode: string,
): string {
    return `
## CONTEXTO DO DESAFIO
**Título:** ${context.title}

**Objetivo:** ${context.objective}

**Requisitos técnicos:**
${context.requirements.map((req) => `- ${req}`).join('\n')}

${
    context.examples
        ? `
**Exemplos de uso esperado:**
${context.examples.map((ex) => `\`${ex}\``).join('\n')}
`
        : ''
}

${
    context.commonMistakes
        ? `
**Erros comuns a observar:**
${context.commonMistakes.map((mistake) => `- ${mistake}`).join('\n')}
`
        : ''
}

${
    context.evaluationCriteria
        ? `
**Critérios de avaliação:**
${context.evaluationCriteria.map((criteria) => `- ${criteria}`).join('\n')}
`
        : ''
}

## CÓDIGO IMPLEMENTADO PELO ESTUDANTE
\`\`\`python
${userCode}
\`\`\`

## TAREFA DE ANÁLISE
Analise o código fornecido considerando:
1. **Conformidade com requisitos**: O código atende aos requisitos especificados?
2. **Implementação técnica**: A implementação está correta e eficiente?
3. **Casos especiais**: Como o código trata situações especiais (lista vazia, um elemento)?
4. **Erros comuns**: O código evita os erros comuns mencionados?
5. **Boas práticas**: O código segue boas práticas de programação?
6. **Sugestões de melhoria**: Quais melhorias específicas podem ser feitas?

Forneça uma análise detalhada, construtiva e educativa em português, incluindo:
- ✅ **Pontos positivos** identificados
- ⚠️ **Pontos de atenção** ou melhorias necessárias
- 🚀 **Sugestões avançadas** para otimização
- 💡 **Dicas educativas** relacionadas ao conceito
`;
}
