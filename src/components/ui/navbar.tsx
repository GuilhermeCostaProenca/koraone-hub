import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Lightbulb, 
  Trophy, 
  Route, 
  Brain, 
  Menu,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavbar } from '@/contexts/NavbarContext';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Trilha', href: '/trail', icon: Route },
  { name: 'Projetos', href: '/projects', icon: FolderOpen },
  { name: 'Vitrine', href: '/ideas', icon: Trophy },
  { name: 'Mapa', href: '/map', icon: Map },
  { name: 'Insights', href: '/insights', icon: Brain },
  { name: 'Aurora IA', href: '/assistant', icon: MessageCircle },
];

// Mobile Sidebar Component
function MobileSidebar() {
  const location = useLocation();
  const { setIsOpen } = useNavbar();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm border border-border/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">KoraOne</h1>
              <p className="text-xs text-muted-foreground">Innovation Hub</p>
            </div>
          </div>


          {/* Navigation */}
          <div className="flex-1 space-y-2 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-secondary/50",
                    isActive && "bg-primary/10 text-primary border border-primary/20"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

// Desktop Sidebar Component  
function DesktopSidebar() {
  const { isCollapsed, setIsCollapsed } = useNavbar();
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 h-screen bg-card border-r border-border z-40",
      "hidden lg:flex flex-col shadow-elevation transition-all duration-300",
      isCollapsed ? "w-20" : "w-70"
    )}>
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
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className={cn(
            isCollapsed && "absolute -right-3 top-6 bg-card border border-border rounded-full w-6 h-6 p-0"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>


      {/* Navigation */}
      <div className={cn("flex-1 space-y-2", isCollapsed ? "p-2" : "p-4")}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
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

    </div>
  );
}

export function Navbar() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}