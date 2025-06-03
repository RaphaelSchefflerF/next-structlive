import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { List } from "lucide-react";

export default function ListaDinamicaSimplesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="py-10 px-4 sm:px-10">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
            <List className="h-8 w-8" />
            Lista Dinâmica Simplesmente Encadeada
          </h1>
          <Separator className="my-6" />
          <p className="text-xl text-muted-foreground">
            Página de exemplo para Lista Dinâmica Simplesmente Encadeada.
          </p>
          {/* Adicione conteúdo específico aqui */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
