"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function QuestaoPage() {
  const { data: session, status } = useSession();
  const [atividade, setAtividade] = useState<any>(null);
  const [alternativa, setAlternativa] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Carrega atividade
  useEffect(() => {
    const fetchAtividade = async () => {
      const res = await fetch("/api/atividades");
      const data = await res.json();
      if (data && data.length > 0) {
        setAtividade(data[0]); // pode sortear ou mudar depois
      }
    };
    fetchAtividade();
  }, []);

  // Carrega resposta anterior (se existir)
  useEffect(() => {
    const fetchResposta = async () => {
      if (!atividade?.id || !session?.user?.id) return;

      const res = await fetch(`/api/respostas/${atividade.id}`);
      if (!res.ok) return;

      const data = await res.json();
      setAlternativa(data.alternativa_marcada);
      setMensagem(
        `Feedback: ${data.feedback} | ${
          data.correta ? "✅ Correta" : "❌ Incorreta"
        }`
      );
    };

    fetchResposta();
  }, [atividade, session]);

  // Envia resposta
  const handleSubmit = async () => {
    if (!alternativa) {
      return setMensagem("Por favor, selecione uma alternativa.");
    }

    if (!session?.user?.id || !atividade?.id) {
      return setMensagem("Sessão de usuário ou atividade inválida.");
    }

    // Envia a resposta para a fila (worker irá processar)
    const response = await fetch("/api/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        atividadeId: atividade.id,
        usuarioId: session.user.id,
        alternativaMarcada: alternativa,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return setMensagem(data.error || "Erro ao enviar resposta.");
    }

    setMensagem("⏳ Resposta enviada, aguardando feedback...");

    // Inicia polling para verificar quando o feedback estiver disponível
    const interval = setInterval(async () => {
      const res = await fetch(`/api/respostas/${atividade.id}`);
      if (!res.ok) return;

      const respostaData = await res.json();

      if (respostaData.feedback) {
        setMensagem(
          `✅ Feedback: ${respostaData.feedback} | ${
            respostaData.correta ? "✅ Correta" : "❌ Incorreta"
          }`
        );
        clearInterval(interval); // para de checar
      }
    }, 2000); // checa a cada 2 segundos
  };

  if (status === "loading") return <p>Carregando sessão...</p>;
  if (!session) return <p>Você precisa estar logado para responder.</p>;
  if (!atividade) return <p>Carregando atividade...</p>;

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold mb-2'>{atividade.titulo}</h1>
      <p className='mb-4 text-gray-700'>{atividade.descricao}</p>
      <p className='mb-2 text-sm text-gray-500'>
        Dificuldade: {atividade.dificuldade} | Estrutura: {atividade.estrutura}
      </p>

      <div className='space-y-2 mb-4'>
        {atividade.alternativas?.map((alt: any, index: number) => (
          <label key={index} className='block'>
            <input
              type='radio'
              name='alternativa'
              value={alt.texto}
              checked={alternativa === alt.texto}
              onChange={(e) => setAlternativa(e.target.value)}
              className='mr-2'
            />
            {alt.texto}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Enviar Resposta
      </button>

      {mensagem && <p className='mt-4 text-green-700'>{mensagem}</p>}
    </div>
  );
}
