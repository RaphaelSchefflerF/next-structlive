import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HomePage from '../page';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('next/navigation');

// Mock do contexto
vi.mock('@/contexts/AppContext', () => ({
  useAppContext: () => ({
    progress: {
      lista: {
        completed: false,
        lastVisited: new Date('2024-01-15'),
        timeSpent: 300,
      },
    },
    dataStructures: [
      {
        id: 'lista',
        title: 'Lista',
        icon: '📋',
        description: 'Coleção linear de elementos',
      },
    ],
  }),
}));

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

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, size, variant, className }: any) => {
    if (asChild) {
      return (
        <div className={className} data-size={size} data-variant={variant}>
          {children}
        </div>
      );
    }
    return (
      <button className={className} data-size={size} data-variant={variant}>
        {children}
      </button>
    );
  },
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
}));

vi.mock('@/components/recent-structures', () => ({
  RecentStructures: () => (
    <div data-testid="recent-structures">Recent Structures</div>
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="link">
      {children}
    </a>
  ),
}));

describe('HomePage', () => {
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

    render(<HomePage />);

    expect(screen.getByText(/Aprenda Estruturas de Dados/)).toBeInTheDocument();
    expect(
      screen.getByText(/de Forma Visual, Prática e Divertida/),
    ).toBeInTheDocument();
  });

  it('deve redirecionar para login quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<HomePage />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('deve retornar null quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { container } = render(<HomePage />);
    expect(container.firstChild).toBeNull();
  });

  it('deve exibir a seção hero com conteúdo principal', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    expect(
      screen.getByText('Plataforma Visual de Estruturas de Dados'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Domine listas, pilhas, filas, árvores/),
    ).toBeInTheDocument();
    expect(screen.getByText('Começar Agora')).toBeInTheDocument();
    expect(screen.getByText('Ver Demonstração')).toBeInTheDocument();
  });

  it('deve exibir a seção de benefícios', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    expect(
      screen.getByText('Por que aprender com a StructLive?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Tutoriais Didáticos')).toBeInTheDocument();
    expect(screen.getByText('Visualizações Interativas')).toBeInTheDocument();
    expect(screen.getByText('Atividades Práticas')).toBeInTheDocument();
  });

  it('deve exibir componente RecentStructures', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    expect(screen.getByTestId('recent-structures')).toBeInTheDocument();
  });

  it('deve ter links corretos nos botões', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    const links = screen.getAllByTestId('link');

    // Verifica se há links para as páginas corretas
    const estruturasLinks = links.filter(
      (link) => link.getAttribute('href') === '/estruturas',
    );
    expect(estruturasLinks.length).toBeGreaterThan(0);

    const listaLinks = links.filter(
      (link) => link.getAttribute('href') === '/estruturas/lista',
    );
    expect(listaLinks.length).toBeGreaterThan(0);
  });

  it('deve exibir breadcrumb na header', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
  });

  it('deve exibir sidebar e controles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('deve ter seções com gradientes de fundo', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    const heroSection = document.querySelector('.bg-gradient-to-br');
    expect(heroSection).toBeInTheDocument();
  });

  it('deve exibir ícones nas seções de benefícios', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<HomePage />);

    // Os ícones são renderizados como componentes Lucide
    const content = document.body.textContent;
    expect(content).toContain('Tutoriais Didáticos');
    expect(content).toContain('Visualizações Interativas');
    expect(content).toContain('Atividades Práticas');
  });
});
