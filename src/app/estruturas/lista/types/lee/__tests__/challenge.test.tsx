// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\lee\__tests__\challenge.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeeChallenge from '../challenge';

describe('LeeChallenge', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LeeChallenge />);

    expect(
      screen.getByText('Desafios da Lista Estática Encadeada'),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LeeChallenge />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de desafios da LEE', () => {
    render(<LeeChallenge />);

    const text = screen.getByText(/Desafios da Lista Estática Encadeada/);
    expect(text).toBeInTheDocument();
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LeeChallenge />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LeeChallenge />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Desafios');
    expect(container.textContent).toContain('Lista Estática Encadeada');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LeeChallenge).toBeDefined();
    expect(typeof LeeChallenge).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LeeChallenge />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LeeChallenge />);

    const text = screen.getByText(/Lista Estática Encadeada/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Sequencial');
  });
});
