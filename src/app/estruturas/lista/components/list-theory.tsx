"use client";

// Importando os componentes de teoria específicos para cada tipo de lista
import LcTheory from "../types/lc/theory";
import LdseTheory from "../types/ldse/theory";
import LddeTheory from "../types/ldde/theory";
import LeeTheory from "../types/lee/theory";
import LesTheory from "../types/les/theory";

type Props = {
  tipo: string;
};

export default function ListTheory({ tipo }: Props) {
  switch (tipo) {
    case "lc":
      return <LcTheory />;
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
