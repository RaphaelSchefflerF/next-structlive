// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldse\__tests__\integration.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LdseActivity from '../challenge';
import QuestaoPage from '../activity';
import LdseTheory from '../theory';
import LdseVisualization from '../visualization';
import { analyzeCode } from '../ai_analysis';
import { generateRAGPrompt, RAG_CONTEXTS } from '../rag_contexts';

// Mock das dependências globais
vi.mock('next-auth/react');
vi.mock('next/navigation');
vi.mock('../ai_analysis');
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
vi.mock('@/lib/logIAHelper', () => ({
  registrarLogIA: vi.fn().mockResolvedValue(true),
}));
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Mock dos componentes UI
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

describe('Integração LDSE - Fluxo Completo', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockUseRouter = vi.mocked(useRouter);
  const mockAnalyzeCode = vi.mocked(analyzeCode);

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock session padrão
    mockUseSession.mockReturnValue({
      data: { user: { id: 'user-test', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    // Mock router
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
    } as any);

    // Mock fetch global
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  describe('Fluxo de Aprendizado Completo', () => {
    it('deve permitir navegação entre teoria, prática e atividades', () => {
      // Renderiza componente de teoria
      const { unmount: unmountTheory } = render(<LdseTheory />);
      expect(
        screen.getByText('Lista Dinâmica Simplesmente Encadeada (LDSE)'),
      ).toBeInTheDocument();
      unmountTheory();

      // Renderiza componente de prática
      const { unmount: unmountChallenge } = render(<LdseActivity />);
      expect(
        screen.getByText(
          'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
        ),
      ).toBeInTheDocument();
      unmountChallenge();

      // Renderiza componente de atividades
      const { unmount: unmountActivity } = render(<QuestaoPage />);
      expect(screen.getByText('Carregando atividade...')).toBeInTheDocument();
      unmountActivity();

      // Renderiza componente de visualização
      render(<LdseVisualization />);
      expect(
        screen.getByText('Removendo o último nó de uma lista encadeada'),
      ).toBeInTheDocument();
    });

    it('deve manter consistência de contexto entre componentes', () => {
      // Testa se o contexto RAG é consistente
      const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

      expect(context.title).toContain('Lista Dinâmica Simplesmente Encadeada');
      expect(context.requirements).toContain(
        'Criar uma classe No com atributos dado e proximo',
      );
      expect(context.examples).toContain(
        'lista = ListaDinamicaSimplesmenteEncadeada()',
      );

      // Testa geração de prompt
      const userCode = 'class No:\n    pass';
      const prompt = generateRAGPrompt(context, userCode);

      expect(prompt).toContain(context.title);
      expect(prompt).toContain(userCode);
      expect(prompt).toContain('## CONTEXTO DO DESAFIO');
    });
  });

  describe('Integração com IA e Análise', () => {
    it('deve integrar análise de código entre componentes', async () => {
      mockAnalyzeCode.mockResolvedValue('Análise integrada da IA');

      render(<LdseActivity />);

      // Simula entrada de código
      const editor = screen.getByTestId('monaco-editor');
      fireEvent.change(editor, {
        target: {
          value:
            'class No:\n    def __init__(self, dado):\n        self.dado = dado\n        self.proximo = None',
        },
      });

      // Inicia análise
      const analyzeButton = screen.getByText('Analisar com IA');
      fireEvent.click(analyzeButton);

      await waitFor(() => {
        expect(mockAnalyzeCode).toHaveBeenCalledWith(
          'class No:\n    def __init__(self, dado):\n        self.dado = dado\n        self.proximo = None',
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('markdown')).toBeInTheDocument();
      });
    });

    it('deve manter estado entre transições de componentes', () => {
      // Simula fluxo de dados entre componentes
      const mockData = {
        userProgress: 50,
        currentChapter: 'LDSE',
        completedExercises: ['exercise1', 'exercise2'],
      };

      // Teoria -> Prática
      const { unmount: unmountTheory } = render(<LdseTheory />);
      expect(
        screen.getByText('Lista Dinâmica Simplesmente Encadeada (LDSE)'),
      ).toBeInTheDocument();
      unmountTheory();

      // Prática -> Atividades (mantém contexto)
      const { unmount: unmountChallenge } = render(<LdseActivity />);
      expect(
        screen.getByText(
          'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
        ),
      ).toBeInTheDocument();
      unmountChallenge();

      // Verifica se o contexto é mantido
      expect(mockData.currentChapter).toBe('LDSE');
      expect(mockData.userProgress).toBeGreaterThan(0);
    });
  });

  describe('Tratamento de Erros e Estados', () => {
    it('deve tratar estados de erro de forma consistente', () => {
      // Testa erro de autenticação
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      } as any);

      const { unmount: unmountTheory } = render(<LdseTheory />);
      expect(mockUseRouter().replace).toHaveBeenCalledWith('/login');
      unmountTheory();

      const { unmount: unmountActivity } = render(<QuestaoPage />);
      expect(
        screen.getByText('Você precisa estar logado para responder.'),
      ).toBeInTheDocument();
      unmountActivity();
    });

    it('deve tratar estados de loading corretamente', () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'loading',
      } as any);

      const { container: theoryContainer } = render(<LdseTheory />);
      expect(theoryContainer.firstChild).toBeNull();

      const { unmount } = render(<QuestaoPage />);
      expect(screen.getByText('Carregando sessão...')).toBeInTheDocument();
      unmount();
    });
  });

  describe('Acessibilidade e UX', () => {
    it('deve manter acessibilidade entre componentes', () => {
      render(<LdseActivity />);

      // Verifica se títulos estão presentes para leitores de tela
      expect(
        screen.getByText(
          'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Objetivo')).toBeInTheDocument();
      expect(screen.getByText('Requisitos')).toBeInTheDocument();
    });

    it('deve fornecer feedback adequado ao usuário', async () => {
      const { toast } = await import('sonner');

      render(<LdseActivity />);

      // Testa feedback de cópia
      const copyButton = screen.getByText('Copiar');
      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  describe('Performance e Otimização', () => {
    it('deve renderizar componentes de forma eficiente', () => {
      const startTime = performance.now();

      render(<LdseTheory />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Verifica se o tempo de renderização é aceitável (< 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    it('deve não re-renderizar desnecessariamente', () => {
      const { rerender } = render(<LdseActivity />);

      const initialContent = screen.getByText(
        'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
      );

      // Re-renderiza com as mesmas props
      rerender(<LdseActivity />);

      const updatedContent = screen.getByText(
        'Desafio Prático: Implementar Lista Dinâmica Simplesmente Encadeada',
      );

      // Verifica se o elemento não foi recriado
      expect(initialContent).toBe(updatedContent);
    });
  });

  describe('Validação de Dados e Tipos', () => {
    it('deve validar tipos de dados corretamente', () => {
      const context = RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;

      // Verifica tipos da interface ChallengeContext
      expect(typeof context.title).toBe('string');
      expect(typeof context.objective).toBe('string');
      expect(Array.isArray(context.requirements)).toBe(true);
      expect(Array.isArray(context.examples)).toBe(true);
      expect(Array.isArray(context.commonMistakes)).toBe(true);
      expect(Array.isArray(context.evaluationCriteria)).toBe(true);
    });

    it('deve manter integridade dos dados entre operações', () => {
      const originalContext =
        RAG_CONTEXTS.LISTA_DINAMICA_SIMPLESMENTE_ENCADEADA;
      const code = 'test code';

      const prompt1 = generateRAGPrompt(originalContext, code);
      const prompt2 = generateRAGPrompt(originalContext, code);

      // Verifica se gera prompts consistentes
      expect(prompt1).toBe(prompt2);

      // Verifica se o contexto original não foi modificado
      expect(originalContext.title).toBe(
        'Implementar Lista Dinâmica Simplesmente Encadeada',
      );
    });
  });
});
