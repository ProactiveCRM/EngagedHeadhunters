import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import AdminRoute from '@/components/AdminRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Database, 
  Mail, 
  Shield, 
  Globe, 
  Key,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

function AdminSettingsContent() {
  const integrations = [
    {
      name: 'Supabase',
      description: 'Database, Auth & Storage',
      status: 'connected',
      icon: Database,
      link: 'https://supabase.com/dashboard/project/wgonwefnpccnismxquev'
    },
    {
      name: 'GoHighLevel',
      description: 'CRM & Marketing Automation',
      status: 'connected',
      icon: Mail,
      link: null
    },
    {
      name: 'Mapbox',
      description: 'Maps & Location Services',
      status: 'connected',
      icon: Globe,
      link: null
    },
    {
      name: 'Clay',
      description: 'Data Enrichment',
      status: 'connected',
      icon: Database,
      link: null
    }
  ];

  const securitySettings = [
    { name: 'Row Level Security (RLS)', status: 'enabled' },
    { name: 'TCPA Consent Tracking', status: 'enabled' },
    { name: 'Honeypot Spam Protection', status: 'enabled' },
    { name: 'Submission Time Validation', status: 'enabled' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground">Manage integrations and system configuration</p>
        </div>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Integrations
            </CardTitle>
            <CardDescription>Connected services and API integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration, index) => (
                <div key={integration.name}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <integration.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                      {integration.link && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={integration.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < integrations.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Security features and protections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {securitySettings.map(setting => (
                <div key={setting.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">{setting.name}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {setting.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Links
            </CardTitle>
            <CardDescription>Useful external resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev" target="_blank" rel="noopener noreferrer">
                  <Database className="h-4 w-4 mr-2" />
                  Supabase Dashboard
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev/auth/users" target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2" />
                  Auth Users
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev/storage/buckets" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Storage Buckets
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev/functions" target="_blank" rel="noopener noreferrer">
                  <Key className="h-4 w-4 mr-2" />
                  Edge Functions
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev/sql/new" target="_blank" rel="noopener noreferrer">
                  <Database className="h-4 w-4 mr-2" />
                  SQL Editor
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/wgonwefnpccnismxquev/settings/functions" target="_blank" rel="noopener noreferrer">
                  <Key className="h-4 w-4 mr-2" />
                  Secrets
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Project ID</span>
                <code className="bg-muted px-2 py-0.5 rounded text-xs">wgonwefnpccnismxquev</code>
              </div>
              <Separator />
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Environment</span>
                <Badge variant="outline">Production</Badge>
              </div>
              <Separator />
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Database</span>
                <span>PostgreSQL (Supabase)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

const AdminSettings = () => {
  return (
    <AdminRoute>
      <AdminSettingsContent />
    </AdminRoute>
  );
};

export default AdminSettings;
