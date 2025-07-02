// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\lee\__tests__\visualization.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeeVisualization from '../visualization';

describe('LeeVisualization', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LeeVisualization />);

    expect(
      screen.getByText(
        'Visualização da Lista Estática Encadeada (animação aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LeeVisualization />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de visualização da LEE', () => {
    render(<LeeVisualization />);

    const text = screen.getByText(/Visualização da Lista Estática Encadeada/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('animação aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LeeVisualization />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LeeVisualization />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Visualização');
    expect(container.textContent).toContain('Lista Estática Encadeada');
    expect(container.textContent).toContain('animação');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LeeVisualization).toBeDefined();
    expect(typeof LeeVisualization).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LeeVisualization />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LeeVisualization />);

    const text = screen.getByText(/Lista Estática Encadeada/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Sequencial');
    expect(text).not.toHaveTextContent('Duplamente');
  });
});
