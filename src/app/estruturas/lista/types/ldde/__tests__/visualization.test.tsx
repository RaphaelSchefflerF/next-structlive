// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldde\__tests__\visualization.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LddeVisualization from '../visualization';

describe('LddeVisualization', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LddeVisualization />);

    expect(
      screen.getByText(
        'Visualização da Lista Dinâmica Duplamente Encadeada (animação aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LddeVisualization />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de visualização da LDDE', () => {
    render(<LddeVisualization />);

    const text = screen.getByText(
      /Visualização da Lista Dinâmica Duplamente Encadeada/,
    );
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('animação aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LddeVisualization />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LddeVisualization />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Visualização');
    expect(container.textContent).toContain(
      'Lista Dinâmica Duplamente Encadeada',
    );
    expect(container.textContent).toContain('animação');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LddeVisualization).toBeDefined();
    expect(typeof LddeVisualization).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LddeVisualization />);
    expect(component).toBeDefined();
  });
});
