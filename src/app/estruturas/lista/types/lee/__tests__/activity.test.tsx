// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\lee\__tests__\activity.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeeActivity from '../activity';

describe('LeeActivity', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LeeActivity />);

    expect(
      screen.getByText(
        'Atividade da Lista Estática Encadeada (atividade aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LeeActivity />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico da LEE', () => {
    render(<LeeActivity />);

    const text = screen.getByText(/Lista Estática Encadeada/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Atividade');
    expect(text).toHaveTextContent('atividade aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LeeActivity />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LeeActivity />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Lista Estática Encadeada');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LeeActivity).toBeDefined();
    expect(typeof LeeActivity).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LeeActivity />);
    expect(component).toBeDefined();
  });
});
