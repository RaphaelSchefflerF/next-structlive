// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\lee\__tests__\theory.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeeTheory from '../theory';

describe('LeeTheory', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LeeTheory />);

    expect(
      screen.getByText(/Teoria para Lista Estática Encadeada/),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LeeTheory />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de teoria da LEE', () => {
    render(<LeeTheory />);

    const text = screen.getByText(/Lista Estática Encadeada/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Teoria');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LeeTheory />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LeeTheory />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Teoria');
    expect(container.textContent).toContain('Lista Estática Encadeada');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LeeTheory).toBeDefined();
    expect(typeof LeeTheory).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LeeTheory />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LeeTheory />);

    const text = screen.getByText(/Lista Estática Encadeada/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Sequencial');
    expect(text).not.toHaveTextContent('Duplamente');
  });
});
