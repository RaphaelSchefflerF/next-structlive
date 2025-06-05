// worker.ts

require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const amqp = require("amqplib");
const { createClient } = require("@supabase/supabase-js");
const axios = require("axios");

async function gerarFeedbackComGemini(prompt: string): Promise<string> {
  const API_KEY = process.env.GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await axios.post(endpoint, payload, {
    headers: { "Content-Type": "application/json" },
  });

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "Não foi possível gerar a explicação.";
}

type ConsumeMessage = {
  content: Buffer;
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function handleMessage(msg: ConsumeMessage, channel: any) {
  if (!msg) return;

  try {
    const content = JSON.parse(msg.content.toString());
    const { atividadeId, usuarioId, alternativaMarcada } = content;

    const { data: atividade, error: atividadeError } = await supabase
      .from("atividades")
      .select("titulo, descricao, estrutura, alternativas, feedback_modelo")
      .eq("id", atividadeId)
      .single();

    if (atividadeError || !atividade) {
      console.error("❌ Erro ao buscar atividade:", atividadeError?.message);
      return;
    }

    const alternativaEscolhida = atividade.alternativas.find(
      (alt: any) => alt.texto === alternativaMarcada
    );

    const acertou = alternativaEscolhida?.correta === true;

    // 🔤 Prompt personalizado
    const prompt = `Explique por que a alternativa "${alternativaMarcada}" está ${
      acertou ? "correta" : "incorreta"
    }, com base na seguinte questão:

Título: ${atividade.titulo}
Descrição: ${atividade.descricao}
Estrutura: ${atividade.estrutura || "Não informada"}

Alternativas:
${atividade.alternativas
  .map((a: any) => `- (${a.correta ? "✔️" : "❌"}) ${a.texto}`)
  .join("\n")}
`;

    // 🧠 Geração do feedback via Gemini
    const feedbackGerado = await gerarFeedbackComGemini(prompt);

    const feedback = feedbackGerado;

    const { error: upsertError } = await supabase
      .from("respostas_usuario")
      .upsert(
        [
          {
            atividade_id: atividadeId,
            usuario_id: usuarioId,
            alternativa_marcada: alternativaMarcada,
            correta: acertou,
            feedback,
            updated_at: new Date().toISOString(),
          },
        ],
        {
          onConflict: "usuario_id,atividade_id", // ✅ CORRIGIDO
        }
      );

    if (upsertError) throw upsertError;

    console.log(`✅ Resposta registrada. Correta? ${acertou}`);
    channel.ack(msg);
  } catch (err) {
    console.error("❌ Erro ao processar mensagem:", err);
  }
}

async function startWorker() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "respostas_ia";

  await channel.assertQueue(queue, { durable: true });

  console.log("👂 Aguardando mensagens na fila:", queue);

  channel.consume(
    queue,
    (msg: ConsumeMessage | null) => {
      if (msg) handleMessage(msg, channel); // ✅ CORRIGIDO
    },
    { noAck: false }
  );
}

startWorker().catch((err: any) => {
  console.error("🚨 Erro ao iniciar worker:", err);
  process.exit(1);
});
