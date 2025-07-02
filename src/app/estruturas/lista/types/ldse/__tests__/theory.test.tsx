import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LdseTheory from '../theory';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('next/navigation');
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe('LdseTheory', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockUseRouter = vi.mocked(useRouter);
  const mockPush = vi.fn();
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: vi.fn(),
    } as any);
  });

  it('deve renderizar conteúdo quando autenticado', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(
      screen.getByText('Lista Dinâmica Simplesmente Encadeada (LDSE)'),
    ).toBeInTheDocument();
    expect(screen.getByText('1. Introdução')).toBeInTheDocument();
    expect(screen.getByText('2. Estrutura do Nó')).toBeInTheDocument();
    expect(
      screen.getByText('3. Características da Lista Dinâmica'),
    ).toBeInTheDocument();
  });

  it('deve redirecionar para login quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<LdseTheory />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('deve retornar null quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { container } = render(<LdseTheory />);
    expect(container.firstChild).toBeNull();
  });

  it('deve exibir conceitos fundamentais', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    const { container } = render(<LdseTheory />);

    expect(screen.getByText('1.1 Conceitos Fundamentais')).toBeInTheDocument();

    // Verifica se os conceitos estão presentes no conteúdo geral
    const content = container.textContent || '';
    expect(content).toContain('Acesso sequencial');
    expect(content).toContain('Tamanho variável');
    expect(content).toContain('Alocação dinâmica');
    expect(content).toContain('Ligação unidirecional');
  });

  it('deve exibir características da estrutura', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('3.1 Estrutura Linear')).toBeInTheDocument();
    expect(screen.getByText('3.2 Estrutura Homogênea')).toBeInTheDocument();
    expect(screen.getByText('3.3 Estrutura Dinâmica')).toBeInTheDocument();
    expect(screen.getByText('3.4 Ligação Simples')).toBeInTheDocument();
  });

  it('deve exibir terminologia e conceitos', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('4. Terminologia e Conceitos')).toBeInTheDocument();
  });

  it('deve exibir operações fundamentais', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('Operações Fundamentais')).toBeInTheDocument();
    expect(screen.getByText('1. Criar Lista Vazia')).toBeInTheDocument();
    expect(screen.getByText('2. Inserção no Início')).toBeInTheDocument();
    expect(screen.getByText('3. Inserção no Final')).toBeInTheDocument();
    expect(screen.getByText('4. Remoção por Valor')).toBeInTheDocument();
    expect(screen.getByText('5. Busca')).toBeInTheDocument();
    expect(screen.getByText('6. Verificar Lista Vazia')).toBeInTheDocument();
    expect(screen.getByText('7. Imprimir Lista')).toBeInTheDocument();
    expect(screen.getByText('8. Liberar Memória')).toBeInTheDocument();
  });

  it('deve exibir exemplos de código Python', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('Declaração em Python')).toBeInTheDocument();
    expect(screen.getByText(/class No:/)).toBeInTheDocument();
    expect(screen.getByText(/class Lista:/)).toBeInTheDocument();
  });

  it('deve exibir vantagens e desvantagens', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('Vantagens')).toBeInTheDocument();
    expect(screen.getByText('Desvantagens')).toBeInTheDocument();
  });

  it('deve exibir aplicações', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('Aplicações')).toBeInTheDocument();
  });

  it('deve exibir complexidade das operações', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    expect(screen.getByText('Complexidade das Operações')).toBeInTheDocument();
  });

  it('deve exibir imagens de representação gráfica', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    const images = screen.getAllByAltText('Representação Gráfica da LDSE');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src', '/assets/exemple1.png');
  });

  it('deve destacar definições importantes com caixas coloridas', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    // Verifica se há caixas de destaque com cores diferentes
    const blueBoxes = document.querySelectorAll('.border-blue-400');
    const greenBoxes = document.querySelectorAll('.border-green-400');
    const purpleBoxes = document.querySelectorAll('.border-purple-400');
    const orangeBoxes = document.querySelectorAll('.border-orange-400');

    expect(blueBoxes.length).toBeGreaterThan(0);
    expect(greenBoxes.length).toBeGreaterThan(0);
    expect(purpleBoxes.length).toBeGreaterThan(0);
    expect(orangeBoxes.length).toBeGreaterThan(0);
  });

  it('deve exibir blocos de código formatados', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<LdseTheory />);

    // Verifica se há blocos de código (elementos pre)
    const codeBlocks = document.querySelectorAll('pre');
    expect(codeBlocks.length).toBeGreaterThan(0);
  });

  it('deve não redirecionar quando status muda de loading para authenticated', () => {
    // Primeiro render com loading
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { rerender } = render(<LdseTheory />);

    // Segundo render com authenticated
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    rerender(<LdseTheory />);

    // Não deve ter chamado replace para /login
    expect(mockReplace).not.toHaveBeenCalledWith('/login');
  });
});
