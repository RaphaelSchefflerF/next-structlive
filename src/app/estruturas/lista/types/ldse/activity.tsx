// QuestaoPage.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { registrarLogIA } from "@/lib/logIAHelper";

export default function QuestaoPage() {
  const { data: session, status } = useSession();
  const [atividades, setAtividades] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [alternativasSelecionadas, setAlternativasSelecionadas] = useState<{
    [key: number]: string;
  }>({});
  const [respostasCorretas, setRespostasCorretas] = useState<{
    [key: number]: string;
  }>({});
  const [respostasEnviadas, setRespostasEnviadas] = useState<{
    [key: number]: boolean;
  }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [mostrarExplicacao, setMostrarExplicacao] = useState<{
    [key: number]: boolean;
  }>({});
  const [permitirExplicacao, setPermitirExplicacao] = useState<{
    [key: number]: boolean;
  }>({});
  const explicacaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAtividades = async () => {
      const res = await fetch("/api/atividades");
      const data = await res.json();
      setAtividades(data);
    };
    fetchAtividades();
  }, []);

  const atividade = atividades[index];
  const alternativa = alternativasSelecionadas[index];
  const respostaCorreta = respostasCorretas[index];

  const handleSubmit = async () => {
    if (!alternativa || !session?.user?.id || !atividade?.id) return;

    setRespostasCorretas((prev) => ({
      ...prev,
      [index]: atividade.alternativas.find((a: any) => a.correta)?.texto || "",
    }));

    setRespostasEnviadas((prev) => ({ ...prev, [index]: true }));
    setPermitirExplicacao((prev) => ({ ...prev, [index]: true }));

    // Log da submissão da resposta
    await registrarLogIA({
      usuarioId: session.user.id,
      tipoRequisicao: 'enviar_resposta'
    });

    await fetch("/api/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        atividadeId: atividade.id,
        usuarioId: session.user.id,
        alternativaMarcada: alternativa,
      }),
    });
  };

  const handleChangeAlternativa = (value: string) => {
    setAlternativasSelecionadas((prev) => ({ ...prev, [index]: value }));
    setRespostasEnviadas((prev) => ({ ...prev, [index]: false }));
    setRespostasCorretas((prev) => {
      const novo = { ...prev };
      delete novo[index];
      return novo;
    });
    setFeedback((prev) => ({ ...prev, [index]: "" }));
    setMostrarExplicacao((prev) => ({ ...prev, [index]: false }));
    setPermitirExplicacao((prev) => ({ ...prev, [index]: false }));
  };

  function removerMarkdownBasico(texto: string): string {
    return texto.replace(/\*{1,2}/g, "");
  }

  const handleGerarExplicacao = async () => {
    if (!session?.user?.id || !atividade?.id || !permitirExplicacao[index])
      return;

    setMostrarExplicacao((prev) => ({ ...prev, [index]: true }));

    // Log do início da solicitação de explicação
    await registrarLogIA({
      usuarioId: session.user.id,
      tipoRequisicao: 'solicitar_explicacao'
    });

    let tentativas = 0;
    const maxTentativas = 10;
    const intervalo = 2000; // 2 segundos
    const ultimoTexto = feedback[index] || "";

    const buscarFeedback = async () => {
      const res = await fetch(`/api/respostas/${atividade.id}`);
      if (!res.ok) return;

      const data = await res.json();
      const textoBruto = data.feedback?.trim() || "";
      const textoLimpo = removerMarkdownBasico(textoBruto);

      if (textoLimpo && textoLimpo !== ultimoTexto) {
        setFeedback((prev) => ({ ...prev, [index]: textoLimpo }));
        
        // Log de sucesso ao receber feedback
        await registrarLogIA({
          usuarioId: session.user.id,
          tipoRequisicao: 'receber_explicacao'
        });
      } else if (tentativas < maxTentativas) {
        tentativas++;
        setTimeout(buscarFeedback, intervalo);
      } else {
        // Último fallback: ainda não mudou
        const feedbackFinal = textoLimpo || "Feedback não disponível.";
        setFeedback((prev) => ({
          ...prev,
          [index]: feedbackFinal,
        }));

        // Log de timeout/erro
        await registrarLogIA({
          usuarioId: session.user.id,
          tipoRequisicao: 'timeout_explicacao'
        });
      }
    };

    buscarFeedback();
  };

  const getDificuldadeClasses = (dificuldade: string) => {
    switch (dificuldade.toLowerCase()) {
      case "fácil":
      case "facil":
        return "bg-green-100 text-green-800";
      case "médio":
      case "medio":
        return "bg-yellow-100 text-yellow-800";
      case "difícil":
      case "dificil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const progressoRespondido =
    Object.values(respostasEnviadas).filter(Boolean).length;
  const progressoPercentual = Math.round(
    (progressoRespondido / atividades.length) * 100
  );

  if (status === "loading") return <p>Carregando sessão...</p>;
  if (!session) return <p>Você precisa estar logado para responder.</p>;
  if (!atividade) return <p>Carregando atividade...</p>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-[minmax(0,600px)_1fr] gap-6'>
      {/* Questão */}
      <div>
        <Card className='border-none shadow-none p-0'>
          <div className='max-w-[600px]'>
            <div className='mb-1 text-sm italic font-semibold text-blue-600'>
              Questão {index + 1} de {atividades.length}
            </div>
            {atividades.length > 0 && (
              <div className='mb-6'>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-blue-600 h-2.5 rounded-full transition-all duration-500'
                    style={{
                      width: `${progressoPercentual}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className='text-lg font-medium text-stone-700'>
              {atividade.titulo}
            </CardTitle>
          </CardHeader>

          <div className='flex flex-wrap gap-2 mt-1 mb-6 max-w-[600px]'>
            {atividade.estrutura && (
              <span className='text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                {atividade.estrutura}
              </span>
            )}
            {atividade.dificuldade && (
              <span
                className={`text-xs font-bold px-2 py-1 ${getDificuldadeClasses(
                  atividade.dificuldade
                )} rounded`}
              >
                {atividade.dificuldade}
              </span>
            )}
          </div>

          <CardContent>
            <div className='max-w-[600px]'>
              <p className='mb-4 text-md text-stone-700'>
                {atividade.descricao}
              </p>
            </div>
            <div className='space-y-3 mb-4'>
              {atividade.alternativas?.map((alt: any, idx: number) => {
                let style =
                  "max-w-[600px] bg-muted hover:bg-muted/70 border border-border text-sm px-4 py-3 rounded-xl flex items-center justify-start gap-3 transition-all duration-150";
                let textClass = "text-stone-700 font-normal";
                let badgeClass = "bg-background border border-border";

                const isSelecionada = alt.texto === alternativa;
                const isRespostaCerta = alt.texto === respostaCorreta;
                const isRespostaUsuario =
                  alt.texto === alternativasSelecionadas[index];

                if (respostasEnviadas[index]) {
                  if (isRespostaCerta && isRespostaUsuario) {
                    style += " border-green-500";
                    textClass = "text-green-700 font-medium";
                    badgeClass = "bg-green-100 border-green-500 text-green-700";
                  } else if (isRespostaCerta) {
                    style += " border-green-500";
                    textClass = "text-green-700 font-medium";
                    badgeClass = "bg-green-100 border-green-500 text-green-700";
                  } else if (isRespostaUsuario) {
                    style += " border-red-500";
                    textClass = "text-red-700 font-medium";
                    badgeClass = "bg-red-100 border-red-500 text-red-700";
                  }
                } else if (isSelecionada) {
                  style += " border-blue-500";
                  textClass = "text-blue-700 font-medium";
                  badgeClass = "bg-blue-100 border-blue-500 text-blue-700";
                }

                return (
                  <label
                    key={idx}
                    onClick={() => handleChangeAlternativa(alt.texto)}
                    className={`${style} cursor-pointer`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center font-bold rounded-full ${badgeClass}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`truncate ${textClass}`}>{alt.texto}</span>
                  </label>
                );
              })}
            </div>
            <div className='flex justify-between items-center max-w-[600px]'>
              <Button
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                disabled={index === 0}
                className='cursor-pointer'
              >
                Anterior
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!alternativa || respostasEnviadas[index]}
                className='w-1/3 cursor-pointer'
              >
                Enviar Resposta
              </Button>
              <Button
                onClick={() =>
                  setIndex((prev) => Math.min(atividades.length - 1, prev + 1))
                }
                disabled={index === atividades.length - 1}
                className='cursor-pointer'
              >
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback */}
      <div className='flex flex-col gap-6 p-4 h-full'>
        <div className='flex gap-4 items-start'>
          <div className='flex flex-col gap-4 items-start'>
            <Button
              onClick={handleGerarExplicacao}
              className='w-[160px] cursor-pointer'
              disabled={!permitirExplicacao[index]}
            >
              Gerar Explicação
            </Button>
          </div>
          <div className='flex-1'>
            <div className='bg-white rounded-lg shadow-lg border overflow-hidden'>
              <div className='bg-gray-800 text-white px-4 py-3'>
                <h3 className='text-sm font-semibold'>Struct AI:</h3>
              </div>
              <div className='p-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                  Clique no botão ao lado para que nossa IA te explique por que
                  sua resposta está certa ou errada, com base no conteúdo
                  estudado.
                </p>
                {mostrarExplicacao[index] && (
                  <div
                    ref={explicacaoRef}
                    className='bg-gray-50 p-4 rounded-lg h-[330px] overflow-y-auto text-[0.9rem] border custom-scrollbar whitespace-pre-wrap'
                  >
                    {feedback[index]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
