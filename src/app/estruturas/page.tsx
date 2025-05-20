"use client";

import { useAppContext } from "@/contexts/AppContext";
import { DataStructureGrid } from "@/components/data-structure-grid";
import { RecentStructures } from "@/components/recent-structures";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function EstruturasDeDados() {
  const { setCurrentStructure, progress } = useAppContext();

  useEffect(() => {
    setCurrentStructure("");
  }, [setCurrentStructure]);

  // Contagem de estruturas visitadas
  const visitedCount = Object.keys(progress).length;
  const hasVisited = visitedCount > 0;

  return (
    <div className="container flex justify-center items-center flex-col py-10 mx-auto">
      <h1 className="text-4xl font-bold mb-2">Estruturas de Dados</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Explore nossa coleção de estruturas de dados com visualizações
        interativas.
      </p>

      {hasVisited && (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <RecentStructures />
          </div>
          <Separator className="my-8" />
        </>
      )}

      <h2 className="text-2xl font-semibold mb-6">Todas as estruturas</h2>
      <DataStructureGrid />
    </div>
  );
}
