import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter,  , useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import BlogImageUpload from '@/components/blog/BlogImageUpload';
import RichTextEditor from '@/components/blog/RichTextEditor';

const BlogEditor = () => {
  const { user, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useRouter();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    featured_image: '',
    published: false
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (isEditing && user) {
      fetchPost();
    }
  }, [isEditing, user]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('author_id', user?.id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        category: data.category,
        featured_image: data.featured_image || '',
        published: data.published || false
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
      router.push('/agent/dashboard');
    }
  };

  // Strip HTML tags for plain text excerpt
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleSave = async (publish = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Auto-generate excerpt from content if not provided
      const plainContent = stripHtml(formData.content);
      const excerpt = formData.excerpt || plainContent.substring(0, 200);

      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: excerpt,
        category: formData.category,
        featured_image: formData.featured_image || null,
        published: publish,
        author_id: user?.id,
        updated_at: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Post ${publish ? 'published' : 'saved'} successfully`,
      });
      
      router.push('/agent/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/agent/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSave(true)}
              disabled={saving}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Blog Post Editor</CardTitle>
            <CardDescription>
              Create thought leadership content to establish your authority in your niche
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter a compelling title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="industry-insights">Industry Insights</SelectItem>
                    <SelectItem value="career-advice">Career Advice</SelectItem>
                    <SelectItem value="recruiting-tips">Recruiting Tips</SelectItem>
                    <SelectItem value="market-trends">Market Trends</SelectItem>
                    <SelectItem value="company-culture">Company Culture</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <BlogImageUpload
              value={formData.featured_image}
              onChange={(url) => setFormData({...formData, featured_image: url})}
              userId={user.id}
              label="Featured Image"
            />

            <div>
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Brief description of your post (will auto-generate if left empty)"
                rows={3}
              />
            </div>

            <div>
              <Label>Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({...formData, content})}
                userId={user.id}
                placeholder="Write your blog post content here..."
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BlogEditor;
