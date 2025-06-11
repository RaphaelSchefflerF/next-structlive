"use client";

// Importando os componentes de atividade específicos para cada tipo de lista
import LcActivity from "../types/lc/activity";
import LddeActivity from "../types/ldde/activity";
import LdseActivity from "../types/ldse/activity";
import LeeActivity from "../types/lee/activity";
import LesActivity from "../types/les/activity";

type Props = {
  tipo: string;
};

export default function ListActivity({ tipo }: Props) {
  switch (tipo) {
    case "lc":
      return <LcActivity />;
    case "ldde":
      return <LddeActivity />;
    case "ldse":
      return <LdseActivity />;
    case "lee":
      return <LeeActivity />;
    case "les":
      return <LesActivity />;
    default:
      return (
        <div>Selecione um tipo de lista para ver o conteúdo da atividade.</div>
      );
  }
}
