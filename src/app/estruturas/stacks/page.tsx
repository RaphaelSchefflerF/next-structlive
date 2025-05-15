import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Code,
  Home,
  Layers,
  PlayCircle,
  BookOpenCheck,
  Lightbulb,
  Zap,
} from 'lucide-react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Componentes de seções
import StackTutorial from '@/components/stack/stack-tutorial';
import StackVisualization from '@/components/stack/stack-visualization';
import StackImplementation from '@/components/stack/stack-implementation';
import StackSandbox from '@/components/stack/stack-sandbox';
import StackExercises from '@/components/stack/stack-exercises';

export const metadata: Metadata = {
  title: 'Pilhas (LIFO) | Structlive',
  description:
    'Aprenda sobre a estrutura de dados Pilha e o conceito LIFO (Last In, First Out)',
};

export default function StackPage() {
  return (
    <div className="container flex gap-4 mx-auto w-full">
      <SidebarProvider className="container flex justify-between w-full relative">
        <AppSidebar className=" absolute" />
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
                    <BreadcrumbLink
                      href="/"
                      className="flex items-center gap-1"
                    >
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
                      <Layers className="h-3.5 w-3.5" />
                      <span>Pilhas (LIFO)</span>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="container py-10 px-4 sm:px-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
                <Layers className="h-8 w-8" />
                Pilhas (LIFO)
              </h1>
              <p className="text-xl text-muted-foreground">
                Last In, First Out - O último a entrar é o primeiro a sair
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
                  <StackTutorial />
                </div>
              </TabsContent>

              {/* Visualização interativa */}
              <TabsContent value="visualization">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-2xl font-semibold mb-4">
                    Visualização de Pilhas
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Visualize o comportamento de uma pilha e interaja com
                    operações de push e pop para entender melhor o
                    funcionamento.
                  </p>
                  <StackVisualization />
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
                    pilhas.
                  </p>
                  <StackExercises />
                </div>
              </TabsContent>

              {/* Implementação */}
              <TabsContent value="implementation">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-2xl font-semibold mb-4">
                    Implementação de Pilhas
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Veja diferentes maneiras de implementar pilhas em código.
                  </p>
                  <StackImplementation />
                </div>
              </TabsContent>

              {/* Sandbox */}
              <TabsContent value="sandbox">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-2xl font-semibold mb-4">
                    Ambiente de Desenvolvimento
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Experimente escrever seu próprio código para manipular
                    pilhas.
                  </p>
                  <StackSandbox />
                </div>
              </TabsContent>

              {/* Aplicações */}
              <TabsContent value="applications">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-2xl font-semibold mb-4">
                    Aplicações de Pilhas
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Conheça exemplos práticos do uso de pilhas em problemas
                    reais.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        Verificação de parênteses balanceados
                      </h3>
                      <p className="text-muted-foreground">
                        Pilhas são usadas para verificar se expressões com
                        diferentes tipos de parênteses estão balanceadas. Cada
                        parêntese de abertura é empilhado, e quando um parêntese
                        de fechamento é encontrado, o programa verifica se
                        corresponde ao último parêntese aberto.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        Implementação de &quot;Desfazer&quot; em editores
                      </h3>
                      <p className="text-muted-foreground">
                        Editores de texto usam pilhas para implementar a
                        funcionalidade de desfazer/refazer, onde cada ação do
                        usuário é armazenada na pilha e pode ser revertida.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        Call Stack em linguagens de programação
                      </h3>
                      <p className="text-muted-foreground">
                        Em linguagens de programação, a pilha de chamadas (call
                        stack) rastreia o ponto de execução durante chamadas de
                        função. Cada vez que uma função é chamada, um novo
                        quadro é adicionado à pilha.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        Conversão de expressões infixa para pósfixa
                      </h3>
                      <p className="text-muted-foreground">
                        Pilhas são utilizadas para converter expressões da
                        notação infixa (comum para humanos) para notação pósfixa
                        (Polish Notation), facilitando a avaliação por
                        computadores.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
