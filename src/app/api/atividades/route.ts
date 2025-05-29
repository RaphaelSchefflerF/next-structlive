import { NextResponse } from "next/server";
import supabase from "@/supabase/supabaseCliente";

export async function GET() {
  const { data, error } = await supabase.from("atividades").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
