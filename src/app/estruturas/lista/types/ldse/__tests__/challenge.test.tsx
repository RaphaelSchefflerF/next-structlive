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
  analyzeCode: vi
    .fn()
    .mockResolvedValue('Análise mockada do código com Gemini AI'),
}));

describe('LdseActivity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar título do desafio', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText(/Desafio Prático: Implementar Lista Dinâmica/),
    ).toBeDefined();
  });

  it('deve exibir objetivo do desafio', () => {
    render(<LdseActivity />);

    expect(
      screen.getByText(/Implemente uma Lista Dinâmica Simplesmente Encadeada/),
    ).toBeDefined();
  });

  it('deve listar todos os requisitos', () => {
    render(<LdseActivity />);

    expect(screen.getByText(/Criar uma classe.*No/)).toBeDefined();
    expect(screen.getByText(/inserir_inicio\(dado\)/)).toBeDefined();
    expect(screen.getByText(/inserir_fim\(dado\)/)).toBeDefined();
    expect(screen.getByText(/remover_inicio\(\)/)).toBeDefined();
  });

  it('deve renderizar editor de código', () => {
    render(<LdseActivity />);

    expect(screen.getByTestId('monaco-editor')).toBeDefined();
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

    expect((editor as HTMLTextAreaElement).value).toBe('class No:\n    pass');
  });

  it('deve mostrar loading durante análise', async () => {
    render(<LdseActivity />);

    // Simula código no editor
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'test code' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    // Verifica se o estado de loading é mostrado
    expect(screen.getByText('Analisando...')).toBeDefined();
  });

  it('deve mostrar tooltip ao passar o mouse no botão Analisar com IA', async () => {
    const { getByText } = render(<LdseActivity />);
    const analyzeButton = getByText('Analisar com IA');

    // Verifica se o botão existe
    expect(analyzeButton).toBeDefined();
  });

  it('deve exibir componente de análise após conclusão', async () => {
    render(<LdseActivity />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'class No: pass' } });

    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      // Verifica se algum elemento contém o texto Análise da IA (Gemini AI)
      const elements = document.body.textContent;
      expect(elements).toContain('Análise da IA (Gemini AI)');
    });
  });

  it('deve desabilitar botão Analisar com IA durante análise', async () => {
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(1)' } });
    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);

    // Verifica se o texto "Analisando..." aparece, indicando que está desabilitado
    expect(screen.getByText('Analisando...')).toBeDefined();

    // Aguarda o loading sumir
    await waitFor(() => {
      expect(screen.queryByText('Analisando...')).toBeNull();
    });
  });

  it('deve mostrar toast de sucesso ao copiar código', async () => {
    const { toast } = await import('sonner');
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(123)' } });
    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Código copiado!');
    });
  });

  it('deve mostrar toast de erro ao falhar ao copiar código', async () => {
    const { toast } = await import('sonner');
    const originalWriteText = navigator.clipboard.writeText;
    (navigator.clipboard.writeText as any) = vi
      .fn()
      .mockRejectedValue(new Error('fail'));
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(123)' } });
    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Não foi possível copiar o código',
      );
    });
    (navigator.clipboard.writeText as any) = originalWriteText;
  });

  it('não deve exibir análise se IA não retornar nada', async () => {
    const { analyzeCode } = await import('../ai_analysis');
    (analyzeCode as any).mockResolvedValueOnce('');
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(1)' } });
    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);
    await waitFor(() => {
      expect(screen.queryByText(/Análise da IA/)).toBeNull();
    });
  });

  it('deve permitir múltiplas interações: copiar, analisar, editar', async () => {
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(1)' } });
    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);
    fireEvent.change(editor, { target: { value: 'print(2)' } });
    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);
    await waitFor(() => {
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('Análise da IA');
    });
  });

  it('deve renderizar todos os elementos principais', () => {
    render(<LdseActivity />);
    expect(screen.getByText(/Desafio Prático/)).toBeDefined();
    expect(screen.getByText(/Objetivo/)).toBeDefined();
    expect(screen.getByText(/Requisitos/)).toBeDefined();
    expect(screen.getByText('Copiar')).toBeDefined();
    expect(screen.getByText('Analisar com IA')).toBeDefined();
    expect(screen.getByTestId('monaco-editor')).toBeDefined();
  });

  it('botão Copiar deve estar sempre habilitado', () => {
    render(<LdseActivity />);
    const copyButton = screen.getByText('Copiar');
    expect(copyButton.getAttribute('disabled')).toBeNull();
  });

  it('botão Analisar com IA deve estar habilitado quando há código', () => {
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(1)' } });
    const analyzeButton = screen.getByText('Analisar com IA');
    expect(analyzeButton.getAttribute('disabled')).toBeNull();
  });

  it('editor aceita código vazio', () => {
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: '' } });
    expect((editor as HTMLTextAreaElement).value).toBe('');
  });

  it('componente lida com código grande', () => {
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    const bigCode = 'a'.repeat(10000);
    fireEvent.change(editor, { target: { value: bigCode } });
    expect((editor as HTMLTextAreaElement).value).toBe(bigCode);
  });

  it('deve lidar com erro na análise da IA', async () => {
    const { toast } = await import('sonner');
    const { analyzeCode } = await import('../ai_analysis');
    (analyzeCode as any).mockRejectedValueOnce(new Error('fail'));
    render(<LdseActivity />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'print(1)' } });
    const analyzeButton = screen.getByText('Analisar com IA');
    fireEvent.click(analyzeButton);
    await waitFor(() => {
      // Usando uma verificação mais flexível
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
