import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Landmark, Bot, Calculator,
  AlertTriangle, ShieldCheck, User, Settings,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Investments', url: '/investments', icon: TrendingUp },
  { title: 'Net Worth', url: '/net-worth', icon: Landmark },
  { title: 'Tax Optimizer', url: '/tax', icon: Calculator },
  { title: 'Ask AI', url: '/ask-ai', icon: Bot },
];

const securityItems = [
  { title: 'Fraud Alerts', url: '/fraud', icon: AlertTriangle, badge: 2 },
  { title: 'Privacy', url: '/privacy', icon: ShieldCheck },
];

const accountItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup key={label}>
      <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-penta-text3 font-body">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <NavLink
                    to={item.url}
                    end
                    className="hover:bg-penta-surface1 rounded-lg text-penta-text2 font-body text-sm"
                    activeClassName="bg-primary/10 text-primary font-medium"
                  >
                    <item.icon className="w-4 h-4 mr-2.5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                    {!collapsed && 'badge' in item && (item as any).badge && (
                      <span className="ml-auto bg-penta-rose text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                        {(item as any).badge}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-2">
        {renderGroup('Main', mainItems)}
        {renderGroup('Security', securityItems)}
        {renderGroup('Account', accountItems)}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
