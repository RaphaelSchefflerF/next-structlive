import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import supabase from "@/supabase/supabaseCliente";

// GET - Listar logs
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const url = new URL(req.url);
    const tipoRequisicao = url.searchParams.get("tipo_requisicao");
    const limite = url.searchParams.get("limite");
    const usuarioId = url.searchParams.get("user_id");

    let query = supabase
      .from("log_uso_ia")
      .select("*")
      .order("data_uso", { ascending: false });

    // Filtros opcionais
    if (tipoRequisicao) {
      query = query.eq("tipo_requisicao", tipoRequisicao);
    }

    if (usuarioId) {
      query = query.eq("user_id", usuarioId);
    }

    if (limite) {
      query = query.limit(parseInt(limite));
    } else {
      query = query.limit(100); // Limite padrão
    }

    const { data, error } = await query;

    if (error) {
      console.error("[logs:GET]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("[logs:GET]", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

// POST - Criar novo log
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, tipo_requisicao } = body;

    // Validação dos campos obrigatórios
    if (!user_id || !tipo_requisicao) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: user_id e tipo_requisicao são obrigatórios." },
        { status: 400 }
      );
    }

    const logData = {
      user_id,
      tipo_requisicao,
      data_uso: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("log_uso_ia")
      .insert([logData])
      .select()
      .single();

    if (error) {
      console.error("[logs:POST]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Log criado com sucesso.",
        data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[logs:POST]", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
