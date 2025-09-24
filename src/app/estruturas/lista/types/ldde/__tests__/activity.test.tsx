// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\ldde\__tests__\activity.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LddeActivity from '../activity';

describe('LddeActivity', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LddeActivity />);

    expect(
      screen.getByText(
        'Atividade da Lista Dinâmica Duplamente Encadeada (atividade aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LddeActivity />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico da LDDE', () => {
    render(<LddeActivity />);

    const text = screen.getByText(/Lista Dinâmica Duplamente Encadeada/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('atividade aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LddeActivity />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LddeActivity />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain(
      'Lista Dinâmica Duplamente Encadeada',
    );
  });
});
