import { ReactNode } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function AppLayout({ children, title, subtitle, action }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="lg:ml-70 p-6">
        {(title || subtitle || action) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              {title && (
                <h1 className="text-3xl font-bold">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground">
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
  );
}