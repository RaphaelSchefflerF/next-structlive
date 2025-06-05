// src/app/api/atividades/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseCliente";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from("atividades")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Atividade não encontrada", details: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
