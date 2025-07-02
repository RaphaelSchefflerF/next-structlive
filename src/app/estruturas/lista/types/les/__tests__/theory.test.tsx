// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\les\__tests__\theory.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LesTheory from '../theory';

describe('LesTheory', () => {
  it('deve renderizar o componente com texto correto', () => {
    render(<LesTheory />);

    expect(
      screen.getByText(/Teoria para Lista Estática Sequencial/),
    ).toBeInTheDocument();
  });

  it('deve renderizar um elemento div', () => {
    const { container } = render(<LesTheory />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('deve ter o texto específico de teoria da LES', () => {
    render(<LesTheory />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Teoria');
  });

  it('deve não estar vazio', () => {
    const { container } = render(<LesTheory />);

    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('deve ter estrutura DOM válida', () => {
    const { container } = render(<LesTheory />);

    expect(container.innerHTML).toBeTruthy();
    expect(container.textContent).toContain('Teoria');
    expect(container.textContent).toContain('Lista Estática Sequencial');
  });

  it('deve ter o componente exportado como padrão', () => {
    expect(LesTheory).toBeDefined();
    expect(typeof LesTheory).toBe('function');
  });

  it('deve ser um componente React válido', () => {
    const component = render(<LesTheory />);
    expect(component).toBeDefined();
  });

  it('deve diferenciar de outros tipos de lista', () => {
    render(<LesTheory />);

    const text = screen.getByText(/Lista Estática Sequencial/);
    expect(text).not.toHaveTextContent('Dinâmica');
    expect(text).not.toHaveTextContent('Encadeada');
    expect(text).not.toHaveTextContent('Duplamente');
  });

  it('deve conter apenas texto de teoria', () => {
    render(<LesTheory />);

    expect(
      screen.getByText(/Teoria para Lista Estática Sequencial/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Desafio/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Atividade/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Visualização/)).not.toBeInTheDocument();
  });
});
