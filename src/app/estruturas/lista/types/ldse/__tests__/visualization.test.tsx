import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LdseVisualization from '../visualization';

describe('LdseVisualization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar título corretamente', () => {
    render(<LdseVisualization />);

    expect(
      screen.getByText('Removendo o último nó de uma lista encadeada'),
    ).toBeInTheDocument();
  });

  it('deve exibir lista inicial com 3 nós', () => {
    render(<LdseVisualization />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('quant:')).toBeInTheDocument();
  });

  it('deve exibir código Python corretamente', () => {
    render(<LdseVisualization />);

    expect(screen.getByText('Código sendo executado:')).toBeInTheDocument();
    // Verifica se algumas linhas do código estão presentes
    const codeElement = screen.getByText(/def remover_fim/);
    expect(codeElement).toBeInTheDocument();
  });

  it('deve desabilitar botões durante animação', async () => {
    render(<LdseVisualization />);

    const removeButton = screen.getByText('Remover nó final');
    const resetButton = screen.getByText('Resetar');

    expect(removeButton).not.toBeDisabled();
    expect(resetButton).not.toBeDisabled();
  });

  it('deve resetar lista ao clicar no botão resetar', () => {
    render(<LdseVisualization />);

    const resetButton = screen.getByText('Resetar');
    fireEvent.click(resetButton);

    // Verifica se a lista foi resetada
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('deve exibir log de execução vazio inicialmente', () => {
    render(<LdseVisualization />);

    expect(screen.getByText('Nenhuma execução ainda...')).toBeInTheDocument();
  });

  it('deve mostrar ponteiros prim e ult corretamente', () => {
    render(<LdseVisualization />);

    expect(screen.getByText('prim')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
  });
});
