// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\les\__tests__\visualization.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LesVisualization from '../visualization';

describe('LesVisualization', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LesVisualization />);

    expect(
      screen.getByText(
        'Visualização da Lista Estática Sequencial (animação aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LesVisualization />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de visualização da LES', () => {
    render(<LesVisualization />);

    const text = screen.getByText(/Visualização da Lista Estática Sequencial/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('animação aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LesVisualization />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LesVisualization />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Visualização');
    expect(container.textContent).toContain('Lista Estática Sequencial');
    expect(container.textContent).toContain('animação');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LesVisualization).toBeDefined();
    expect(typeof LesVisualization).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LesVisualization />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LesVisualization />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Encadeada');
    expect(text).not.toHaveTextContent('Duplamente');
  });

  it('deve conter apenas texto de visualização', () => {
    render(<LesVisualization />);

    expect(
      screen.getByText(/Visualização da Lista Estática Sequencial/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Desafio/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Teoria/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Atividade.*\(/)).not.toBeInTheDocument();
  });

  it('deve mencionar animação', () => {
    render(<LesVisualization />);

    expect(screen.getByText(/animação aqui/)).toBeInTheDocument();
  });
});
