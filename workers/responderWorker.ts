// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
// eslint-disable-next-line @typescript-eslint/no-require-imports
const amqp = require("amqplib");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require("@supabase/supabase-js");

// Tipagem manual para o `msg`:
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

    // 🔍 Buscar alternativas da atividade
    const { data: atividade, error: atividadeError } = await supabase
      .from("atividades")
      .select("alternativas")
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

    // ⚠️ Feedback simulado
    const feedback = `Simulação: você escolheu "${alternativaMarcada}". ${
      acertou ? "Resposta correta!" : "Resposta incorreta."
    }`;

    // 🔁 Upsert para evitar múltiplas respostas
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
          onConflict: ["usuario_id", "atividade_id"],
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
    (msg: ConsumeMessage) => {
      handleMessage(msg, channel);
    },
    { noAck: false }
  );
}

startWorker().catch((err: any) => {
  console.error("🚨 Erro ao iniciar worker:", err);
  process.exit(1);
});
