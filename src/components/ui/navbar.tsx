import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Map, 
  Lightbulb, 
  Trophy, 
  Route, 
  Brain, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Trilha', href: '/trail', icon: Route },
  { name: 'Projetos', href: '/ideas', icon: Lightbulb },
  { name: 'Mapa', href: '/map', icon: Map },
  { name: 'Vitrine', href: '/ideas', icon: Trophy },
  { name: 'Insights', href: '/insights', icon: Brain },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm border border-border/50"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.nav
            initial={window.innerWidth < 1024 ? { x: -280 } : false}
            animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-0 left-0 h-screen bg-card border-r border-border z-50",
              "flex flex-col shadow-elevation lg:translate-x-0",
              isCollapsed ? "w-20" : "w-70"
            )}
          >
            {/* Header */}
            <div className={cn(
              "flex items-center border-b border-border",
              isCollapsed ? "justify-center p-4" : "justify-between p-6"
            )}>
              {!isCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg">KoraOne</h1>
                    <p className="text-xs text-muted-foreground">Innovation Hub</p>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              {/* Desktop collapse button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className={cn(
                  "hidden lg:flex",
                  isCollapsed && "absolute -right-3 top-6 bg-card border border-border rounded-full w-6 h-6 p-0"
                )}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-3 w-3" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>

              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            {user && !isCollapsed && (
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed User Avatar */}
            {user && isCollapsed && (
              <div className="p-3 border-b border-border flex justify-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Navigation */}
            <div className={cn("flex-1 space-y-2", isCollapsed ? "p-2" : "p-4")}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center rounded-xl transition-colors",
                      "hover:bg-secondary/50",
                      isActive && "bg-primary/10 text-primary border border-primary/20",
                      isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <div className={cn("border-t border-border", isCollapsed ? "p-2" : "p-4")}>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={cn(
                  "w-full text-muted-foreground hover:text-destructive",
                  isCollapsed ? "justify-center p-3" : "justify-start gap-3"
                )}
                title={isCollapsed ? "Sair" : undefined}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && "Sair"}
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Spacer for desktop */}
      <div className={cn(
        "hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-70"
      )} />
    </>
  );
}