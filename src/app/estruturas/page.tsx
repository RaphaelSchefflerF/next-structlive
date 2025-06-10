"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EstruturasDeDados() {
  const { status } = useSession();
  const router = useRouter();

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
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
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
        </header>
        <div className="container flex flex-col py-10 mx-auto">
          <h1 className="text-4xl font-bold mb-2">Estruturas de Dados</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore as principais estruturas de dados da plataforma.
          </p>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Estrutura disponível */}
            <Link
              href="/estruturas/lista"
              className="bg-white border rounded-xl p-6 shadow flex flex-col items-center hover:shadow-lg transition cursor-pointer hover:border-primary focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              <span className="text-4xl mb-2">📋</span>
              <h3 className="font-bold text-lg mb-1 text-center">Lista</h3>
              <p className="text-muted-foreground text-center text-sm mb-2">
                Coleção linear de elementos com acesso sequencial.
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                Disponível
              </span>
            </Link>
            {/* Estruturas em breve */}
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
