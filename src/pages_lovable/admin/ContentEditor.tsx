import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAdminPageContent } from '@/hooks/usePageContent';
import { PageSectionEditor } from '@/components/admin/PageSectionEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

const PAGES = [
  { slug: 'home', label: 'Home Page', url: '/' },
  { slug: 'employers', label: 'Employers', url: '/employers' },
  { slug: 'candidates', label: 'Candidates', url: '/candidates' },
  { slug: 'about', label: 'About', url: '/about' },
  { slug: 'contact', label: 'Contact', url: '/contact' },
  { slug: 'services', label: 'Services Hub', url: '/services' },
  { slug: 'careers', label: 'Careers', url: '/careers' },
];

export default function ContentEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [newSection, setNewSection] = useState('');
  const { toast } = useToast();
  
  const { content, loading, updateContent, createContent, deleteContent, isUpdating } = useAdminPageContent(selectedPage);

  // Group content by section
  const sections: Record<string, typeof content> = {};
  content.forEach((block) => {
    if (!sections[block.section_id]) {
      sections[block.section_id] = [];
    }
    sections[block.section_id].push(block);
  });

  const handleAddSection = async () => {
    if (!newSection.trim()) return;
    
    const sectionId = newSection.toLowerCase().replace(/\s+/g, '_');
    try {
      await createContent({
        page_slug: selectedPage,
        section_id: sectionId,
        content_key: 'title',
        content_type: 'text',
        content_value: '',
        content_metadata: {} as Json,
        display_order: 0,
        is_active: true,
      });
      setNewSection('');
      toast({ title: 'Section created', description: `Added "${sectionId}" section` });
    } catch {
      toast({ title: 'Error', description: 'Failed to create section', variant: 'destructive' });
    }
  };

  const currentPageUrl = PAGES.find(p => p.slug === selectedPage)?.url || '/';

  return (
    <DashboardLayout>
      <Helmet>
        <title>Content Editor | Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground">Edit page content without touching code</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGES.map((page) => (
                  <SelectItem key={page.slug} value={page.slug}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" asChild>
              <a href={currentPageUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(sections).length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">No content blocks for this page yet.</p>
                <p className="text-sm text-muted-foreground">Add a section below to get started.</p>
              </div>
            ) : (
              Object.entries(sections).map(([sectionId, blocks]) => (
                <PageSectionEditor
                  key={sectionId}
                  sectionId={sectionId}
                  blocks={blocks}
                  pageSlug={selectedPage}
                  onUpdateBlock={async (id, updates) => { await updateContent({ id, ...updates }); }}
                  onDeleteBlock={async (id) => { await deleteContent(id); }}
                  onCreateBlock={async (block) => { await createContent(block); }}
                />
              ))
            )}

            {/* Add New Section */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <Input
                placeholder="New section name (e.g., hero, features)"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={handleAddSection} disabled={!newSection.trim() || isUpdating}>
                <Plus className="h-4 w-4 mr-1" />
                Add Section
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
