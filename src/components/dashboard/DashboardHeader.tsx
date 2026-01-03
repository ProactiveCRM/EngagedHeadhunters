import {   } from 'next/navigation';
import Link from 'next/link';
import { Menu, Bell, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export function DashboardHeader({ title, showSearch = false }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
      <SidebarTrigger className="-ml-2" />
      
      {title && (
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          {title}
        </h1>
      )}

      <div className="flex-1" />

      {showSearch && (
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 h-9"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-9 w-9">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Go to site</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default DashboardHeader;
