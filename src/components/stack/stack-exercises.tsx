'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award, CheckCircle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';

// Importação dos componentes de exercícios
import { ParenthesesValidator } from './stack-exercises/parentheses-validator';
import { ReverseString } from './stack-exercises/reverse-string';
import { DecimalToBinary } from './stack-exercises/decimal-to-binary';
import { ExpressionEvaluation } from './stack-exercises/expression-evaluation';
import { StackChallenges } from './stack-exercises/stack-challenges';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  completed: boolean;
  component: React.ReactNode;
}

type StackOperationType = 'push' | 'pop' | 'peek' | 'size' | 'isEmpty';

interface Challenge {
  id: number;
  description: string;
  type: StackOperationType;
  expectedOutput?: string | number | boolean;
  completed: boolean;
}

export default function StackExercises() {
  const { markAsCompleted } = useAppContext();
  const [completed, setCompleted] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      description:
        "Adicione os elementos 'X', 'Y' e 'Z' à pilha (nesta ordem).",
      type: 'push',
      completed: false,
    },
    {
      id: 2,
      description: 'Remova o elemento do topo da pilha.',
      type: 'pop',
      expectedOutput: 'Z',
      completed: false,
    },
    {
      id: 3,
      description: 'Verifique qual elemento está no topo da pilha agora.',
      type: 'peek',
      expectedOutput: 'Y',
      completed: false,
    },
    {
      id: 4,
      description: "Adicione os elementos 'W' e 'V' à pilha.",
      type: 'push',
      completed: false,
    },
    {
      id: 5,
      description: 'Verifique quantos elementos a pilha possui atualmente.',
      type: 'size',
      expectedOutput: 4,
      completed: false,
    },
    {
      id: 6,
      description:
        'Esvazie a pilha usando pop e depois verifique se está vazia.',
      type: 'isEmpty',
      expectedOutput: true,
      completed: false,
    },
  ]);

  const markExerciseCompleted = (id: string) => {
    if (!completed.includes(id)) {
      const newCompleted = [...completed, id];
      setCompleted(newCompleted);

      // Se completou todos os exercícios, marca a estrutura como concluída
      if (newCompleted.length === exercises.length) {
        markAsCompleted('stacks');
        toast.success(
          'Parabéns! Você completou todos os exercícios de pilhas!',
        );
      } else {
        toast.success('Exercício concluído!');
      }
    }
  };

  const resetExercises = () => {
    setCompleted([]);
    toast('Progresso dos exercícios reiniciado');
  };

  const exercises: Exercise[] = [
    {
      id: 'basicOperations',
      title: 'Operações Básicas de Pilha',
      description:
        'Pratique as operações fundamentais de uma pilha e complete os desafios',
      difficulty: 'Fácil',
      completed: completed.includes('basicOperations'),
      component: (
        <StackChallenges
          onComplete={markExerciseCompleted}
          challenges={challenges}
        />
      ),
    },
    {
      id: 'parentheses',
      title: 'Validador de Parênteses',
      description:
        'Verifique se uma expressão tem parênteses, colchetes e chaves balanceados',
      difficulty: 'Fácil',
      completed: completed.includes('parentheses'),
      component: <ParenthesesValidator onComplete={markExerciseCompleted} />,
    },
    {
      id: 'reverse',
      title: 'Inversão de String',
      description: 'Use uma pilha para inverter uma string',
      difficulty: 'Fácil',
      completed: completed.includes('reverse'),
      component: <ReverseString onComplete={markExerciseCompleted} />,
    },
    {
      id: 'binary',
      title: 'Decimal para Binário',
      description: 'Converta números decimais para binário usando uma pilha',
      difficulty: 'Médio',
      completed: completed.includes('binary'),
      component: <DecimalToBinary onComplete={markExerciseCompleted} />,
    },
    {
      id: 'expression',
      title: 'Avaliação de Expressões',
      description:
        'Entenda como as pilhas são usadas para avaliar expressões matemáticas',
      difficulty: 'Difícil',
      completed: completed.includes('expression'),
      component: <ExpressionEvaluation onComplete={markExerciseCompleted} />,
    },
  ];

  const completionPercentage = Math.round(
    (completed.length / exercises.length) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Exercícios sobre Pilhas</h2>
          <p className="text-muted-foreground">
            Complete estes exercícios para testar seu conhecimento sobre pilhas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {completed.length} de {exercises.length} concluídos
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={resetExercises}
            title="Reiniciar exercícios"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso</span>
          <span>{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          key={exercises[0].id}
          className={cn(
            'col-span-2',
            exercises[0].completed
              ? 'border-green-200 dark:border-green-900'
              : '',
          )}
        >
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="flex items-center gap-2">
                {exercises[0].title}
                {exercises[0].completed && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </CardTitle>
              <Badge
                variant="outline"
                className={cn(
                  exercises[0].difficulty === 'Fácil'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                    : exercises[0].difficulty === 'Médio'
                    ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
                )}
              >
                {exercises[0].difficulty}
              </Badge>
            </div>
            <CardDescription>{exercises[0].description}</CardDescription>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent>{exercises[0].component}</CardContent>
        </Card>
        {exercises.slice(1).map((exercise) => (
          <Card
            key={exercise.id}
            className={cn(
              exercise.completed
                ? 'border-green-200 dark:border-green-900'
                : '',
            )}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="flex items-center gap-2">
                  {exercise.title}
                  {exercise.completed && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={cn(
                    exercise.difficulty === 'Fácil'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                      : exercise.difficulty === 'Médio'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
                  )}
                >
                  {exercise.difficulty}
                </Badge>
              </div>
              <CardDescription>{exercise.description}</CardDescription>
              <Separator className="mt-2" />
            </CardHeader>
            <CardContent>{exercise.component}</CardContent>
          </Card>
        ))}
      </div>

      {completed.length === exercises.length && (
        <div className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 rounded-lg p-4 flex items-center gap-3">
          <Award className="h-10 w-10 text-green-500" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-400">
              Parabéns!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-500">
              Você completou todos os exercícios relacionados a pilhas! Isso
              demonstra uma ótima compreensão dessa estrutura de dados
              fundamental.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
