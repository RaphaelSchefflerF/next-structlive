"use server";

import OpenAI from "openai";

const client = new OpenAI(
	{
		apiKey: process.env.OPENAI_API_KEY,
		timeout: 10000, // 10 seconds
	}
);

function getAiAnalysis(code:string) {
	return client.chat.completions.create({
		model: "gpt-4.1",
		messages: [
			{
				role: "system",
				content: "Você é um especialista em estruturas de dados e algoritmos. e vai analisar o código fornecido.",
			},
			{
				role: "user",
				content: code,
			},
		],
	});
}

export async function analyzeCode(code: string) {
	try {
		const response = await getAiAnalysis(code);
		return response.choices[0].message.content;
	} catch (error) {
		console.error("Erro ao analisar o código:", error);
		throw new Error("Não foi possível analisar o código.");
	}
}
