import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  BookOpenCheck,
  Code,
  Home,
  Lightbulb,
  List,
  PlayCircle,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';

import ListImplementation from '@/app/estruturas/lista/components/list-implementation';
import ListOperations from '@/app/estruturas/lista/components/list-operations';
import ListSandbox from '@/app/estruturas/lista/components/list-sandbox';
// Componentes de seções
import ListVisualization from '@/app/estruturas/lista/components/list-visualization';

export const metadata: Metadata = {
  title: 'Listas | Structlive',
  description:
    'Aprenda sobre a estrutura de dados Lista e como ela pode armazenar e manipular coleções de elementos',
};

export default function ListPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                    <span>Início</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/estruturas">
                    Estruturas de Dados
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-1">
                    <List className="h-3.5 w-3.5" />
                    <span>Listas</span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="py-10 px-4 sm:px-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
              <List className="h-8 w-8" />
              Listas
            </h1>
            <p className="text-xl text-muted-foreground">
              Estrutura de dados para armazenar e manipular coleções de
              elementos
            </p>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="tutorial" className="w-full">
            <TabsList className="flex flex-col  min-[440]:grid min-[440]:grid-cols-3 lg:grid-cols-6  w-full mb-8">
              <TabsTrigger
                value="tutorial"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <BookOpen className="h-4 w-4" /> Tutorial
              </TabsTrigger>
              <TabsTrigger
                value="visualization"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <PlayCircle className="h-4 w-4" /> Visualização
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <BookOpenCheck className="h-4 w-4" /> Atividades
              </TabsTrigger>
              <TabsTrigger
                value="implementation"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <Code className="h-4 w-4" /> Implementação
              </TabsTrigger>
              <TabsTrigger
                value="sandbox"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <Zap className="h-4 w-4" /> Sandbox
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <Lightbulb className="h-4 w-4" /> Aplicações
              </TabsTrigger>
            </TabsList>

            {/* Tutorial - Explicação teórica */}
            <TabsContent value="tutorial">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  O que é uma Lista?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Uma lista é uma estrutura de dados linear que armazena uma
                  coleção ordenada de elementos. Diferente de arrays com tamanho
                  fixo, as listas podem crescer dinamicamente e permitem
                  inserções e remoções em qualquer posição. Tipos comuns incluem
                  listas simplesmente encadeadas, duplamente encadeadas e listas
                  circulares.
                </p>

                <h3 className="text-xl font-medium mt-6 mb-2">
                  Operações Básicas
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">
                      add/append
                    </span>
                    : Adiciona um elemento ao final da lista
                  </li>
                  <li>
                    <span className="font-medium text-foreground">insert</span>:
                    Insere um elemento em uma posição específica
                  </li>
                  <li>
                    <span className="font-medium text-foreground">remove</span>:
                    Remove um elemento de uma posição específica
                  </li>
                  <li>
                    <span className="font-medium text-foreground">get</span>:
                    Obtém o elemento em uma posição específica
                  </li>
                  <li>
                    <span className="font-medium text-foreground">indexOf</span>
                    : Encontra a posição da primeira ocorrência de um elemento
                  </li>
                  <li>
                    <span className="font-medium text-foreground">size</span>:
                    Retorna o número de elementos na lista
                  </li>
                  <li>
                    <span className="font-medium text-foreground">isEmpty</span>
                    : Verifica se a lista está vazia
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-2">
                  Tipos de Listas
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">
                      Lista Simplesmente Encadeada
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Cada nó contém o dado e uma referência para o próximo nó
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Lista Duplamente Encadeada</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada nó contém o dado e referências para os nós anterior e
                      próximo
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
            </TabsContent>

            {/* Visualização interativa */}
            <TabsContent value="visualization">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Visualização de Listas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Visualize o comportamento de uma lista e interaja com
                  operações de adição, inserção e remoção para entender melhor o
                  funcionamento.
                </p>
                <ListVisualization />
              </div>
            </TabsContent>

            {/* Atividades práticas */}
            <TabsContent value="practice">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Atividades Práticas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete os desafios para testar seu conhecimento sobre
                  listas.
                </p>
                <ListOperations />
              </div>
            </TabsContent>

            {/* Implementação */}
            <TabsContent value="implementation">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Implementação de Listas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Veja diferentes maneiras de implementar listas em código.
                </p>
                <ListImplementation />
              </div>
            </TabsContent>

            {/* Sandbox */}
            <TabsContent value="sandbox">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Ambiente de Desenvolvimento
                </h2>
                <p className="text-muted-foreground mb-6">
                  Experimente escrever seu próprio código para manipular listas.
                </p>
                <ListSandbox />
              </div>
            </TabsContent>

            {/* Aplicações */}
            <TabsContent value="applications">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Aplicações de Listas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Conheça exemplos práticos do uso de listas em problemas reais.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      Implementação de outras estruturas de dados
                    </h3>
                    <p className="text-muted-foreground">
                      Listas são frequentemente usadas como base para
                      implementar outras estruturas de dados como pilhas e
                      filas, aproveitando sua flexibilidade de tamanho e
                      eficiência em inserções/remoções.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      Gerenciamento de memória
                    </h3>
                    <p className="text-muted-foreground">
                      Sistemas operacionais usam listas para gerenciar blocos de
                      memória livres e alocados, permitindo alocação e liberação
                      dinâmica de recursos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      Histórico de navegação
                    </h3>
                    <p className="text-muted-foreground">
                      Navegadores web utilizam listas para implementar o
                      histórico de navegação, permitindo que os usuários voltem
                      e avancem entre páginas visitadas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      Representação de grafos
                    </h3>
                    <p className="text-muted-foreground">
                      Listas de adjacências são usadas para representar grafos
                      de forma eficiente, onde cada vértice mantém uma lista de
                      seus vizinhos conectados.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
