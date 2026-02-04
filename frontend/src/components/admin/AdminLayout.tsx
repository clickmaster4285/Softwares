import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border/50 flex items-center px-4 bg-card/80 backdrop-blur-md">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-display font-semibold text-foreground"> Admin</h1>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
