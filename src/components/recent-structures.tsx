'use client';

import { useAppContext } from '@/contexts/AppContext';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export function RecentStructures() {
  const { progress } = useAppContext();

  const recentStructures = Object.entries(progress)
    .filter(([, data]) => data.lastVisited)
    .sort(([, dataA], [, dataB]) => {
      const dateA = dataA.lastVisited?.getTime() || 0;
      const dateB = dataB.lastVisited?.getTime() || 0;
      return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    })
    .slice(0, 3); // Pegar apenas os 3 mais recentes

  const structureNames: Record<string, string> = {
    arrays: 'Arrays e Vetores',
    stacks: 'Pilhas',
    queues: 'Filas',
    grafos: 'Grafos',
    arvores: 'Árvores',
    heaps: 'Heaps',
  };

  if (recentStructures.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg bg-muted/20">
      <h3 className="text-sm font-medium flex items-center gap-1 mb-3">
        <Clock className="w-3.5 h-3.5" />
        Visualizados recentemente
      </h3>
      <ul className="space-y-1.5">
        {recentStructures.map(([id]) => (
          <li key={id}>
            <Link
              href={`/estruturas/${id}`}
              className="text-sm hover:text-primary transition-colors"
            >
              {structureNames[id] || id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
