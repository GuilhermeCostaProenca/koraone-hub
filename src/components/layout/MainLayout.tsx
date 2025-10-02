import { ReactNode } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { useNavbar } from '@/contexts/NavbarContext';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isCollapsed } = useNavbar();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out",
        "lg:ml-20", // collapsed width (80px)
        !isCollapsed && "lg:ml-70" // expanded width (280px)
      )}>
        {children}
      </main>
    </div>
  );
}
