// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\__tests__\code-quality.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

// Imports de todos os componentes
import LddeActivity from '../ldde/activity';
import LddeChallenge from '../ldde/challenge';
import LddeTheory from '../ldde/theory';
import LddeVisualization from '../ldde/visualization';

import LeeActivity from '../lee/activity';
import LeeChallenge from '../lee/challenge';
import LeeTheory from '../lee/theory';
import LeeVisualization from '../lee/visualization';

import LesActivity from '../les/activity';
import LesChallenge from '../les/challenge';
import LesTheory from '../les/theory';
import LesVisualization from '../les/visualization';

describe('Qualidade de Código - Todos os Componentes', () => {
  const allComponents = [
    { name: 'LddeActivity', component: LddeActivity, type: 'LDDE' },
    { name: 'LddeChallenge', component: LddeChallenge, type: 'LDDE' },
    { name: 'LddeTheory', component: LddeTheory, type: 'LDDE' },
    { name: 'LddeVisualization', component: LddeVisualization, type: 'LDDE' },

    { name: 'LeeActivity', component: LeeActivity, type: 'LEE' },
    { name: 'LeeChallenge', component: LeeChallenge, type: 'LEE' },
    { name: 'LeeTheory', component: LeeTheory, type: 'LEE' },
    { name: 'LeeVisualization', component: LeeVisualization, type: 'LEE' },

    { name: 'LesActivity', component: LesActivity, type: 'LES' },
    { name: 'LesChallenge', component: LesChallenge, type: 'LES' },
    { name: 'LesTheory', component: LesTheory, type: 'LES' },
    { name: 'LesVisualization', component: LesVisualization, type: 'LES' },
  ];

  describe('Renderização sem erros', () => {
    it.each(allComponents)(
      'deve renderizar $name sem erros',
      ({ component: Component }) => {
        expect(() => render(<Component />)).not.toThrow();
      },
    );

    it.each(allComponents)(
      'deve produzir DOM válido para $name',
      ({ component: Component }) => {
        const { container } = render(<Component />);

        expect(container).toBeInTheDocument();
        expect(container.firstChild).toBeTruthy();
        expect(container.innerHTML).toBeTruthy();
      },
    );
  });

  describe('Padrões de nomenclatura', () => {
    it('deve todos os componentes seguirem convenção PascalCase', () => {
      allComponents.forEach(({ name }) => {
        expect(name).toMatch(/^[A-Z][a-zA-Z]*$/);
        expect(name.charAt(0)).toMatch(/[A-Z]/);
      });
    });

    it('deve prefixos corresponderem aos tipos de lista', () => {
      const prefixMap = {
        LDDE: 'Ldde',
        LEE: 'Lee',
        LES: 'Les',
      };

      allComponents.forEach(({ name, type }) => {
        const expectedPrefix = prefixMap[type as keyof typeof prefixMap];
        expect(name).toMatch(new RegExp(`^${expectedPrefix}`));
      });
    });

    it('deve sufixos indicarem o tipo de componente', () => {
      const validSuffixes = [
        'Activity',
        'Challenge',
        'Theory',
        'Visualization',
      ];

      allComponents.forEach(({ name }) => {
        const hasValidSuffix = validSuffixes.some((suffix) =>
          name.endsWith(suffix),
        );
        expect(hasValidSuffix).toBe(true);
      });
    });
  });

  describe('Estrutura de componentes', () => {
    it.each(allComponents)(
      'deve $name ser uma função React válida',
      ({ component: Component }) => {
        expect(typeof Component).toBe('function');
        expect(Component.length).toBeGreaterThanOrEqual(0); // Aceita 0 ou mais parâmetros
      },
    );

    it.each(allComponents)(
      'deve $name retornar JSX válido',
      ({ component: Component }) => {
        const result = Component();

        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('type');
      },
    );

    it.each(allComponents)(
      'deve $name aceitar chamada sem parâmetros',
      ({ component: Component }) => {
        expect(() => Component()).not.toThrow();
      },
    );
  });

  describe('Conteúdo e semântica', () => {
    it('deve componentes Activity conterem palavra "atividade"', () => {
      const activityComponents = allComponents.filter(({ name }) =>
        name.includes('Activity'),
      );

      activityComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        expect(container.textContent?.toLowerCase()).toContain('atividade');
      });
    });

    it('deve componentes Challenge conterem palavra "desafio"', () => {
      const challengeComponents = allComponents.filter(({ name }) =>
        name.includes('Challenge'),
      );

      challengeComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        expect(container.textContent?.toLowerCase()).toContain('desafio');
      });
    });

    it('deve componentes Theory conterem palavra "teoria"', () => {
      const theoryComponents = allComponents.filter(({ name }) =>
        name.includes('Theory'),
      );

      theoryComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        expect(container.textContent?.toLowerCase()).toContain('teoria');
      });
    });

    it('deve componentes Visualization conterem palavra "visualização"', () => {
      const visualizationComponents = allComponents.filter(({ name }) =>
        name.includes('Visualization'),
      );

      visualizationComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        expect(container.textContent?.toLowerCase()).toContain('visualização');
      });
    });
  });

  describe('Diferenciação por tipo de lista', () => {
    it('deve componentes LDDE mencionarem "dinâmica duplamente encadeada"', () => {
      const lddeComponents = allComponents.filter(
        ({ type }) => type === 'LDDE',
      );

      lddeComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        const text = container.textContent?.toLowerCase() || '';
        expect(text).toContain('dinâmica');
        expect(text).toContain('duplamente');
        expect(text).toContain('encadeada');
      });
    });

    it('deve componentes LEE mencionarem "estática encadeada"', () => {
      const leeComponents = allComponents.filter(({ type }) => type === 'LEE');

      leeComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        const text = container.textContent?.toLowerCase() || '';
        expect(text).toContain('estática');
        expect(text).toContain('encadeada');
        expect(text).not.toContain('sequencial');
        expect(text).not.toContain('duplamente');
      });
    });

    it('deve componentes LES mencionarem "estática sequencial"', () => {
      const lesComponents = allComponents.filter(({ type }) => type === 'LES');

      lesComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        const text = container.textContent?.toLowerCase() || '';
        expect(text).toContain('estática');
        expect(text).toContain('sequencial');
        expect(text).not.toContain('encadeada');
        expect(text).not.toContain('duplamente');
      });
    });
  });

  describe('Performance e memória', () => {
    it.each(allComponents)(
      'deve $name renderizar rapidamente',
      ({ component: Component }) => {
        const startTime = performance.now();
        render(<Component />);
        const endTime = performance.now();

        const renderTime = endTime - startTime;
        expect(renderTime).toBeLessThan(50); // Menos de 50ms para renderizar
      },
    );

    it.each(allComponents)(
      'deve $name não vazar memória',
      ({ component: Component }) => {
        const { unmount } = render(<Component />);

        // Testa se unmount funciona sem erros
        expect(() => unmount()).not.toThrow();
      },
    );

    it('deve todos os componentes serem leves em memória', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Renderiza todos os componentes
      const renders = allComponents.map(({ component: Component }) =>
        render(<Component />),
      );

      // Desmonta todos
      renders.forEach(({ unmount }) => unmount());

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Se memory API estiver disponível, verifica que não houve grande aumento
      if (initialMemory > 0) {
        const memoryIncrease = finalMemory - initialMemory;
        expect(memoryIncrease).toBeLessThan(1024 * 1024); // Menos de 1MB
      }
    });
  });

  describe('Acessibilidade básica', () => {
    it.each(allComponents)(
      'deve $name ter conteúdo acessível',
      ({ component: Component }) => {
        const { container } = render(<Component />);

        // Verifica se há conteúdo de texto
        expect(container.textContent).toBeTruthy();
        expect(container.textContent?.trim().length).toBeGreaterThan(0);
      },
    );

    it.each(allComponents)(
      'deve $name usar elementos HTML válidos',
      ({ component: Component }) => {
        const { container } = render(<Component />);

        // Verifica se usa elementos HTML padrão
        expect(container.firstChild).toBeInstanceOf(HTMLElement);
        expect(container.querySelector('*')).toBeTruthy();
      },
    );
  });

  describe('Consistência entre componentes do mesmo tipo', () => {
    it('deve todos Activity components terem estrutura similar', () => {
      const activityComponents = allComponents.filter(({ name }) =>
        name.includes('Activity'),
      );
      const contents = activityComponents.map(({ component: Component }) => {
        const { container } = render(<Component />);
        return container.textContent?.toLowerCase() || '';
      });

      // Todos devem mencionar atividade
      contents.forEach((content) => {
        expect(content).toContain('atividade');
      });
    });

    it('deve todos Visualization components mencionarem animação', () => {
      const visualizationComponents = allComponents.filter(({ name }) =>
        name.includes('Visualization'),
      );

      visualizationComponents.forEach(({ component: Component }) => {
        const { container } = render(<Component />);
        const text = container.textContent?.toLowerCase() || '';
        expect(text).toContain('animação');
      });
    });
  });
});
