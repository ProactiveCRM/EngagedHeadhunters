import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, FileText, Edit, Trash2, Copy, Loader2, Mail, Search
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  is_shared: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  'Initial Outreach',
  'Follow-up',
  'Meeting Request',
  'Thank You',
  'Re-engagement',
  'General',
];

const TEMPLATE_VARIABLES = [
  { var: '{{first_name}}', desc: 'Contact first name' },
  { var: '{{company_name}}', desc: 'Company name' },
  { var: '{{title}}', desc: 'Contact job title' },
  { var: '{{industry}}', desc: 'Company industry' },
  { var: '{{your_name}}', desc: 'Your name' },
];

export const EmailTemplates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [form, setForm] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'General',
    is_shared: false,
  });

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as EmailTemplate[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (template: typeof form & { id?: string }) => {
      if (template.id) {
        const { error } = await supabase
          .from('email_templates')
          .update({
            name: template.name,
            subject: template.subject,
            body: template.body,
            category: template.category,
            is_shared: template.is_shared,
          })
          .eq('id', template.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('email_templates')
          .insert({
            ...template,
            created_by: user?.id,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      toast({ title: 'Saved', description: 'Template saved successfully' });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      toast({ title: 'Deleted', description: 'Template removed' });
    },
  });

  const resetForm = () => {
    setForm({
      name: '',
      subject: '',
      body: '',
      category: 'General',
      is_shared: false,
    });
    setEditingTemplate(null);
  };

  const openEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category,
      is_shared: template.is_shared,
    });
    setIsDialogOpen(true);
  };

  const copyToClipboard = (template: EmailTemplate) => {
    const content = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(content);
    toast({ title: 'Copied', description: 'Template copied to clipboard' });
  };

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Email Templates</h2>
          <p className="text-muted-foreground">Create and manage outreach email templates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create Template'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Template Name</Label>
                  <Input 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Initial Outreach - Tech"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Email Subject</Label>
                <Input 
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Quick question about {{company_name}}'s hiring plans"
                />
              </div>
              <div>
                <Label>Email Body</Label>
                <Textarea 
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Hi {{first_name}},&#10;&#10;I noticed {{company_name}} is growing..."
                  rows={10}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={form.is_shared}
                    onCheckedChange={(v) => setForm({ ...form, is_shared: v })}
                  />
                  <Label>Share with team</Label>
                </div>
              </div>
              <div className="border rounded-lg p-3 bg-muted/50">
                <p className="text-sm font-medium mb-2">Available Variables:</p>
                <div className="flex flex-wrap gap-2">
                  {TEMPLATE_VARIABLES.map(v => (
                    <Badge key={v.var} variant="outline" className="cursor-pointer" onClick={() => {
                      navigator.clipboard.writeText(v.var);
                      toast({ title: 'Copied', description: `${v.var} copied` });
                    }}>
                      {v.var}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => saveMutation.mutate({ ...form, id: editingTemplate?.id })}
                disabled={saveMutation.isPending || !form.name || !form.subject || !form.body}
              >
                {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingTemplate ? 'Update' : 'Create'} Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredTemplates.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No templates yet</h3>
          <p className="text-muted-foreground mb-4">Create your first email template to get started</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{template.category}</Badge>
                  </div>
                  {template.is_shared && (
                    <Badge variant="secondary">Shared</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Subject:</p>
                    <p className="text-sm font-medium truncate">{template.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Preview:</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.body}</p>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => copyToClipboard(template)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEdit(template)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(template.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
