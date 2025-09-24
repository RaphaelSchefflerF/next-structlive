import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative" />
      </SidebarGroup>
    </form>
  );
}
