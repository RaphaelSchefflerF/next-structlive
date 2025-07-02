import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EstruturasDeDados from '../page';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('next/navigation');

// Mock dos componentes UI
vi.mock('@/components/sidebar/app-sidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">App Sidebar</div>,
}));

vi.mock('@/components/ui/sidebar', () => ({
  SidebarInset: ({ children }: any) => (
    <div data-testid="sidebar-inset">{children}</div>
  ),
  SidebarProvider: ({ children }: any) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Toggle</button>,
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

vi.mock('@/components/ui/breadcrumb', () => ({
  Breadcrumb: ({ children }: any) => (
    <nav data-testid="breadcrumb">{children}</nav>
  ),
  BreadcrumbItem: ({ children }: any) => (
    <div data-testid="breadcrumb-item">{children}</div>
  ),
  BreadcrumbLink: ({ children, href }: any) => (
    <a href={href} data-testid="breadcrumb-link">
      {children}
    </a>
  ),
  BreadcrumbList: ({ children }: any) => (
    <ul data-testid="breadcrumb-list">{children}</ul>
  ),
  BreadcrumbSeparator: () => <span data-testid="breadcrumb-separator">/</span>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="link">
      {children}
    </a>
  ),
}));

describe('EstruturasDeDados', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockUseRouter = vi.mocked(useRouter);
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRouter.mockReturnValue({
      replace: mockReplace,
      push: vi.fn(),
      back: vi.fn(),
    } as any);
  });

  it('deve renderizar a página quando autenticado', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Estruturas de Dados',
    );
    expect(
      screen.getByText(
        'Explore as principais estruturas de dados da plataforma.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
  });

  it('deve redirecionar para login quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('deve retornar null quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { container } = render(<EstruturasDeDados />);
    expect(container.firstChild).toBeNull();
  });

  it('deve exibir o breadcrumb correto', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();

    // Verifica se os textos estão presentes no breadcrumb
    const breadcrumbContainer = screen.getByTestId('breadcrumb');
    expect(breadcrumbContainer.textContent).toContain('Início');
    expect(breadcrumbContainer.textContent).toContain('Estruturas de Dados');
  });

  it('deve exibir a estrutura Lista como disponível', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(screen.getByText('Lista')).toBeInTheDocument();
    expect(
      screen.getByText('Coleção linear de elementos com acesso sequencial.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Disponível')).toBeInTheDocument();
  });

  it('deve exibir estruturas em breve', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    // Fila
    expect(screen.getByText('Fila')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Estrutura FIFO: o primeiro a entrar é o primeiro a sair.',
      ),
    ).toBeInTheDocument();

    // Pilha
    expect(screen.getByText('Pilha')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Estrutura LIFO: o último a entrar é o primeiro a sair.',
      ),
    ).toBeInTheDocument();

    // Árvore
    expect(screen.getByText('Árvore')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Estrutura hierárquica para dados em formato de árvore.',
      ),
    ).toBeInTheDocument();

    // Badges "Em breve"
    const emBreveElements = screen.getAllByText('Em breve');
    expect(emBreveElements).toHaveLength(3);
  });

  it('deve ter link para a página de Lista', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    const listaLink = screen
      .getAllByTestId('link')
      .find((link) => link.getAttribute('href') === '/estruturas/lista');
    expect(listaLink).toBeInTheDocument();
  });

  it('deve exibir o título e descrição principais', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Estruturas de Dados',
    );
    expect(
      screen.getByText(
        'Explore as principais estruturas de dados da plataforma.',
      ),
    ).toBeInTheDocument();
  });

  it('deve exibir emojis para cada estrutura', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    const { container } = render(<EstruturasDeDados />);

    // Verifica se os emojis estão presentes no conteúdo
    const content = container.textContent || '';
    expect(content).toContain('📋'); // Lista
    expect(content).toContain('📥'); // Fila
    expect(content).toContain('🗄️'); // Pilha
    expect(content).toContain('🌳'); // Árvore
  });

  it('deve ter layout grid responsivo', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('md:grid-cols-4');
  });

  it('deve exibir sidebar trigger e separator', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('deve usar container com classes CSS corretas', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<EstruturasDeDados />);

    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex', 'flex-col', 'py-10', 'mx-auto');
  });
});
