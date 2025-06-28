"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookOpenCheck, Home, List, PlayCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ListActivity from "@/app/estruturas/lista/components/list-activity";
import ListVisualization from "@/app/estruturas/lista/components/list-visualization";
import ListTheory from "@/app/estruturas/lista/components/list-theory";
import ListChallenge from "./components/list-challenge";

export default function ListPage() {
  const { status } = useSession();
  const router = useRouter();
  const [tipoLista, setTipoLista] = useState("ldse");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

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
          {/* Select de tipos de lista */}
          <div className="mt-6 mb-4 flex items-center gap-4">
            <span className="text-base text-muted-foreground">
              Selecione qual estrutura você deseja:
            </span>
            <Select value={tipoLista} onValueChange={setTipoLista}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Selecione o tipo de lista" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="les" disabled>
                    Lista Estática Sequencial
                  </SelectItem>
                  <SelectItem value="lee" disabled>
                    Lista Estática Encadeada
                  </SelectItem>
                  <SelectItem value="ldse">
                    Lista Dinâmica Simplesmente Encadeada
                  </SelectItem>
                  <SelectItem value="ldde" disabled>
                    Lista Dinâmica Duplamente Encadeada
                  </SelectItem>
                  <SelectItem value="lc" disabled>
                    Lista Circular
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-6" />

          <Tabs defaultValue="conteudo" className="w-full">
            <TabsList
              className="
                flex flex-wrap w-full mb-4
                justify-start sm:justify-center
                bg-muted/50 rounded-lg p-1
              "
            >
              <TabsTrigger
                value="conteudo"
                className="
                  flex items-center gap-2 px-4 w-full sm:w-auto
                  rounded-md font-medium transition
                  data-[state=active]:bg-background data-[state=active]:shadow
                  cursor-pointer
                "
              >
                <BookOpen className="h-4 w-4" /> Conteúdo
              </TabsTrigger>
              <TabsTrigger
                value="visualization"
                className="
                  flex items-center gap-2 px-4 w-full sm:w-auto
                  rounded-md font-medium transition
                  data-[state=active]:bg-background data-[state=active]:shadow
                  cursor-pointer
                "
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
                value="challenge"
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <List className="h-4 w-4" /> Desafios
              </TabsTrigger>
            </TabsList>

            {/* Conteudo - Explicação teórica */}
            <TabsContent value="conteudo">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold mb-4">
                  Teoria sobre Listas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Aprenda os conceitos fundamentais sobre listas, suas
                  implementações e aplicações.
                </p>
                <ListTheory tipo={tipoLista} />
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
                <ListVisualization tipo={tipoLista} />
              </div>
            </TabsContent>

            {/* Atividades práticas */}
            <TabsContent value="practice">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl text-stone-800 font-semibold mb-2">
                  Questões
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete os desafios para testar seu conhecimento sobre
                  listas.
                </p>
                <ListActivity tipo={tipoLista} />
              </div>
            </TabsContent>

            {/* Desafios */}
            <TabsContent value="challenge">
              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-2xl text-stone-800 font-semibold mb-2">
                  Desafios
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enfrente os desafios para aprimorar suas habilidades em
                  listas.
                </p>
                <ListChallenge tipo={tipoLista} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
