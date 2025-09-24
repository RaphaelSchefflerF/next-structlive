// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldse\__tests__\activity.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import QuestaoPage from '../activity';
import { registrarLogIA } from '@/lib/logIAHelper';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('@/lib/logIAHelper');
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className }: any) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
}));
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children, className }: any) => (
    <h1 className={className}>{children}</h1>
  ),
}));

const mockAtividades = [
  {
    id: '1',
    titulo: 'Teste LDSE',
    descricao: 'Descrição da atividade de teste',
    estrutura: 'Lista',
    dificuldade: 'Fácil',
    alternativas: [
      { texto: 'Alternativa A', correta: false },
      { texto: 'Alternativa B', correta: true },
      { texto: 'Alternativa C', correta: false },
    ],
  },
  {
    id: '2',
    titulo: 'Teste LDSE 2',
    descricao: 'Segunda atividade de teste',
    estrutura: 'Lista',
    dificuldade: 'Médio',
    alternativas: [
      { texto: 'Opção 1', correta: true },
      { texto: 'Opção 2', correta: false },
    ],
  },
];

describe('QuestaoPage', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockRegistrarLogIA = vi.mocked(registrarLogIA);

  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn();

    // Mock session
    mockUseSession.mockReturnValue({
      data: { user: { id: 'user-1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    // Mock registrarLogIA
    mockRegistrarLogIA.mockResolvedValue(true);

    // Mock fetch responses
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAtividades),
      })
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar componente quando autenticado', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Teste LDSE')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Descrição da atividade de teste'),
    ).toBeInTheDocument();
    expect(screen.getByText('Lista')).toBeInTheDocument();
    expect(screen.getByText('Fácil')).toBeInTheDocument();
  });

  it('deve mostrar loading quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    render(<QuestaoPage />);
    expect(screen.getByText('Carregando sessão...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<QuestaoPage />);
    expect(
      screen.getByText('Você precisa estar logado para responder.'),
    ).toBeInTheDocument();
  });

  it('deve buscar atividades na montagem do componente', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/atividades');
    });
  });

  it('deve selecionar alternativa quando clicada', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Alternativa A')).toBeInTheDocument();
    });

    const alternativaA = screen.getByText('Alternativa A').closest('label');
    fireEvent.click(alternativaA!);

    // Verifica se a alternativa foi selecionada visualmente
    expect(alternativaA).toHaveClass('cursor-pointer');
  });

  it('deve enviar resposta quando botão é clicado', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Alternativa B')).toBeInTheDocument();
    });

    // Seleciona uma alternativa
    const alternativaB = screen.getByText('Alternativa B').closest('label');
    fireEvent.click(alternativaB!);

    // Clica no botão enviar
    const enviarButton = screen.getByText('Enviar Resposta');
    fireEvent.click(enviarButton);

    await waitFor(() => {
      expect(mockRegistrarLogIA).toHaveBeenCalledWith({
        usuarioId: 'user-1',
        tipoRequisicao: 'enviar_resposta',
      });
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/responder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        atividadeId: '1',
        usuarioId: 'user-1',
        alternativaMarcada: 'Alternativa B',
      }),
    });
  });

  it('deve navegar entre questões', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Questão 1 de 2')).toBeInTheDocument();
    });

    // Clica no botão próximo
    const proximoButton = screen.getByText('Próximo');
    fireEvent.click(proximoButton);

    await waitFor(() => {
      expect(screen.getByText('Teste LDSE 2')).toBeInTheDocument();
      expect(screen.getByText('Questão 2 de 2')).toBeInTheDocument();
    });

    // Clica no botão anterior
    const anteriorButton = screen.getByText('Anterior');
    fireEvent.click(anteriorButton);

    await waitFor(() => {
      expect(screen.getByText('Teste LDSE')).toBeInTheDocument();
      expect(screen.getByText('Questão 1 de 2')).toBeInTheDocument();
    });
  });

  it('deve desabilitar botão enviar quando nenhuma alternativa selecionada', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      const enviarButton = screen.getByText('Enviar Resposta');
      expect(enviarButton).toBeDisabled();
    });
  });

  it('deve calcular progresso corretamente', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Alternativa B')).toBeInTheDocument();
    });

    // Verifica progresso inicial (0%)
    const progressBar = document.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle('width: 0%');

    // Seleciona e envia primeira resposta
    const alternativaB = screen.getByText('Alternativa B').closest('label');
    fireEvent.click(alternativaB!);

    const enviarButton = screen.getByText('Enviar Resposta');
    fireEvent.click(enviarButton);

    // Aguarda a resposta ser processada e verifica o progresso (50%)
    await waitFor(() => {
      const updatedProgressBar = document.querySelector('.bg-blue-600');
      expect(updatedProgressBar).toHaveStyle('width: 50%');
    });
  });

  it('deve aplicar classes de dificuldade corretamente', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      const facilBadge = screen.getByText('Fácil');
      expect(facilBadge).toHaveClass('bg-green-100', 'text-green-800');
    });

    // Navega para a segunda questão (Médio)
    const proximoButton = screen.getByText('Próximo');
    fireEvent.click(proximoButton);

    await waitFor(() => {
      const medioBadge = screen.getByText('Médio');
      expect(medioBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });
  });

  it('deve gerar explicação quando botão é clicado', async () => {
    // Mock da resposta do feedback
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          feedback: 'Esta é a explicação da resposta correta.',
        }),
    });

    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Alternativa B')).toBeInTheDocument();
    });

    // Seleciona e envia resposta primeiro
    const alternativaB = screen.getByText('Alternativa B').closest('label');
    fireEvent.click(alternativaB!);

    const enviarButton = screen.getByText('Enviar Resposta');
    fireEvent.click(enviarButton);

    await waitFor(() => {
      const gerarExplicacaoButton = screen.getByText('Gerar Explicação');
      expect(gerarExplicacaoButton).not.toBeDisabled();
    });

    // Clica no botão de gerar explicação
    const gerarExplicacaoButton = screen.getByText('Gerar Explicação');
    fireEvent.click(gerarExplicacaoButton);

    await waitFor(() => {
      expect(mockRegistrarLogIA).toHaveBeenCalledWith({
        usuarioId: 'user-1',
        tipoRequisicao: 'solicitar_explicacao',
      });
    });
  });

  it('deve desabilitar navegação corretamente', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      // Na primeira questão, botão anterior deve estar desabilitado
      const anteriorButton = screen.getByText('Anterior');
      expect(anteriorButton).toBeDisabled();

      // Botão próximo deve estar habilitado
      const proximoButton = screen.getByText('Próximo');
      expect(proximoButton).not.toBeDisabled();
    });

    // Navega para a última questão
    const proximoButton = screen.getByText('Próximo');
    fireEvent.click(proximoButton);

    await waitFor(() => {
      // Na última questão, botão próximo deve estar desabilitado
      const proximoButtonDisabled = screen.getByText('Próximo');
      expect(proximoButtonDisabled).toBeDisabled();

      // Botão anterior deve estar habilitado
      const anteriorButton = screen.getByText('Anterior');
      expect(anteriorButton).not.toBeDisabled();
    });
  });
});
