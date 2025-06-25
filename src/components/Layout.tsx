import type { ReactNode } from 'react';
import { Header } from '../components/_components/header';
import Footer from '../components/_components/footer'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn('flex-1', !isHome && 'pt-20')}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
