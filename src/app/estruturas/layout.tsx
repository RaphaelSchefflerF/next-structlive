import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estruturas de Dados',
  description: 'Aprenda estruturas de dados de forma interativa',
};

export default function EstruturasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
