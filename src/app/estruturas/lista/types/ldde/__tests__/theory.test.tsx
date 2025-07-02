// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldde\__tests__\theory.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LddeTheory from '../theory';

describe('LddeTheory', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LddeTheory />);

    expect(
      screen.getByText(/Teoria para Lista Dinâmica Duplamente Encadeada/),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LddeTheory />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de teoria da LDDE', () => {
    render(<LddeTheory />);

    const text = screen.getByText(/Lista Dinâmica Duplamente Encadeada/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Teoria');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LddeTheory />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LddeTheory />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Teoria');
    expect(container.textContent).toContain(
      'Lista Dinâmica Duplamente Encadeada',
    );
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LddeTheory).toBeDefined();
    expect(typeof LddeTheory).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LddeTheory />);
    expect(component).toBeDefined();
  });
});
