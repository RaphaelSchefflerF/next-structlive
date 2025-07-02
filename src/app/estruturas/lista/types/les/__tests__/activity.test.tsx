// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\les\__tests__\activity.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LesActivity from '../activity';

describe('LesActivity', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LesActivity />);

    expect(
      screen.getByText(
        'Atividade da Lista Estática Sequencial (atividade aqui)',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LesActivity />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico da LES', () => {
    render(<LesActivity />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Atividade');
    expect(text).toHaveTextContent('atividade aqui');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LesActivity />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LesActivity />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Lista Estática Sequencial');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LesActivity).toBeDefined();
    expect(typeof LesActivity).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LesActivity />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LesActivity />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Encadeada');
    expect(text).not.toHaveTextContent('Duplamente');
  });
});
