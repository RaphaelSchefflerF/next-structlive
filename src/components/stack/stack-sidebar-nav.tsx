'use client';

import {
  BookOpen,
  Code,
  Compass,
  FlaskConical,
  LineChart,
  Play,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function StackSidebarNav() {
  const pathname = usePathname();

  const links = [
    {
      title: 'Tutorial',
      href: '/estruturas/stacks?tab=tutorial',
      icon: BookOpen,
    },
    {
      title: 'Visualização',
      href: '/estruturas/stacks?tab=visualization',
      icon: LineChart,
    },
    {
      title: 'Atividades',
      href: '/estruturas/stacks?tab=practice',
      icon: Play,
    },
    {
      title: 'Implementação',
      href: '/estruturas/stacks?tab=implementation',
      icon: Code,
    },
    {
      title: 'Sandbox',
      href: '/estruturas/stacks?tab=sandbox',
      icon: FlaskConical,
    },
    {
      title: 'Aplicações',
      href: '/estruturas/stacks?tab=applications',
      icon: Compass,
    },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="space-y-1 p-2">
        {links.map((link) => (
          <Button
            key={link.href}
            variant={pathname.includes(link.href) ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
