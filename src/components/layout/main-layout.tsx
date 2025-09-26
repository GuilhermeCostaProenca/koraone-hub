import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function MainLayout({ children, title, subtitle, action }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
            <SidebarTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
            
            {title && (
              <h1 className="font-bold text-lg truncate">{title}</h1>
            )}
            
            <div></div> {/* Spacer for centering */}
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {(title || subtitle || action) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8"
              >
                <div>
                  {title && (
                    <h1 className="text-2xl lg:text-3xl font-bold">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                
                {action && (
                  <div className="flex-shrink-0">
                    {action}
                  </div>
                )}
              </motion.div>
            )}
            
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}