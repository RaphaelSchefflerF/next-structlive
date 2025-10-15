import { NextResponse } from "next/server";
import { inserirLogDiario } from "@/lib/cronJobs";

export async function GET() {
  try {
    const success = await inserirLogDiario();

    if (success) {
      return NextResponse.json(
        {
          success: true,
          message: "Log diário inserido com sucesso",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Falha ao inserir log diário" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro na rota do cron job:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Mesma lógica do GET para permitir POST também
  return GET();
}
