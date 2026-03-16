'use client';

import { LayoutDashboard, FolderOpen, LogOut, Home, Tags, MessageSquare, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Categories', url: '/admin/categories', icon: Tags },
  { title: 'Projects', url: '/admin/projects', icon: FolderOpen },
  { title: 'Testimonials', url: '/admin/testimonials', icon: MessageSquare },
];

const AdminSidebar = () => {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <Sidebar 
      className={cn(
        "border-r border-border/50 bg-gradient-to-b from-white to-gray-50/50",
        collapsed ? 'w-16' : 'w-64'
      )}
      collapsible="icon"
    >
      {/* Brand Header */}
      <div className={cn(
        "flex items-center h-16 border-b border-border/50 ",
        collapsed ? "justify-center px-2" : "justify-between px-4"
      )}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2 ">
              <div className="w-8 h-8 border border-gray-600 rounded-md flex items-center justify-center shadow-md">
                <span className="text-primary font-bold text-sm">CM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white leading-tight ">ClickMasters</span>
                <span className="text-[10px] text-primaryleading-tight text-primary">Admin Portal</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-6 w-6 text-gray-400 hover:text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </>
        ) : (
          <div className="relative w-8 h-8">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
          </div>
        )}
      </div>

      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-medium text-gray-400 uppercase tracking-wider",
            collapsed && "sr-only"
          )}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.url}
                      end={item.url === '/admin'}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        "text-white hover:text-primary hover:bg-primary/5",
                        collapsed ? "justify-center" : "justify-start"
                      )}
                      activeClassName="bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    >
                      <item.icon className={cn(
                        "h-4 w-4 shrink-0",
                        collapsed ? "h-5 w-5" : "h-4 w-4"
                      )} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className={cn(
            "text-xs font-medium text-gray-400 uppercase tracking-wider",
            collapsed && "sr-only"
          )}>
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                      "text-white hover:text-primary hover:bg-primary/5",
                      collapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Home className={cn(
                      "h-4 w-4 shrink-0",
                      collapsed ? "h-5 w-5" : "h-4 w-4"
                    )} />
                    {!collapsed && <span className="text-sm">View Portfolio</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Info & Logout */}
<SidebarFooter className="border-t border-border/50 p-3">
  {!collapsed && user && (
    <div className="mb-4">
      {/* User Profile Card */}
      <div className="flex items-center gap-3 p-2  rounded-xl border border-primary/10">
        {/* User Avatar with Icon */}
        <div className="relative">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
            <span className="text-primary font-semibold text-md">
              {user.email?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {user.email?.split('@')[0] || 'Admin'}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <p className="text-[10px] font-medium text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Logout Button with enhanced styling */}
<Button
  variant="ghost"
  size={collapsed ? "icon" : "sm"}
  onClick={handleLogout}
  className={cn(
    "w-full group transition-all duration-200",
    collapsed
      ? "h-9 w-9 mx-auto rounded-lg hover:text-red-500 hover:bg-transparent"
      : "justify-start gap-3 px-3 py-2 rounded-lg hover:text-red-500 hover:bg-transparent"
  )}
>
    <div className={cn(
      "flex items-center justify-center transition-colors duration-200",
      collapsed ? "w-full" : ""
    )}>
      <LogOut className={cn(
        "shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
        collapsed ? "h-4 w-4 text-white group-hover:text-red-600" : "h-4 w-4 text-white group-hover:text-red-600"
      )} />
      {!collapsed && (
        <span className="ml-2 text-sm font-medium text-white group-hover:text-red-600">
          Logout
        </span>
      )}
    </div>
  </Button>

  {/* Collapse Toggle for collapsed state - Enhanced */}
  {collapsed && (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="mt-3 h-7 w-7 rounded-lg text-gray-400 hover:text-primary hover:mx-auto transition-all duration-200"
    >
      <ChevronRight className="h-3.5 w-3.5" />
    </Button>
  )}
</SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;