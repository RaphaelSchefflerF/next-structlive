import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuestaoPage from '../activity';

// Mock das APIs
global.fetch = vi.fn();

const mockAtividades = [
  {
    id: 1,
    titulo: 'Questão sobre Lista Encadeada',
    descricao: 'Qual é a complexidade de inserção no início?',
    estrutura: 'Lista',
    dificuldade: 'Fácil',
    alternativas: [
      { texto: 'O(1)', correta: true },
      { texto: 'O(n)', correta: false },
      { texto: 'O(log n)', correta: false },
    ],
  },
];

describe('QuestaoPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockAtividades),
    } as any);
  });

  it('deve carregar e exibir atividades', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Questão sobre Lista Encadeada'),
      ).toBeInTheDocument();
    });
  });

  it('deve exibir progresso das questões', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Questão 1 de 1')).toBeInTheDocument();
    });
  });

  it('deve exibir alternativas da questão', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('O(1)')).toBeInTheDocument();
      expect(screen.getByText('O(n)')).toBeInTheDocument();
      expect(screen.getByText('O(log n)')).toBeInTheDocument();
    });
  });

  it('deve permitir selecionar alternativa', async () => {
    render(<QuestaoPage />);

    await waitFor(async () => {
      const alternativa = screen.getByText('O(1)');
      fireEvent.click(alternativa);

      // Aguarda a atualização do estado
      await waitFor(() => {
        expect(alternativa.closest('label')).toHaveClass('border-blue-500');
      });
    });
  });

  it('deve desabilitar botão enviar quando nenhuma alternativa selecionada', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      const enviarButton = screen.getByText('Enviar Resposta');
      expect(enviarButton).toBeDisabled();
    });
  });

  it('deve habilitar botão enviar quando alternativa selecionada', async () => {
    render(<QuestaoPage />);

    await waitFor(async () => {
      const alternativa = screen.getByText('O(1)');
      fireEvent.click(alternativa);

      await waitFor(() => {
        const enviarButton = screen.getByText('Enviar Resposta');
        expect(enviarButton).not.toBeDisabled();
      });
    });
  });

  it('deve exibir tags de estrutura e dificuldade', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      expect(screen.getByText('Lista')).toBeInTheDocument();
      expect(screen.getByText('Fácil')).toBeInTheDocument();
    });
  });

  it('deve desabilitar botão gerar explicação inicialmente', async () => {
    render(<QuestaoPage />);

    await waitFor(() => {
      const explicacaoButton = screen.getByText('Gerar Explicação');
      expect(explicacaoButton).toBeDisabled();
    });
  });

  it('deve chamar API ao enviar resposta', async () => {
    const mockPost = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });
    vi.mocked(fetch).mockImplementation((url, options) => {
      if (options?.method === 'POST') {
        return Promise.resolve(mockPost());
      }
      return Promise.resolve({
        ok: true,
        json: vi.fn().mockResolvedValue(mockAtividades),
      } as any);
    });

    render(<QuestaoPage />);

    await waitFor(async () => {
      const alternativa = screen.getByText('O(1)');
      fireEvent.click(alternativa);

      await waitFor(async () => {
        const enviarButton = screen.getByText('Enviar Resposta');
        fireEvent.click(enviarButton);

        expect(mockPost).toHaveBeenCalled();
      });
    });
  });
});
