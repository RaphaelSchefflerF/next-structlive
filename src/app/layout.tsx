import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'StructLive',
    template: '%s | Estrutura de Dados',
  },
  description:
    'Aprenda estruturas de dados com visualizações interativas e exemplos práticos.',
  keywords: ['estrutura de dados', 'algoritmos', 'programação', 'aprendizado'],
  authors: [{ name: 'Author' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased min-h-screen flex flex-col',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <AppProvider>
          <main>{children}</main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
