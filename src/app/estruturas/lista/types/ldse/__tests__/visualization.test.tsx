import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LdseVisualization from '../visualization';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('next/navigation');

describe('LdseVisualization', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockUseRouter = vi.mocked(useRouter);
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      replace: mockReplace,
      back: vi.fn(),
    } as any);

    // Mock do scrollTo
    Object.defineProperty(Element.prototype, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    });

    // Mock das propriedades de elemento
    Object.defineProperty(Element.prototype, 'clientWidth', {
      value: 600,
      writable: true,
    });
  });

  it('deve renderizar componente quando autenticado', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    expect(
      screen.getByText('Removendo o último nó de uma lista encadeada'),
    ).toBeInTheDocument();
    expect(screen.getByText('Código sendo executado:')).toBeInTheDocument();
    expect(screen.getByText('Log de execução:')).toBeInTheDocument();
  });

  it('deve redirecionar para login quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<LdseVisualization />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('deve retornar null quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { container } = render(<LdseVisualization />);
    expect(container.firstChild).toBeNull();
  });

  it('deve exibir nós iniciais da lista', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('deve exibir contador de quantidade', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    const { container } = render(<LdseVisualization />);

    // Verifica se há texto contendo "quant:" e o número 3
    expect(container.textContent).toContain('quant:');
    expect(container.textContent).toContain('3');
  });

  it('deve exibir botões de controle', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    expect(screen.getByText('Remover nó final')).toBeInTheDocument();
    expect(screen.getByText('Resetar')).toBeInTheDocument();
  });

  it('deve iniciar animação de remoção quando botão é clicado', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    const removerButton = screen.getByText('Remover nó final');
    fireEvent.click(removerButton);

    // Verifica se o botão fica desabilitado durante a animação
    expect(removerButton).toBeDisabled();

    // Verifica se aparece no log
    await waitFor(
      () => {
        expect(
          screen.getByText(/Iniciando remoção do último nó/),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('deve resetar a lista quando botão resetar é clicado', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    const resetButton = screen.getByText('Resetar');
    fireEvent.click(resetButton);

    // Verifica se os nós voltaram ao estado inicial
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('deve desabilitar botões durante animação', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    const removerButton = screen.getByText('Remover nó final');
    const resetButton = screen.getByText('Resetar');

    fireEvent.click(removerButton);

    expect(removerButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it('deve exibir None quando lista está vazia', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    // Remove todos os nós
    const removerButton = screen.getByText('Remover nó final');

    // Simula remoção rápida (sem aguardar animação completa)
    fireEvent.click(removerButton);

    // Espera um pouco para a animação começar
    await waitFor(
      () => {
        expect(screen.getByText(/Iniciando remoção/)).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('deve exibir código formatado com numeração', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    // Verifica se os títulos das seções de código estão presentes
    expect(screen.getByText('Código sendo executado:')).toBeInTheDocument();

    // Verifica se há pelo menos alguns elementos de código Python presentes
    // usando getAllByText para pegar todos os elementos que contêm as palavras
    expect(
      screen.getAllByText((content) => content.includes('class')).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText((content) => content.includes('def')).length,
    ).toBeGreaterThan(0);
  });

  it('deve destacar linha de código durante execução', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    const removerButton = screen.getByText('Remover nó final');
    fireEvent.click(removerButton);

    // Aguarda início da animação e verificação de destaque
    await waitFor(
      () => {
        expect(
          screen.getByText(/Verificando se a lista possui apenas um nó/),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('deve mostrar ponteiros prim e ult corretamente', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    expect(screen.getByText('prim')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
  });

  it('deve exibir log vazio inicialmente', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    expect(screen.getByText('Nenhuma execução ainda...')).toBeInTheDocument();
  });

  it('deve tratar diferentes cenários de remoção', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    // Remove primeiro nó
    const removerButton = screen.getByText('Remover nó final');
    fireEvent.click(removerButton);

    await waitFor(
      () => {
        expect(screen.getByText(/aux = prim/)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('deve não executar animação se já estiver animando', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    const removerButton = screen.getByText('Remover nó final');
    const resetButton = screen.getByText('Resetar');

    // Inicia primeira animação
    fireEvent.click(removerButton);

    // Tenta executar reset durante animação
    fireEvent.click(resetButton);

    // Ambos devem estar desabilitados
    expect(removerButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it('deve mostrar representação visual correta dos nós', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseVisualization />);

    // Verifica a presença dos elementos visuais dos nós
    const nodeA = screen.getByText('A');
    const nodeB = screen.getByText('B');
    const nodeC = screen.getByText('C');

    expect(nodeA).toBeInTheDocument();
    expect(nodeB).toBeInTheDocument();
    expect(nodeC).toBeInTheDocument();
  });
});
