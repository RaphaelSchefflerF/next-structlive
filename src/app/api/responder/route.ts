// src/app/api/responder/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getRabbitMQChannel } from "@/lib/rabbitmq"; // ✅ usa a função compartilhada

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { atividadeId, usuarioId, alternativaMarcada } = body;

    if (!atividadeId || !usuarioId || !alternativaMarcada) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const message = {
      atividadeId,
      usuarioId,
      alternativaMarcada,
      timestamp: new Date().toISOString(),
    };

    const channel = await getRabbitMQChannel(); // ✅ reusa conexão
    const queue = "respostas_ia";

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    return NextResponse.json(
      { success: true, message: "Resposta enviada para avaliação." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[responder:POST]", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
