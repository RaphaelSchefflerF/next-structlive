'use client';

import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  structureId: string;
}

export function ProgressTracker({ structureId }: ProgressTrackerProps) {
  const { updateLastVisited, progress } = useAppContext();

  // Atualiza o último acesso sempre que o componente for montado
  useEffect(() => {
    updateLastVisited(structureId);
  }, [structureId, updateLastVisited]);

  // Calcula a porcentagem de conclusão (exemplo básico)
  const completionPercentage = progress[structureId]?.completed ? 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs">
        <span>Progresso:</span>
        <span>{completionPercentage}%</span>
      </div>
      <Progress value={completionPercentage} className="h-1.5" />
    </div>
  );
}
