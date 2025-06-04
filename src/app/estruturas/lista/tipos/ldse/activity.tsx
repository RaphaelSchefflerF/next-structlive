import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ExerciseProps {
  title: string;
  description: string;
  validation: (input: string) => boolean;
}

export default function LdseActivity() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const exercises: ExerciseProps[] = [
    {
      title: "Encontrar o elemento central",
      description:
        "Qual é o algoritmo mais eficiente para encontrar o elemento central de uma lista encadeada em uma única passagem?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("dois ponteiros") ||
          (normalizedInput.includes("fast") &&
            normalizedInput.includes("slow")) ||
          (normalizedInput.includes("rápido") &&
            normalizedInput.includes("lento"))
        );
      },
    },
    {
      title: "Detectar ciclo",
      description:
        "Qual algoritmo podemos usar para detectar um ciclo em uma lista encadeada?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("floyd") ||
          normalizedInput.includes("tartaruga e lebre") ||
          normalizedInput.includes("dois ponteiros")
        );
      },
    },
    {
      title: "Inverter uma lista",
      description:
        "Escreva os passos para inverter uma lista simplesmente encadeada de forma iterativa.",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("prev") &&
          normalizedInput.includes("current") &&
          normalizedInput.includes("next")
        );
      },
    },
    {
      title: "Operação mais eficiente",
      description:
        "Qual tipo de lista é mais eficiente para inserções e remoções frequentes no meio da estrutura?",
      validation: (input) => {
        const normalizedInput = input.toLowerCase();
        return (
          normalizedInput.includes("duplamente") ||
          normalizedInput.includes("doubly")
        );
      },
    },
  ];

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = (index: number) => {
    const answer = answers[index] || "";
    const result = exercises[index].validation(answer);

    setResults((prev) => ({
      ...prev,
      [index]: result,
    }));

    setSubmitted((prev) => ({
      ...prev,
      [index]: true,
    }));

    if (result) {
      toast.success("Resposta correta!");
    } else {
      toast.error("Tente novamente.");
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Exercícios Práticos</h3>
        <p className="text-sm text-muted-foreground">
          Responda às perguntas para testar seu conhecimento sobre listas
          encadeadas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exercises.map((exercise, index) => (
          <Card
            key={exercise.title}
            className={
              submitted[index]
                ? results[index]
                  ? "border-green-500/50"
                  : "border-red-500/50"
                : ""
            }
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{exercise.title}</CardTitle>
                {submitted[index] &&
                  (results[index] ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ))}
              </div>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`answer-${index}`}>Sua resposta</Label>
                  <Input
                    id={`answer-${index}`}
                    placeholder="Digite sua resposta..."
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={submitted[index] && results[index]}
                  />
                </div>
                <Button
                  onClick={() => handleSubmit(index)}
                  className="w-full"
                  disabled={
                    !answers[index] || (submitted[index] && results[index])
                  }
                >
                  {submitted[index]
                    ? results[index]
                      ? "Concluído"
                      : "Tentar novamente"
                    : "Verificar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium mb-2">Dicas:</h4>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>
            Para encontrar o elemento central, pense em ponteiros que se movem
            em velocidades diferentes
          </li>
          <li>
            Para detectar ciclos, considere o algoritmo de Floyd (Tartaruga e
            Lebre)
          </li>
          <li>
            Para inverter uma lista, você precisa rastrear referências anterior,
            atual e próxima
          </li>
          <li>
            Para operações no meio de uma lista, considere o custo de encontrar
            e atualizar referências
          </li>
        </ul>
      </div>
    </div>
  );
}
