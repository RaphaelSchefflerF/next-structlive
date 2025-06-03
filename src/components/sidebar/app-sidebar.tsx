"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/contexts/AppContext";
import { CheckCircle, Minus, Plus, Globe2, ChevronsUpDown, LogOut, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dataStructures, progress, currentStructure } = useAppContext();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  // Simple mobile detection using window width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO: Replace this mock user with real user data from context or props
  const user = {
    name: "Carlos Nunes",
    email: "carlos@example.com",
    avatar: "/assets/avatar.png",
  };

  // Define o item atual como expandido quando a estrutura atual mudar
  useEffect(() => {
    if (currentStructure) {
      setExpandedItems((prev) => ({
        ...prev,
        [currentStructure]: true,
      }));
    }
  }, [currentStructure]);

  // Organiza as estruturas por complexidade
  const structuresByComplexity: Record<string, typeof dataStructures> = {
    Básico: [],
  };

  for (const structure of dataStructures) {
    structuresByComplexity[structure.complexity].push(structure);
  }

  // Obtém a data da última visita formatada
  const getLastVisitedText = (structureId: string) => {
    const lastVisited = progress[structureId]?.lastVisited;
    if (!lastVisited) return "";

    // Formate a data relativa (hoje, ontem, ou data específica)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastVisited.toDateString() === today.toDateString()) {
      return "Visitado hoje";
    }
    if (lastVisited.toDateString() === yesterday.toDateString()) {
      return "Visitado ontem";
    }
    return `Visitado em ${lastVisited.toLocaleDateString()}`;
  };

  return (
    <Sidebar collapsible="icon" className="" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src="/assets/Logo_colorida.png"
                  alt="StructLive Logo"
                  width={64}
                  height={64}
                  className="h-8 w-8"
                  priority
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-xl">StructLive</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/estruturas" className="flex items-center gap-2">
                  <Globe2 className="text-blue-500 text-lg" />
                  <span className="font-medium">Estruturas de Dados</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Estruturas Básicas</SidebarGroupLabel>
          <SidebarMenu>
            {structuresByComplexity.Básico.map((structure) => (
              <Collapsible
                key={structure.id}
                defaultOpen={
                  expandedItems[structure.id] ||
                  structure.id === currentStructure
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{structure.icon}</span>
                        {structure.title}
                        {progress[structure.id]?.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                        )}
                      </span>
                      <div>
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/estruturas/${structure.id}`}>
                            Tutorial
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/estruturas/${structure.id}#operacoes`}>
                            Visualização
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/estruturas/${structure.id}#pratica`}>
                            Atividades
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {progress[structure.id]?.lastVisited && (
                        <div className="px-8 py-1 text-xs text-muted-foreground">
                          {getLastVisitedText(structure.id)}
                        </div>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sun />
                    Light Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Moon />
                    Dark Mode
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
