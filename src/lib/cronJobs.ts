import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function inserirLogDiario() {
  try {
    const { data, error } = await supabase
      .from("log_sessoes")
      .insert([
        {
          user_id: "system",
          ip_address: "127.0.0.1",
          user_agent: "Cron Job",
          inicio_sessao: new Date().toISOString(),
          fim_sessao: new Date().toISOString(),
          paginas_acessadas: ["cron-job-daily"],
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao inserir log diário:", error.message);
      return false;
    }

    console.log("Log diário inserido com sucesso:", data.id);
    return true;
  } catch (error) {
    console.error("Erro inesperado no cron job:", error);
    return false;
  }
}

// Função para iniciar o cron job (executa a cada 24 horas)
export function iniciarCronJobDiario() {
  const VINTE_QUATRO_HORAS = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

  // Executa imediatamente na primeira vez (opcional)
  console.log("Iniciando cron job diário...");

  // Configura para executar a cada 24 horas
  setInterval(async () => {
    console.log("Executando cron job diário:", new Date().toISOString());
    await inserirLogDiario();
  }, VINTE_QUATRO_HORAS);

  console.log("Cron job configurado para executar a cada 24 horas");
}
