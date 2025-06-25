import amqp, { Channel } from "amqplib";

let channel: Channel | null = null;

export async function getRabbitMQChannel(): Promise<Channel> {
  if (channel) return channel;

  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  channel = await connection.createChannel();
  await channel.assertQueue("respostas_ia", { durable: true });

  console.log("✅ Canal RabbitMQ criado.");
  return channel;
}
