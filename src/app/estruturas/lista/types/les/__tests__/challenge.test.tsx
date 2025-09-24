// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\les\__tests__\challenge.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LesChallenge from '../challenge';

describe('LesChallenge', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LesChallenge />);

    expect(
      screen.getByText('Desafios da Lista Estática Sequencial'),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LesChallenge />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de desafios da LES', () => {
    render(<LesChallenge />);

    const text = screen.getByText(/Desafios da Lista Estática Sequencial/);
    expect(text).toBeInTheDocument();
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LesChallenge />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LesChallenge />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Desafios');
    expect(container.textContent).toContain('Lista Estática Sequencial');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LesChallenge).toBeDefined();
    expect(typeof LesChallenge).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LesChallenge />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LesChallenge />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Encadeada');
    expect(text).not.toHaveTextContent('Duplamente');
  });

  it('deve conter apenas texto de desafio', () => {
    render(<LesChallenge />);

    expect(
      screen.getByText('Desafios da Lista Estática Sequencial'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Teoria/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Atividade/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Visualização/)).not.toBeInTheDocument();
  });
});
