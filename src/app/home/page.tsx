'use client';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppContext } from '@/contexts/AppContext';
import { RecentStructures } from '@/components/recent-structures';
import { ArrowRight, BookOpen, PlayCircle, Sparkles, Star, Users, TrendingUp } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
    ? dataStructures.find(ds => ds.id === lastVisited[0])
    : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header com breadcrumb */}
        <header className="flex h-16 items-center gap-2 border-b px-4 bg-white/80 shadow-sm">
          <div className="flex-1 flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="font-semibold text-primary">
                    Início
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/estruturas">
                    Estruturas de Dados
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Hero Marketing */}
        <section className="relative flex flex-col items-center justify-center min-h-[420px] bg-gradient-to-br from-blue-100 via-indigo-100 to-white rounded-b-3xl shadow-md overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="z-10 flex flex-col items-center gap-6 py-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm shadow">
              NOVO! Plataforma Visual de Estruturas de Dados
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow-lg text-center leading-tight">
              Aprenda Estruturas de Dados <br className="hidden md:block" />
              de Forma Visual, Prática e Divertida
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl">
              Domine listas, pilhas, filas, árvores e muito mais com animações, desafios e acompanhamento de progresso. 
              Transforme teoria em prática e prepare-se para o mercado!
            </p>
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
              <Button asChild size="lg" className="shadow-lg text-lg px-8 py-6">
                <Link href="/estruturas">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Começar Agora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/estruturas/lista">
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Ver Demonstração
                </Link>
              </Button>
            </div>
            <div className="flex gap-8 mt-8">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">+5.000</span>
                <span className="text-muted-foreground">alunos impactados</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="font-bold text-lg">4.9/5</span>
                <span className="text-muted-foreground">avaliação média</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <span className="font-bold text-lg">+120%</span>
                <span className="text-muted-foreground">aprendizado acelerado</span>
              </div>
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
                Aprenda do zero ao avançado com explicações claras, exemplos reais e linguagem acessível.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-50 border rounded-xl p-8 shadow flex flex-col items-center">
              <PlayCircle className="h-12 w-12 text-primary mb-3" />
              <h3 className="font-bold text-xl mb-2">Visualizações Interativas</h3>
              <p className="text-muted-foreground text-center">
                Experimente estruturas de dados em tempo real, com animações e simulações exclusivas.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 border rounded-xl p-8 shadow flex flex-col items-center">
              <Sparkles className="h-12 w-12 text-primary mb-3" />
              <h3 className="font-bold text-xl mb-2">Atividades Práticas</h3>
              <p className="text-muted-foreground text-center">
                Teste seus conhecimentos com desafios, quizzes e acompanhe seu progresso de forma gamificada.
              </p>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">O que nossos alunos dizem</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-muted-foreground text-center mb-4">
                  “Nunca imaginei que aprender estruturas de dados pudesse ser tão divertido e visual. Recomendo para todos!”
                </p>
                <span className="font-bold">Ana Souza</span>
                <span className="text-xs text-muted-foreground">Estudante de Ciência da Computação</span>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-muted-foreground text-center mb-4">
                  “As visualizações interativas me ajudaram a entender conceitos que antes pareciam impossíveis!”
                </p>
                <span className="font-bold">Carlos Lima</span>
                <span className="text-xs text-muted-foreground">Dev Júnior</span>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-muted-foreground text-center mb-4">
                  “Acompanhar meu progresso e praticar com desafios fez toda a diferença no meu aprendizado.”
                </p>
                <span className="font-bold">Juliana Pires</span>
                <span className="text-xs text-muted-foreground">Universitária</span>
              </div>
            </div>
          </div>
        </section>

        {/* Continue de onde parou */}
        <section className="container mx-auto mt-16 mb-12">
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
                    <span className="font-bold text-lg">{lastStructure.title}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">{lastStructure.description}</p>
                  <Button asChild>
                    <Link href={`/estruturas/${lastStructure.id}`}>
                      Retomar aprendizado
                    </Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-3">
                    Você ainda não começou nenhuma estrutura. Que tal explorar agora?
                  </p>
                  <Button asChild>
                    <Link href="/estruturas">
                      Começar agora
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 w-full max-w-xs">
              <RecentStructures />
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Call to Action Final */}
        <section className="container mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Pronto para transformar seu aprendizado?
          </h2>
          <p className="text-muted-foreground mb-6 text-center max-w-xl">
            Junte-se a milhares de alunos e domine estruturas de dados com a plataforma mais visual e prática do Brasil.
          </p>
          <Button asChild size="lg" className="shadow-lg text-lg px-10 py-6">
            <Link href="/estruturas">
              Começar gratuitamente
            </Link>
          </Button>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
