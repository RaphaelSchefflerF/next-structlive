'use client';

import { useAppContext } from '@/contexts/AppContext';
import Link from 'next/link';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function DataStructureGrid() {
  const { dataStructures, progress } = useAppContext();

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Básico':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediário':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Avançado':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dataStructures.map((structure) => {
        const isCompleted = progress[structure.id]?.completed;

        return (
          <Link key={structure.id} href={`/estruturas/${structure.id}`}>
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">{structure.icon}</div>
                  <Badge
                    variant="outline"
                    className={getComplexityColor(structure.complexity)}
                  >
                    {structure.complexity}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{structure.title}</CardTitle>
                <CardDescription>{structure.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>{structure.lessons} lições</span>
                  {isCompleted && (
                    <span className="text-primary flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Concluído
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
