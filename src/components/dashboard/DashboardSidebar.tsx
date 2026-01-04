import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Target, Building2 as CompanyIcon, Mail, MapPin } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
  Building2,
  UserCheck,
  Briefcase,
  ChevronDown,
  LogOut,
  User,
  Handshake,
  Edit,
  Search,
  Globe,
  ClipboardCheck,
  UserPlus,
  ClipboardList,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { title: 'Overview', url: '/admin', icon: LayoutDashboard },
];

const adminDirectoryItems = [
  { title: 'All Listings', url: '/admin/directory', icon: FolderOpen },
  { title: 'By Market', url: '/admin/directory/markets', icon: Building2 },
  { title: 'By Niche', url: '/admin/directory/niches', icon: Briefcase },
  { title: 'Locations', url: '/admin/locations', icon: MapPin },
];

const adminUsersItems = [
  { title: 'All Users', url: '/admin/users', icon: Users },
  { title: 'Agents', url: '/admin/agents', icon: UserCheck },
];

const adminContentItems = [
  { title: 'Blog Posts', url: '/admin/blog', icon: FileText },
  { title: 'Submissions', url: '/admin/submissions', icon: MessageSquare },
  { title: 'Alliance Apps', url: '/admin/alliance-applications', icon: Handshake },
  { title: 'Subscribers', url: '/admin/subscribers', icon: Users },
  { title: 'Salary Lookups', url: '/admin/salary-lookups', icon: Briefcase },
];

const adminCMSItems = [
  { title: 'Page Content', url: '/admin/content', icon: Edit },
  { title: 'SEO Manager', url: '/admin/seo', icon: Search },
  { title: 'SEO Audit', url: '/admin/seo/audit', icon: ClipboardCheck },
  { title: 'Global Settings', url: '/admin/settings/global', icon: Globe },
];

// Agent Navigation - Symmetrical 3-item groups
const agentDashboardItems = [
  { title: 'Overview', url: '/agent/dashboard', icon: LayoutDashboard },
];

const agentATSItems = [
  { title: 'ATS Overview', url: '/agent/ats-dashboard', icon: ClipboardCheck },
  { title: 'Candidates', url: '/agent/candidates', icon: UserPlus },
  { title: 'Job Orders', url: '/agent/job-orders', icon: ClipboardList },
  { title: 'Placements', url: '/agent/placements', icon: DollarSign },
];

const agentProspectingItems = [
  { title: 'Prospecting', url: '/agent/prospecting', icon: Target },
  { title: 'Company Research', url: '/agent/company-research', icon: CompanyIcon },
  { title: 'Email Templates', url: '/agent/email-templates', icon: Mail },
];

const agentProfileItems = [
  { title: 'My Profile', url: '/agent/profile', icon: User },
  { title: 'My Listings', url: '/agent/listings', icon: FolderOpen },
  { title: 'Blog Posts', url: '/agent/blog', icon: FileText },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminRole();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (url: string) => pathname === url;
  const isGroupActive = (items: { url: string }[]) =>
    items.some(item => pathname.startsWith(item.url));

  const NavItem = ({ item }: { item: { title: string; url: string; icon: React.ElementType } }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive(item.url)}>
        <Link href={item.url} className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-foreground">EH Admin</span>
              <span className="text-xs text-muted-foreground">Dashboard</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {isAdmin ? (
          <>
            {/* Admin Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavItems.map(item => (
                    <NavItem key={item.url} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Directory Management */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(adminDirectoryItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    Directory
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminDirectoryItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Users Management */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(adminUsersItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    Users
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminUsersItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Content Management */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(adminContentItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    Content
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminContentItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* CMS */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(adminCMSItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    CMS
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminCMSItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Settings */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                      <Link href="/admin/settings" className="flex items-center gap-3">
                        <Settings className="h-4 w-4" />
                        {!collapsed && <span>Settings</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <>
            {/* Agent Dashboard */}
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {agentDashboardItems.map(item => (
                    <NavItem key={item.url} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* ATS Management - 3 items */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(agentATSItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    ATS Management
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {agentATSItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Prospecting - 3 items */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(agentProspectingItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    Prospecting
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {agentProspectingItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Profile - 3 items */}
            <SidebarGroup>
              <Collapsible defaultOpen={isGroupActive(agentProfileItems)} className="group/collapsible">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    Profile
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {agentProfileItems.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? 'Admin' : 'Agent'}
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
