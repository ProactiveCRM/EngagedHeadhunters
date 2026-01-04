import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  slug: string | null;
}

export default function BlogManager() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    featured: false,
    published: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const formattedPosts = (data || []).map(post => ({
          ...post,
          featured: !!post.featured,
          published: !!post.published,
        }));
        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...newPost,
          author_id: user.id,
        }]);

      if (error) throw error;

      toast({
        title: "Post created",
        description: "Your blog post has been created successfully.",
      });

      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        featured: false,
        published: false,
      });
      setIsCreating(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          excerpt: editingPost.excerpt,
          category: editingPost.category,
          featured: editingPost.featured,
          published: editingPost.published,
        })
        .eq('id', editingPost.id);

      if (error) throw error;

      toast({
        title: "Post updated",
        description: "Your blog post has been updated successfully.",
      });

      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error updating post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "Your blog post has been deleted successfully.",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 pt-28 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Blog Manager</h1>
            <p className="text-muted-foreground">Create and manage your thought leadership content</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/agent/dashboard">Dashboard</Link>
            </Button>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                  <DialogDescription>
                    Write a new blog post to showcase your expertise
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Title</Label>
                    <Input
                      id="new-title"
                      placeholder="Enter post title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-excerpt">Excerpt</Label>
                    <Textarea
                      id="new-excerpt"
                      placeholder="Brief description of the post"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-category">Category</Label>
                    <Select
                      value={newPost.category}
                      onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Recruiting Tips">Recruiting Tips</SelectItem>
                        <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                        <SelectItem value="Career Advice">Career Advice</SelectItem>
                        <SelectItem value="Market Trends">Market Trends</SelectItem>
                        <SelectItem value="Executive Search">Executive Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-content">Content</Label>
                    <Textarea
                      id="new-content"
                      placeholder="Write your blog post content here..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows={10}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPost.title || !newPost.content}
                    >
                      Create Post
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setNewPost({ ...newPost, published: true })}
                    >
                      Create & Publish
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {post.title}
                      {post.featured && <Badge variant="secondary">Featured</Badge>}
                      <Badge variant={post.published ? "default" : "outline"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {post.category} • Created {new Date(post.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Blog Post</DialogTitle>
                        </DialogHeader>
                        {editingPost && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={editingPost.title}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Excerpt</Label>
                              <Textarea
                                value={editingPost.excerpt || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Category</Label>
                              <Select
                                value={editingPost.category}
                                onValueChange={(value) => setEditingPost({ ...editingPost, category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Recruiting Tips">Recruiting Tips</SelectItem>
                                  <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                                  <SelectItem value="Career Advice">Career Advice</SelectItem>
                                  <SelectItem value="Market Trends">Market Trends</SelectItem>
                                  <SelectItem value="Executive Search">Executive Search</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Content</Label>
                              <Textarea
                                value={editingPost.content}
                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                rows={10}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={handleUpdatePost}>
                                Update Post
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingPost({ ...editingPost, published: !editingPost.published })}
                              >
                                {editingPost.published ? 'Unpublish' : 'Publish'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt || post.content.substring(0, 200) + '...'}
                </p>
              </CardContent>
            </Card>
          ))}

          {posts.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  You haven't created any blog posts yet. Start building your thought leadership!
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setIsCreating(true)}
                >
                  Create Your First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}