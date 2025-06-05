"use client";

// Importando os componentes de teoria específicos para cada tipo de lista
import LcTheory from "../tipos/lc/theory";
import LeTheory from "../tipos/le/theory";
import LdseTheory from "../tipos/ldse/theory";
import LddeTheory from "../tipos/ldde/theory";
import LeeTheory from "../tipos/lee/theory";
import LesTheory from "../tipos/les/theory";

type Props = {
  tipo: string;
};

export default function ListTheory({ tipo }: Props) {
  switch (tipo) {
    case "lc":
      return <LcTheory />;
    case "le":
      return <LeTheory />;
    case "ldse":
      return <LdseTheory />;
    case "ldde":
      return <LddeTheory />;
    case "lee":
      return <LeeTheory />;
    case "les":
      return <LesTheory />;
    default:
      return <div>Selecione um tipo de lista para ver o conteúdo teórico.</div>;
  }
}
