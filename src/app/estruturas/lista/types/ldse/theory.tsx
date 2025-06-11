import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LdseTheory() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="border rounded-lg p-6 bg-card">
      <h2 className="text-2xl font-semibold mb-4">O que é uma Lista?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Uma lista é uma estrutura de dados linear que armazena uma coleção
        ordenada de elementos. Diferente de arrays com tamanho fixo, as listas
        podem crescer dinamicamente e permitem inserções e remoções em qualquer
        posição. Tipos comuns incluem listas simplesmente encadeadas, duplamente
        encadeadas e listas circulares.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-2">Operações Básicas</h3>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>
          <span className="font-medium text-foreground">add/append</span>:
          Adiciona um elemento ao final da lista
        </li>
        <li>
          <span className="font-medium text-foreground">insert</span>: Insere um
          elemento em uma posição específica
        </li>
        <li>
          <span className="font-medium text-foreground">remove</span>: Remove um
          elemento de uma posição específica
        </li>
        <li>
          <span className="font-medium text-foreground">get</span>: Obtém o
          elemento em uma posição específica
        </li>
        <li>
          <span className="font-medium text-foreground">indexOf</span>: Encontra
          a posição da primeira ocorrência de um elemento
        </li>
        <li>
          <span className="font-medium text-foreground">size</span>: Retorna o
          número de elementos na lista
        </li>
        <li>
          <span className="font-medium text-foreground">isEmpty</span>: Verifica
          se a lista está vazia
        </li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">Tipos de Listas</h3>
      <div className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium">Lista Simplesmente Encadeada</h4>
          <p className="text-sm text-muted-foreground">
            Cada nó contém o dado e uma referência para o próximo nó
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Lista Duplamente Encadeada</h4>
          <p className="text-sm text-muted-foreground">
            Cada nó contém o dado e referências para os nós anterior e próximo
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Lista Circular</h4>
          <p className="text-sm text-muted-foreground">
            O último nó aponta para o primeiro, formando um círculo
          </p>
        </div>
      </div>
    </div>
  );
}
