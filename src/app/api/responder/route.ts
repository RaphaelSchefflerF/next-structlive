import { NextResponse } from "next/server";
import amqp from "amqplib";

export async function POST(req: Request) {
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

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "respostas_ia";

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();

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
