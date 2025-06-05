import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function iniciarSessao({
  userId,
  ipAddress,
  userAgent,
}: {
  userId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const { data, error } = await supabase
    .from("log_sessoes")
    .insert([
      {
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        inicio_sessao: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao registrar início da sessão:", error.message);
    return null;
  }
  return data.id as string;
}

export async function finalizarSessao({
  logId,
  paginasAcessadas,
}: {
  logId: string;
  paginasAcessadas?: string[];
}) {
  const { error } = await supabase
    .from("log_sessoes")
    .update({
      fim_sessao: new Date().toISOString(),
      paginas_acessadas: paginasAcessadas ?? [],
    })
    .eq("id", logId);

  if (error) {
    console.error("Erro ao registrar fim da sessão:", error.message);
    return false;
  }
  return true;
}
