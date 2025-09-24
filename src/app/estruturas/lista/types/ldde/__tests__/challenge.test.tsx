// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldde\__tests__\challenge.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LddeChallenge from '../challenge';

describe('LddeChallenge', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LddeChallenge />);

    expect(
      screen.getByText('Desafios da Lista Dinâmica Duplamente Encadeada'),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LddeChallenge />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de desafios da LDDE', () => {
    render(<LddeChallenge />);

    const text = screen.getByText(
      /Desafios da Lista Dinâmica Duplamente Encadeada/,
    );
    expect(text).toBeInTheDocument();
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LddeChallenge />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LddeChallenge />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Desafios');
    expect(container.textContent).toContain(
      'Lista Dinâmica Duplamente Encadeada',
    );
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LddeChallenge).toBeDefined();
    expect(typeof LddeChallenge).toBe('function');
  });
});
