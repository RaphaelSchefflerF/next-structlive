'use client';
import { SearchForm } from '@/components/search-form';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAppContext } from '@/contexts/AppContext';
import { CheckCircle, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';
import { useEffect, useState } from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dataStructures, progress, currentStructure } = useAppContext();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

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
    if (!lastVisited) return '';

    // Formate a data relativa (hoje, ontem, ou data específica)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastVisited.toDateString() === today.toDateString()) {
      return 'Visitado hoje';
    }
    if (lastVisited.toDateString() === yesterday.toDateString()) {
      return 'Visitado ontem';
    }
    return `Visitado em ${lastVisited.toLocaleDateString()}`;
  };

  return (
    <Sidebar {...props}>
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
                  <span className="font-medium">StructLive</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Estruturas Básicas
            </h3>
          </div>
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

        {Object.keys(progress).length > 0 && (
          <SidebarGroup className="mt-6">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Seu progresso
              </h3>
              <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{
                    width: `${Math.round(
                      (Object.values(progress).filter((item) => item.completed)
                        .length /
                        dataStructures.length) *
                        100,
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>
                  {
                    Object.values(progress).filter((item) => item.completed)
                      .length
                  }{' '}
                  concluídos
                </span>
                <span>{dataStructures.length} total</span>
              </div>
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
