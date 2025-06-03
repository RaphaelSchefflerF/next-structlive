"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { RecentStructures } from "@/components/recent-structures";
import { ArrowRight, BookOpen, PlayCircle, Sparkles } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function HomePage() {
  const { progress, dataStructures } = useAppContext();

  // Encontra a última estrutura visitada pelo usuário
  const lastVisited = Object.entries(progress)
    .filter(([, data]) => data.lastVisited)
    .sort(([, a], [, b]) => {
      const dateA = a.lastVisited?.getTime() || 0;
      const dateB = b.lastVisited?.getTime() || 0;
      return dateB - dateA;
    })[0];

  const lastStructure = lastVisited
    ? dataStructures.find((ds) => ds.id === lastVisited[0])
    : null;

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
                    <span>Início</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* Hero Marketing */}
        <section className="relative flex flex-col items-center justify-center min-h-[420px] bg-gradient-to-br from-blue-100 via-indigo-100 to-white rounded-b-3xl shadow-md overflow-hidden">
          <div className="z-10 flex flex-col items-center gap-6 py-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm shadow">
              Plataforma Visual de Estruturas de Dados
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow-lg text-center leading-tight">
              Aprenda Estruturas de Dados <br className="hidden md:block" />
              de Forma Visual, Prática e Divertida
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl">
              Domine listas, pilhas, filas, árvores e muito mais com animações,
              desafios e acompanhamento de progresso. Transforme teoria em
              prática e prepare-se para o mercado!
            </p>
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
              <Button asChild size="lg" className="shadow-lg text-lg px-8 py-6">
                <Link href="/estruturas">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Começar Agora
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link href="/estruturas/lista">
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Ver Demonstração
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="container mx-auto py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Por que aprender com a StructLive?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gradient-to-br from-indigo-100 to-blue-50 border rounded-xl p-8 shadow flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-primary mb-3" />
              <h3 className="font-bold text-xl mb-2">Tutoriais Didáticos</h3>
              <p className="text-muted-foreground text-center">
                Aprenda do zero ao avançado com explicações claras, exemplos
                reais e linguagem acessível.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-50 border rounded-xl p-8 shadow flex flex-col items-center">
              <PlayCircle className="h-12 w-12 text-primary mb-3" />
              <h3 className="font-bold text-xl mb-2">
                Visualizações Interativas
              </h3>
              <p className="text-muted-foreground text-center">
                Experimente estruturas de dados em tempo real, com animações e
                simulações exclusivas.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 border rounded-xl p-8 shadow flex flex-col items-center">
              <Sparkles className="h-12 w-12 text-primary mb-3" />
              <h3 className="font-bold text-xl mb-2">Atividades Práticas</h3>
              <p className="text-muted-foreground text-center">
                Teste seus conhecimentos com desafios, quizzes e acompanhe seu
                progresso de forma gamificada.
              </p>
            </div>
          </div>
        </section>

        {/* Estruturas Disponíveis & Em Breve */}
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Estruturas de Dados na Plataforma
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Estruturas disponíveis */}
            {[
              {
                icon: "📋",
                title: "Lista",
                description:
                  "Coleção linear de elementos com acesso sequencial.",
                href: "/estruturas/lista",
              },
            ].map((structure) => (
              <Link
                key={structure.title}
                href={structure.href}
                className="bg-white border rounded-xl p-6 shadow flex flex-col items-center hover:shadow-lg transition cursor-pointer hover:border-primary focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <span className="text-4xl mb-2">{structure.icon}</span>
                <h3 className="font-bold text-lg mb-1 text-center">
                  {structure.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm mb-2">
                  {structure.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Disponível
                </span>
              </Link>
            ))}
            {/* Estruturas em progresso (exemplo hardcoded) */}
            {[
              {
                icon: "📥",
                title: "Fila",
                description:
                  "Estrutura FIFO: o primeiro a entrar é o primeiro a sair.",
              },
              {
                icon: "🗄️",
                title: "Pilha",
                description:
                  "Estrutura LIFO: o último a entrar é o primeiro a sair.",
              },
              {
                icon: "🌳",
                title: "Árvore",
                description:
                  "Estrutura hierárquica para dados em formato de árvore.",
              },
            ].map((future) => (
              <div
                key={future.title}
                className="bg-muted/40 border-2 border-dashed border-muted-foreground/30 rounded-xl p-6 shadow flex flex-col items-center opacity-70"
              >
                <span className="text-4xl mb-2">{future.icon}</span>
                <h3 className="font-bold text-lg mb-1 text-center">
                  {future.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm mb-2">
                  {future.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  Em breve
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Continue de onde parou */}
        <section className="container mx-auto mt-4 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white/80 border rounded-xl shadow p-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="h-6 w-6 text-primary" />
                Continue de onde parou
              </h2>
              {lastStructure ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{lastStructure.icon}</span>
                    <span className="font-bold text-lg">
                      {lastStructure.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {lastStructure.description}
                  </p>
                  <Button asChild>
                    <Link href={`/estruturas/${lastStructure.id}`}>
                      Retomar aprendizado
                    </Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-3">
                    Você ainda não começou nenhuma estrutura. Que tal explorar
                    agora?
                  </p>
                  <Button asChild>
                    <Link href="/estruturas">Começar agora</Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 w-full max-w-xs">
              <RecentStructures />
            </div>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
