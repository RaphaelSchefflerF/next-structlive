import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    userId,
    tipoRequisicao,
    promptEnviado,
    respostaRecebida,
    custoEstimado,
    statusResposta,
  } = req.body;

  const { error } = await supabase.from("log_uso_ia").insert([
    {
      user_id: userId,
      tipo_requisicao: tipoRequisicao,
      prompt_enviado: promptEnviado,
      resposta_recebida: respostaRecebida,
      custo_estimado: custoEstimado,
      status_resposta: statusResposta,
      data_uso: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Erro ao registrar log de uso de IA:", error.message);
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({ success: true });
}
