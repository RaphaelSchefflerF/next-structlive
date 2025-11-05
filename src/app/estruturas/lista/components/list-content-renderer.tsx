import { listRegistry } from "../config";

type Props = {
  listType: keyof typeof listRegistry;
  contentType: "theory" | "visualization" | "activity" | "challenge";
};

export default function ListContentRenderer({ listType, contentType }: Props) {
  const list = listRegistry[listType];
  if (!list) return <div>Tipo de lista não encontrado.</div>;

  const Component = list.components[contentType];
  if (!Component) return <div>Conteúdo não encontrado.</div>;

  return <Component />;
}
