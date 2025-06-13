import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LdseTheory from '../theory';

describe('LdseTheory', () => {
  it('deve renderizar título principal', () => {
    render(<LdseTheory />);

    expect(screen.getByText('O que é uma Lista?')).toBeInTheDocument();
  });

  it('deve exibir descrição da lista', () => {
    render(<LdseTheory />);

    const description = screen.getByText(
      /Uma lista é uma estrutura de dados linear/,
    );
    expect(description).toBeInTheDocument();
  });

  it('deve listar operações básicas', () => {
    render(<LdseTheory />);

    expect(screen.getByText('Operações Básicas')).toBeInTheDocument();
    expect(screen.getByText(/add\/append/)).toBeInTheDocument();
    expect(screen.getByText(/insert/)).toBeInTheDocument();
    expect(screen.getByText(/remove/)).toBeInTheDocument();
    expect(screen.getByText(/get/)).toBeInTheDocument();
  });

  it('deve exibir tipos de listas', () => {
    render(<LdseTheory />);

    expect(screen.getByText('Tipos de Listas')).toBeInTheDocument();
    expect(
      screen.getByText('Lista Simplesmente Encadeada'),
    ).toBeInTheDocument();
    expect(screen.getByText('Lista Duplamente Encadeada')).toBeInTheDocument();
    expect(screen.getByText('Lista Circular')).toBeInTheDocument();
  });

  it('deve conter explicações detalhadas para cada tipo', () => {
    render(<LdseTheory />);

    expect(
      screen.getByText(
        /Cada nó contém o dado e uma referência para o próximo nó/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/referências para os nós anterior e próximo/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/O último nó aponta para o primeiro/),
    ).toBeInTheDocument();
  });
});
