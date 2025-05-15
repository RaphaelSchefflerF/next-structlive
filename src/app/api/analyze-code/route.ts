import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa a API do Google Generative AI (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

export async function POST(request: Request) {
  try {
    // Extrai o código do corpo da requisição
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código inválido' }, { status: 400 });
    }

    // Configura o modelo Gemini
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    // Prompt para análise de código
    const prompt = `
      Analise o seguinte código JavaScript relacionado a implementação de pilha (stack).

      Código:
      \`\`\`javascript
      ${code}
      \`\`\`

      Por favor, forneça uma análise detalhada incluindo:
      1. Se a implementação está correta
      2. Possíveis otimizações de desempenho
      3. Boas práticas de codificação que foram ou não seguidas
      4. Sugestões para melhorar o código
      5. Complexidade de tempo e espaço das operações principais

      Mantenha sua resposta clara, concisa e focada na implementação de pilha.
    `;

    // Gera a resposta da IA
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Retorna a análise
    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error('Erro ao analisar código:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a análise' },
      { status: 500 },
    );
  }
}
