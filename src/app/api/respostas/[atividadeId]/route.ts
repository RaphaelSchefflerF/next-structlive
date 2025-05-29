import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  _req: Request,
  context: { params: Promise<{ atividadeId: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { atividadeId } = await context.params;

  const { data, error } = await supabase
    .from("respostas_usuario")
    .select("alternativa_marcada, feedback, correta")
    .eq("usuario_id", session.user.id)
    .eq("atividade_id", atividadeId)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Nenhuma resposta encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
