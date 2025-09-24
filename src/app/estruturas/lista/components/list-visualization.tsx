"use client";

// Importando os componentes de visualização específicos para cada tipo de lista
import LcVisualization from "../types/lc/visualization";
import LddeVisualization from "../types/ldde/visualization";
import LdseVisualization from "../types/ldse/visualization";
import LeeVisualization from "../types/lee/visualization";
import LesVisualization from "../types/les/visualization";

type Props = {
  tipo: string;
};

export default function ListVisualization({ tipo }: Props) {
  switch (tipo) {
    case "lc":
      return <LcVisualization />;
    case "ldde":
      return <LddeVisualization />;
    case "ldse":
      return <LdseVisualization />;
    case "lee":
      return <LeeVisualization />;
    case "les":
      return <LesVisualization />;
    default:
      return <div>Selecione um tipo de lista para ver o conteúdo teórico.</div>;
  }
}
