// filepath: c:\Users\kaua\Desktop\faculdade\StructLive\src\app\estruturas\lista\types\__tests__\integration-all-lists.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// LDDE imports
import LddeActivity from '../ldde/activity';
import LddeChallenge from '../ldde/challenge';
import LddeTheory from '../ldde/theory';
import LddeVisualization from '../ldde/visualization';

// LEE imports
import LeeActivity from '../lee/activity';
import LeeChallenge from '../lee/challenge';
import LeeTheory from '../lee/theory';
import LeeVisualization from '../lee/visualization';

// LES imports
import LesActivity from '../les/activity';
import LesChallenge from '../les/challenge';
import LesTheory from '../les/theory';
import LesVisualization from '../les/visualization';

describe('Integração - Todos os Tipos de Lista', () => {
  describe('LDDE - Lista Dinâmica Duplamente Encadeada', () => {
    it('deve renderizar todos os componentes LDDE corretamente', () => {
      // Activity
      const { unmount: unmountActivity } = render(<LddeActivity />);
      expect(
        screen.getByText(/Lista Dinâmica Duplamente Encadeada.*atividade/),
      ).toBeInTheDocument();
      unmountActivity();

      // Challenge
      const { unmount: unmountChallenge } = render(<LddeChallenge />);
      expect(
        screen.getByText(/Desafios da Lista Dinâmica Duplamente Encadeada/),
      ).toBeInTheDocument();
      unmountChallenge();

      // Theory
      const { unmount: unmountTheory } = render(<LddeTheory />);
      expect(
        screen.getByText(/Teoria para Lista Dinâmica Duplamente Encadeada/),
      ).toBeInTheDocument();
      unmountTheory();

      // Visualization
      const { unmount: unmountVisualization } = render(<LddeVisualization />);
      expect(
        screen.getByText(/Visualização da Lista Dinâmica Duplamente Encadeada/),
      ).toBeInTheDocument();
      unmountVisualization();
    });

    it('deve manter consistência nos nomes LDDE', () => {
      const components = [
        LddeActivity,
        LddeChallenge,
        LddeTheory,
        LddeVisualization,
      ];

      components.forEach((component) => {
        expect(component).toBeDefined();
        expect(typeof component).toBe('function');
        expect(component.name).toMatch(/^Ldde/);
      });
    });
  });

  describe('LEE - Lista Estática Encadeada', () => {
    it('deve renderizar todos os componentes LEE corretamente', () => {
      // Activity
      const { unmount: unmountActivity } = render(<LeeActivity />);
      expect(
        screen.getByText(/Lista Estática Encadeada.*atividade/),
      ).toBeInTheDocument();
      unmountActivity();

      // Challenge
      const { unmount: unmountChallenge } = render(<LeeChallenge />);
      expect(
        screen.getByText(/Desafios da Lista Estática Encadeada/),
      ).toBeInTheDocument();
      unmountChallenge();

      // Theory
      const { unmount: unmountTheory } = render(<LeeTheory />);
      expect(
        screen.getByText(/Teoria para Lista Estática Encadeada/),
      ).toBeInTheDocument();
      unmountTheory();

      // Visualization
      const { unmount: unmountVisualization } = render(<LeeVisualization />);
      expect(
        screen.getByText(/Visualização da Lista Estática Encadeada/),
      ).toBeInTheDocument();
      unmountVisualization();
    });

    it('deve manter consistência nos nomes LEE', () => {
      const components = [
        LeeActivity,
        LeeChallenge,
        LeeTheory,
        LeeVisualization,
      ];

      components.forEach((component) => {
        expect(component).toBeDefined();
        expect(typeof component).toBe('function');
        expect(component.name).toMatch(/^Lee/);
      });
    });
  });

  describe('LES - Lista Estática Sequencial', () => {
    it('deve renderizar todos os componentes LES corretamente', () => {
      // Activity
      const { unmount: unmountActivity } = render(<LesActivity />);
      expect(
        screen.getByText(/Lista Estática Sequencial.*atividade/),
      ).toBeInTheDocument();
      unmountActivity();

      // Challenge
      const { unmount: unmountChallenge } = render(<LesChallenge />);
      expect(
        screen.getByText(/Desafios da Lista Estática Sequencial/),
      ).toBeInTheDocument();
      unmountChallenge();

      // Theory
      const { unmount: unmountTheory } = render(<LesTheory />);
      expect(
        screen.getByText(/Teoria para Lista Estática Sequencial/),
      ).toBeInTheDocument();
      unmountTheory();

      // Visualization
      const { unmount: unmountVisualization } = render(<LesVisualization />);
      expect(
        screen.getByText(/Visualização da Lista Estática Sequencial/),
      ).toBeInTheDocument();
      unmountVisualization();
    });

    it('deve manter consistência nos nomes LES', () => {
      const components = [
        LesActivity,
        LesChallenge,
        LesTheory,
        LesVisualization,
      ];

      components.forEach((component) => {
        expect(component).toBeDefined();
        expect(typeof component).toBe('function');
        expect(component.name).toMatch(/^Les/);
      });
    });
  });

  describe('Diferenciação entre tipos de lista', () => {
    it('deve diferenciar claramente entre LDDE, LEE e LES', () => {
      // LDDE
      const { unmount: unmountLdde } = render(<LddeActivity />);
      expect(
        screen.getByText(/Dinâmica Duplamente Encadeada/),
      ).toBeInTheDocument();
      expect(screen.queryByText(/Estática/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Sequencial/)).not.toBeInTheDocument();
      unmountLdde();

      // LEE
      const { unmount: unmountLee } = render(<LeeActivity />);
      expect(screen.getByText(/Estática Encadeada/)).toBeInTheDocument();
      expect(screen.queryByText(/Dinâmica/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Sequencial/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Duplamente/)).not.toBeInTheDocument();
      unmountLee();

      // LES
      const { unmount: unmountLes } = render(<LesActivity />);
      expect(screen.getByText(/Estática Sequencial/)).toBeInTheDocument();
      expect(screen.queryByText(/Dinâmica/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Encadeada/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Duplamente/)).not.toBeInTheDocument();
      unmountLes();
    });

    it('deve ter terminologias consistentes dentro de cada tipo', () => {
      // Verifica LDDE
      const lddeTypes = ['Atividade', 'Desafios', 'Teoria', 'Visualização'];
      const lddeComponents = [
        <LddeActivity />,
        <LddeChallenge />,
        <LddeTheory />,
        <LddeVisualization />,
      ];

      lddeComponents.forEach((component, index) => {
        const { unmount } = render(component);
        expect(
          screen.getByText(new RegExp(lddeTypes[index])),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Lista Dinâmica Duplamente Encadeada/),
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Estrutura de componentes consistente', () => {
    it('deve todos os componentes retornarem JSX válido', () => {
      const allComponents = [
        LddeActivity,
        LddeChallenge,
        LddeTheory,
        LddeVisualization,
        LeeActivity,
        LeeChallenge,
        LeeTheory,
        LeeVisualization,
        LesActivity,
        LesChallenge,
        LesTheory,
        LesVisualization,
      ];

      allComponents.forEach((Component) => {
        const { container } = render(<Component />);
        expect(container.firstChild).toBeTruthy();
        expect(container.firstChild).toBeInstanceOf(HTMLElement);
      });
    });

    it('deve todos os componentes terem export default', () => {
      const allComponents = [
        LddeActivity,
        LddeChallenge,
        LddeTheory,
        LddeVisualization,
        LeeActivity,
        LeeChallenge,
        LeeTheory,
        LeeVisualization,
        LesActivity,
        LesChallenge,
        LesTheory,
        LesVisualization,
      ];

      allComponents.forEach((Component) => {
        expect(Component).toBeDefined();
        expect(typeof Component).toBe('function');
      });
    });
  });

  describe('Padrões de nomenclatura', () => {
    it('deve seguir convenções de nomenclatura React', () => {
      const componentNames = [
        'LddeActivity',
        'LddeChallenge',
        'LddeTheory',
        'LddeVisualization',
        'LeeActivity',
        'LeeChallenge',
        'LeeTheory',
        'LeeVisualization',
        'LesActivity',
        'LesChallenge',
        'LesTheory',
        'LesVisualization',
      ];

      const allComponents = [
        LddeActivity,
        LddeChallenge,
        LddeTheory,
        LddeVisualization,
        LeeActivity,
        LeeChallenge,
        LeeTheory,
        LeeVisualization,
        LesActivity,
        LesChallenge,
        LesTheory,
        LesVisualization,
      ];

      allComponents.forEach((Component, index) => {
        expect(Component.name).toBe(componentNames[index]);
        expect(Component.name).toMatch(/^[A-Z]/); // Deve começar com maiúscula
        expect(Component.name).toMatch(
          /^(Ldde|Lee|Les)(Activity|Challenge|Theory|Visualization)$/,
        );
      });
    });

    it('deve usar prefixos corretos para cada tipo de lista', () => {
      // LDDE components
      expect(LddeActivity.name).toMatch(/^Ldde/);
      expect(LddeChallenge.name).toMatch(/^Ldde/);
      expect(LddeTheory.name).toMatch(/^Ldde/);
      expect(LddeVisualization.name).toMatch(/^Ldde/);

      // LEE components
      expect(LeeActivity.name).toMatch(/^Lee/);
      expect(LeeChallenge.name).toMatch(/^Lee/);
      expect(LeeTheory.name).toMatch(/^Lee/);
      expect(LeeVisualization.name).toMatch(/^Lee/);

      // LES components
      expect(LesActivity.name).toMatch(/^Les/);
      expect(LesChallenge.name).toMatch(/^Les/);
      expect(LesTheory.name).toMatch(/^Les/);
      expect(LesVisualization.name).toMatch(/^Les/);
    });
  });

  describe('Conteúdo específico por tipo de componente', () => {
    it('deve componentes Activity terem conteúdo de atividade', () => {
      const activityComponents = [LddeActivity, LeeActivity, LesActivity];

      activityComponents.forEach((Activity) => {
        const { unmount } = render(<Activity />);
        expect(screen.getByText(/[Aa]tividade/)).toBeInTheDocument();
        unmount();
      });
    });

    it('deve componentes Challenge terem conteúdo de desafio', () => {
      const challengeComponents = [LddeChallenge, LeeChallenge, LesChallenge];

      challengeComponents.forEach((Challenge) => {
        const { unmount } = render(<Challenge />);
        expect(screen.getByText(/[Dd]esafios?/)).toBeInTheDocument();
        unmount();
      });
    });

    it('deve componentes Theory terem conteúdo de teoria', () => {
      const theoryComponents = [LddeTheory, LeeTheory, LesTheory];

      theoryComponents.forEach((Theory) => {
        const { unmount } = render(<Theory />);
        expect(screen.getByText(/[Tt]eoria/)).toBeInTheDocument();
        unmount();
      });
    });

    it('deve componentes Visualization terem conteúdo de visualização', () => {
      const visualizationComponents = [
        LddeVisualization,
        LeeVisualization,
        LesVisualization,
      ];

      visualizationComponents.forEach((Visualization) => {
        const { unmount } = render(<Visualization />);
        expect(screen.getByText(/[Vv]isualização/)).toBeInTheDocument();
        expect(screen.getByText(/animação/)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
