import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LdseActivity from '../challenge';
import { analyzeCode } from '../ai_analysis';
import { toast } from 'sonner';

// Mock das dependências
vi.mock('../ai_analysis');
vi.mock('sonner');
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: any) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  ),
}));
vi.mock('react-markdown', () => ({
  default: ({ children }: any) => <div data-testid="markdown">{children}</div>,
}));
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, variant, size }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
    >
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
  CardTitle: ({ children }: any) => <h1>{children}</h1>,
}));
vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: any) => <div>{children}</div>,
  Tooltip: ({ children }: any) => <div>{children}</div>,
  TooltipTrigger: ({ children, asChild }: any) =>
    asChild ? children : <div>{children}</div>,
  TooltipContent: ({ children }: any) => <div>{children}</div>,
}));
vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));
vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant, className }: any) => (
    <span data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

describe('LdseActivity', () => {
  const mockAnalyzeCode = vi.mocked(analyzeCode);
  const mockToast = vi.mocked(toast);

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('deve renderizar o componente corretamente', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText(
        'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Implemente uma Lista Dinâmica Simplesmente Encadeada em Python/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('deve exibir todos os requisitos do projeto', () => {
    render(<LdseActivity />);

    // Verifica se as seções principais estão presentes
    expect(screen.getByText('Objetivo')).toBeInTheDocument();
    expect(screen.getByText('Requisitos')).toBeInTheDocument();

    // Verifica alguns elementos específicos do código inline
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('dado')).toBeInTheDocument();
    expect(screen.getByText('proximo')).toBeInTheDocument();

    // Verifica métodos específicos
    expect(screen.getByText('inserir_inicio(dado)')).toBeInTheDocument();
    expect(screen.getByText('inserir_fim(dado)')).toBeInTheDocument();
    expect(screen.getByText('remover_inicio()')).toBeInTheDocument();
    expect(screen.getByText('remover_fim()')).toBeInTheDocument();
    expect(screen.getByText('exibir()')).toBeInTheDocument();
  });

  it('deve mostrar seções de objetivo e requisitos', () => {
    render(<LdseActivity />);

    expect(screen.getByText('Objetivo')).toBeInTheDocument();
    expect(screen.getByText('Requisitos')).toBeInTheDocument();
  });

  it('deve permitir edição de código no editor Monaco', () => {
    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor).toBeInTheDocument();

    fireEvent.change(editor, { target: { value: 'class No:\n    pass' } });
    expect(editor).toHaveValue('class No:\n    pass');
  });

  it('deve copiar código para área de transferência', async () => {
    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'teste código' } });

    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('teste código');
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Código copiado!');
    });
  });

  it('deve mostrar erro ao tentar copiar código sem suporte', async () => {
    // Mock clipboard failure
    Object.assign(navigator, {
      clipboard: {
        writeText: vi
          .fn()
          .mockRejectedValue(new Error('Clipboard not supported')),
      },
    });

    render(<LdseActivity />);

    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        'Não foi possível copiar o código',
      );
    });
  });

  it('deve analisar código com IA quando botão é clicado', async () => {
    const mockAnalysis = 'Análise detalhada do código fornecido';
    mockAnalyzeCode.mockResolvedValue(mockAnalysis);

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, {
      target: { value: 'class No:\n    def __init__(self):\n        pass' },
    });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    expect(analyzeButton).toHaveTextContent('Analisando...');

    await waitFor(() => {
      expect(mockAnalyzeCode).toHaveBeenCalledWith(
        'class No:\n    def __init__(self):\n        pass',
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('markdown')).toBeInTheDocument();
      expect(screen.getByTestId('markdown')).toHaveTextContent(mockAnalysis);
      expect(mockToast.success).toHaveBeenCalledWith(
        'Análise concluída! Veja o feedback abaixo.',
      );
    });
  });

  it('deve mostrar erro quando tentar analisar código vazio', async () => {
    render(<LdseActivity />);

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    expect(mockToast.error).toHaveBeenCalledWith(
      'Digite algum código antes de analisar!',
    );
    expect(mockAnalyzeCode).not.toHaveBeenCalled();
  });

  it('deve tratar erro na análise de código', async () => {
    mockAnalyzeCode.mockRejectedValue(new Error('API Error'));

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'código de teste' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        'Erro ao analisar o código. Tente novamente.',
      );
    });
  });

  it('deve tratar resposta vazia da IA', async () => {
    mockAnalyzeCode.mockResolvedValue('');

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'código de teste' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        'Não foi possível obter a análise da IA.',
      );
    });
  });

  it('deve exibir tooltip nos botões', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText('Copiar código para área de transferência'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Analisar código com Gemini AI'),
    ).toBeInTheDocument();
  });

  it('deve mostrar análise da IA quando disponível', async () => {
    const mockAnalysis = 'Análise: Código bem estruturado!';
    mockAnalyzeCode.mockResolvedValue(mockAnalysis);

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'class Lista:\n    pass' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    // Aguarda o mock ser chamado
    await waitFor(() => {
      expect(mockAnalyzeCode).toHaveBeenCalledWith('class Lista:\n    pass');
    });

    // Aguarda o título da análise aparecer
    await waitFor(() => {
      expect(screen.getByText('Análise da IA (Gemini AI)')).toBeInTheDocument();
    });

    // Aguarda o conteúdo da análise aparecer
    await waitFor(() => {
      const markdownElement = screen.getByTestId('markdown');
      expect(markdownElement).toBeInTheDocument();
      expect(markdownElement).toHaveTextContent(mockAnalysis);
    });
  });

  it('deve desabilitar botão durante análise', async () => {
    mockAnalyzeCode.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('análise'), 100)),
    );

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'código' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    expect(analyzeButton).toBeDisabled();
    expect(analyzeButton).toHaveTextContent('Analisando...');

    await waitFor(() => {
      expect(analyzeButton).not.toBeDisabled();
      expect(analyzeButton).toHaveTextContent('Analisar com IA');
    });
  });

  it('deve limpar análise anterior antes de nova análise', async () => {
    mockAnalyzeCode.mockResolvedValue('Nova análise');

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'código' } });

    // Primeira análise
    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByTestId('markdown')).toBeInTheDocument();
    });

    // Segunda análise - deve limpar a anterior
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByTestId('markdown')).toHaveTextContent('Nova análise');
    });
  });

  it('deve manter código no editor após análise', async () => {
    mockAnalyzeCode.mockResolvedValue('Análise completa');

    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    const testCode =
      'class No:\n    def __init__(self):\n        self.value = None';

    fireEvent.change(editor, { target: { value: testCode } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByTestId('markdown')).toBeInTheDocument();
    });

    expect(editor).toHaveValue(testCode);
  });
});
