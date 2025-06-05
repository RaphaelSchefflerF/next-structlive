"use client";

// Importando os componentes de visualização específicos para cada tipo de lista
import LcVisualization from "../tipos/lc/visualization";
import LeVisualization from "../tipos/le/visualization";
import LddeVisualization from "../tipos/ldde/visualization";
import LdseVisualization from "../tipos/ldse/visualization";
import LeeVisualization from "../tipos/lee/visualization";
import LesVisualization from "../tipos/les/visualization";

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
    case "le":
      return <LeVisualization />;
    case "lee":
      return <LeeVisualization />;
    case "les":
      return <LesVisualization />;
    default:
      return <div>Selecione um tipo de lista para ver o conteúdo teórico.</div>;
  }
}
