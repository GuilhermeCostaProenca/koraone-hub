import { 
  Home, 
  Map, 
  Trophy, 
  Route, 
  Brain, 
  LogOut, 
  Sparkles,
  MessageCircle,
  FolderOpen
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/auth';
import { cn } from '@/lib/utils';

const navigationItems = [
  { title: 'Início', url: '/dashboard', icon: Home },
  { title: 'Trilha', url: '/trail', icon: Route },
  { title: 'Projetos', url: '/projects', icon: FolderOpen },
  { title: 'Vitrine', url: '/ideas', icon: Trophy },
  { title: 'Mapa', url: '/map', icon: Map },
  { title: 'Insights', url: '/insights', icon: Brain },
  { title: 'Aurora IA', url: '/assistant', icon: MessageCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-card"
    >
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">KoraOne</h1>
              <p className="text-xs text-muted-foreground">Innovation Hub</p>
            </div>
          )}
        </div>
        
        {/* User Info */}
        {user && (
          <div className={`px-4 pb-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.url)}
                      className={cn(
                        active && "bg-primary/10 text-primary border border-primary/20 font-medium"
                      )}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={logout}
              className="text-muted-foreground hover:text-destructive"
              title={isCollapsed ? "Sair" : undefined}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}