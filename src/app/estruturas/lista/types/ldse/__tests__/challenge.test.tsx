import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LdseActivity from '../challenge';

// Mock do Monaco Editor
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ onChange, value }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )),
}));

// Mock da análise de código
vi.mock('../ai_analysis', () => ({
  analyzeCode: vi.fn().mockResolvedValue('Análise mockada do código'),
}));

describe('LdseActivity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar título do desafio', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText(/Desafio Prático: Implementar Lista Dinâmica/),
    ).toBeInTheDocument();
  });

  it('deve exibir objetivo do desafio', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText(/Implemente uma Lista Dinâmica Simplesmente Encadeada/),
    ).toBeInTheDocument();
  });

  it('deve listar todos os requisitos', () => {
    render(<LdseActivity />);

    expect(screen.getByText(/Criar uma classe.*No/)).toBeInTheDocument();
    expect(screen.getByText(/inserir_inicio\(dado\)/)).toBeInTheDocument();
    expect(screen.getByText(/inserir_fim\(dado\)/)).toBeInTheDocument();
    expect(screen.getByText(/remover_inicio\(\)/)).toBeInTheDocument();
  });

  it('deve renderizar editor de código', () => {
    render(<LdseActivity />);

    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('deve permitir copiar código', async () => {
    render(<LdseActivity />);

    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('deve mostrar toast de erro quando código está vazio', async () => {
    const { toast } = await import('sonner');

    render(<LdseActivity />);

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    expect(toast.error).toHaveBeenCalledWith(
      'Digite algum código antes de analisar!',
    );
  });

  it('deve atualizar código no editor', () => {
    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'class No:\n    pass' } });

    expect(editor).toHaveValue('class No:\n    pass');
  });

  it('deve mostrar loading durante análise', async () => {
    render(<LdseActivity />);

    // Simula código no editor
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'test code' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    // Verifica se o estado de loading é mostrado
    expect(screen.getByText('Analisando...')).toBeInTheDocument();
  });

  it('deve exibir análise após conclusão', async () => {
    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'class No: pass' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByText('Análise da IA')).toBeInTheDocument();
    });
  });
});
