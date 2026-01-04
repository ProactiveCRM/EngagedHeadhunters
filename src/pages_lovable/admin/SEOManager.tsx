import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAdminPageSEO } from '@/hooks/usePageSEO';
import { SEOPreview } from '@/components/admin/SEOPreview';
import { StructuredDataEditor } from '@/components/admin/StructuredDataEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, X, Search, Share2, Twitter, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

const PAGES = [
  { slug: 'home', label: 'Home Page' },
  { slug: 'employers', label: 'Employers' },
  { slug: 'candidates', label: 'Candidates' },
  { slug: 'about', label: 'About' },
  { slug: 'contact', label: 'Contact' },
  { slug: 'services', label: 'Services Hub' },
  { slug: 'executive-search', label: 'Executive Search' },
  { slug: 'healthcare-staffing', label: 'Healthcare Staffing' },
  { slug: 'technology-recruiting', label: 'Technology Recruiting' },
  { slug: 'finance-recruiting', label: 'Finance Recruiting' },
  { slug: 'sales-recruiting', label: 'Sales Recruiting' },
  { slug: 'manufacturing-recruiting', label: 'Manufacturing Recruiting' },
  { slug: 'contract-staffing', label: 'Contract Staffing' },
  { slug: 'temporary-staffing', label: 'Temporary Staffing' },
  { slug: 'careers', label: 'Careers Hub' },
  { slug: 'healthcare-careers', label: 'Healthcare Careers' },
  { slug: 'technology-careers', label: 'Technology Careers' },
  { slug: 'finance-careers', label: 'Finance Careers' },
  { slug: 'executive-careers', label: 'Executive Careers' },
  { slug: 'sales-careers', label: 'Sales Careers' },
  { slug: 'manufacturing-careers', label: 'Manufacturing Careers' },
  { slug: 'contract-careers', label: 'Contract Careers' },
  { slug: 'remote-careers', label: 'Remote Careers' },
  { slug: 'entry-level-careers', label: 'Entry Level Careers' },
  { slug: 'locations', label: 'Locations Hub' },
  { slug: 'houston', label: 'Houston' },
  { slug: 'blog', label: 'Blog' },
  { slug: 'agents', label: 'Agents Directory' },
  { slug: 'niches', label: 'Niches' },
  { slug: 'alliance', label: 'Alliance' },
];

const ROBOTS_OPTIONS = [
  { value: 'index, follow', label: 'Index, Follow (Default)' },
  { value: 'noindex, follow', label: 'No Index, Follow' },
  { value: 'index, nofollow', label: 'Index, No Follow' },
  { value: 'noindex, nofollow', label: 'No Index, No Follow' },
];

export default function SEOManager() {
  const [selectedPage, setSelectedPage] = useState('home');
  const { seoData, loading, updateSEO, isUpdating } = useAdminPageSEO();
  const { toast } = useToast();
  const [keywordInput, setKeywordInput] = useState('');

  const currentSEO = seoData.find(s => s.page_slug === selectedPage);

  const [formData, setFormData] = useState({
    meta_title: '',
    meta_description: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
    robots: 'index, follow',
    keywords: [] as string[],
    structured_data: null as Json | null,
  });

  // Update form when page changes or data loads
  useEffect(() => {
    if (currentSEO) {
      setFormData({
        meta_title: currentSEO.meta_title || '',
        meta_description: currentSEO.meta_description || '',
        og_title: currentSEO.og_title || '',
        og_description: currentSEO.og_description || '',
        og_image: currentSEO.og_image || '',
        twitter_title: currentSEO.twitter_title || '',
        twitter_description: currentSEO.twitter_description || '',
        twitter_image: currentSEO.twitter_image || '',
        canonical_url: currentSEO.canonical_url || '',
        robots: currentSEO.robots || 'index, follow',
        keywords: currentSEO.keywords || [],
        structured_data: currentSEO.structured_data || null,
      });
    } else {
      setFormData({
        meta_title: '',
        meta_description: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',
        canonical_url: '',
        robots: 'index, follow',
        keywords: [],
        structured_data: null,
      });
    }
  }, [currentSEO, selectedPage]);

  const handleStructuredDataChange = useCallback((data: unknown) => {
    setFormData(prev => ({ ...prev, structured_data: data as Json | null }));
  }, []);

  const handleSave = async () => {
    try {
      await updateSEO({
        id: currentSEO?.id,
        page_slug: selectedPage,
        ...formData,
      });
      toast({ title: 'SEO saved', description: 'SEO metadata updated successfully' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save SEO data', variant: 'destructive' });
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addKeyword = () => {
    const trimmed = keywordInput.trim().toLowerCase();
    if (trimmed && !formData.keywords.includes(trimmed)) {
      handleChange('keywords', [...formData.keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    handleChange('keywords', formData.keywords.filter(k => k !== keyword));
  };

  const getCharCountClass = (current: number, max: number) => {
    if (current === 0) return 'text-muted-foreground';
    if (current <= max) return 'text-green-600 dark:text-green-400';
    return 'text-destructive';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">SEO Manager</h1>
            <p className="text-muted-foreground">Manage page titles, descriptions, and social metadata</p>
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

            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic" className="flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    Social
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="flex items-center gap-1">
                    <Twitter className="h-3 w-3" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="schema" className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    Schema
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Search Engine Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          value={formData.meta_title}
                          onChange={(e) => handleChange('meta_title', e.target.value)}
                          placeholder="Page title for search engines"
                        />
                        <p className={`text-xs ${getCharCountClass(formData.meta_title.length, 60)}`}>
                          {formData.meta_title.length}/60 characters
                          {formData.meta_title.length > 60 && ' (too long)'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea
                          value={formData.meta_description}
                          onChange={(e) => handleChange('meta_description', e.target.value)}
                          placeholder="Brief description for search results"
                          rows={3}
                        />
                        <p className={`text-xs ${getCharCountClass(formData.meta_description.length, 160)}`}>
                          {formData.meta_description.length}/160 characters
                          {formData.meta_description.length > 160 && ' (too long)'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Keywords</Label>
                        <div className="flex gap-2">
                          <Input
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            placeholder="Add keyword"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                          />
                          <Button type="button" variant="secondary" onClick={addKeyword}>
                            Add
                          </Button>
                        </div>
                        {formData.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {formData.keywords.map((keyword) => (
                              <Badge key={keyword} variant="secondary" className="gap-1">
                                {keyword}
                                <button onClick={() => removeKeyword(keyword)} className="hover:text-destructive">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Canonical URL</Label>
                        <Input
                          value={formData.canonical_url}
                          onChange={(e) => handleChange('canonical_url', e.target.value)}
                          placeholder="https://www.engagedheadhunters.com/..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Robots Directive</Label>
                        <Select value={formData.robots} onValueChange={(v) => handleChange('robots', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROBOTS_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Open Graph (Facebook/LinkedIn)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>OG Title</Label>
                        <Input
                          value={formData.og_title}
                          onChange={(e) => handleChange('og_title', e.target.value)}
                          placeholder="Defaults to meta title if empty"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>OG Description</Label>
                        <Textarea
                          value={formData.og_description}
                          onChange={(e) => handleChange('og_description', e.target.value)}
                          placeholder="Defaults to meta description if empty"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>OG Image URL</Label>
                        <Input
                          value={formData.og_image}
                          onChange={(e) => handleChange('og_image', e.target.value)}
                          placeholder="https://... (1200x630px recommended)"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="twitter" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Twitter Card</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Twitter Title</Label>
                        <Input
                          value={formData.twitter_title}
                          onChange={(e) => handleChange('twitter_title', e.target.value)}
                          placeholder="Defaults to OG title if empty"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Twitter Description</Label>
                        <Textarea
                          value={formData.twitter_description}
                          onChange={(e) => handleChange('twitter_description', e.target.value)}
                          placeholder="Defaults to OG description if empty"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Twitter Image URL</Label>
                        <Input
                          value={formData.twitter_image}
                          onChange={(e) => handleChange('twitter_image', e.target.value)}
                          placeholder="Defaults to OG image if empty"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schema" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Structured Data (JSON-LD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StructuredDataEditor
                        initialData={formData.structured_data}
                        pageSlug={selectedPage}
                        onChange={handleStructuredDataChange}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview */}
            <div>
              <SEOPreview seo={{ page_slug: selectedPage, ...formData }} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
